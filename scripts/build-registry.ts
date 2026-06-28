#!/usr/bin/env bun
// ─────────────────────────────────────────────────────
// build-registry.ts — generate registry.json + public/r/*.json
// Run: bun scripts/build-registry.ts
// ─────────────────────────────────────────────────────

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export interface RegistryEntry {
  name: string;
  slug: string;
  package: string;
  category: 'display' | 'input' | 'feedback' | 'layout' | 'data' | 'hook' | 'template';
  description: string;
  tags: string[];
  files: Array<{ path: string; content: string }>;
  dependencies: string[];
  importPath: string;
  api: ComponentApi | null;
}

/**
 * Rewrite relative import specifiers ('./x.js', '../y.js') to the component's
 * published package, so copied source resolves symbols from the npm package
 * instead of sibling files. External specifiers (@termuijs/core, etc.) are
 * left untouched.
 */
export function rewriteImports(content: string, pkg: string): string {
  return content.replace(/(from\s+|import\s+)(['"])(\.\.?\/[^'"]+)\2/g,
    (_m, kw, q) => `${kw}${q}${pkg}${q}`);
}

/**
 * Collect the unique, sorted set of @termuijs/* package specifiers imported by
 * a source file. Run AFTER rewriteImports so relative imports already resolve
 * to their package. These become the component's install dependencies.
 */
export function collectDeps(content: string): string[] {
  const re = /from\s+['"](@termuijs\/[a-z-]+)['"]/g;
  const deps = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(content)) !== null) deps.add(m[1]!);
  return [...deps].sort();
}

export function toSlug(name: string): string {
  return name
    .replace(/([A-Z])/g, '-$1')
    .replace(/^-/, '')
    .toLowerCase();
}

export function detectCategory(filePath: string): RegistryEntry['category'] {
  if (filePath.includes('/hooks/')) return 'hook';
  if (filePath.includes('/display/')) return 'display';
  if (filePath.includes('/input/')) return 'input';
  if (filePath.includes('/feedback/')) return 'feedback';
  if (filePath.includes('/layout/')) return 'layout';
  if (filePath.includes('/data/')) return 'data';
  if (filePath.includes('packages/ui/')) return 'template';
  return 'display';
}

function detectPackage(filePath: string): string {
  if (filePath.includes('packages/widgets/')) return '@termuijs/widgets';
  if (filePath.includes('packages/jsx/')) return '@termuijs/jsx';
  if (filePath.includes('packages/ui/')) return '@termuijs/ui';
  if (filePath.includes('packages/tss/')) return '@termuijs/tss';
  if (filePath.includes('packages/core/')) return '@termuijs/core';
  return '@termuijs/widgets';
}

function extractExportedNames(content: string): string[] {
  const names: string[] = [];
  // Match: export class Foo, export function foo, export const foo
  const classRe = /^export\s+class\s+(\w+)/gm;
  const fnRe    = /^export\s+(?:function|const|async function)\s+(\w+)/gm;
  let m;
  while ((m = classRe.exec(content)) !== null) names.push(m[1]!);
  while ((m = fnRe.exec(content))    !== null) names.push(m[1]!);
  return names.filter(n => !n.startsWith('_') && !/Options$|Props$|Type$|Interface$/.test(n));
}

/** Turn a JSDoc or line-comment body into a one-line summary. */
function cleanSummary(raw: string): string {
  return raw
    .replace(/^\s*\*\s?/gm, '')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split('. ')[0]!
    .replace(/\.$/, '')
    .trim();
}

/**
 * Description for an exported symbol. Binds a JSDoc block to the next export
 * that follows it, so a statement between the doc and the export no longer
 * drops the text. Falls back to a contiguous line comment, then a whole-file
 * `// Name ...` comment, then a generic label.
 */
export function extractDescription(content: string, name: string): string {
  const jsdoc = /\/\*\*([\s\S]*?)\*\//g;
  let m: RegExpExecArray | null;
  while ((m = jsdoc.exec(content)) !== null) {
    const after = content.slice(jsdoc.lastIndex);
    // Bind the doc to the next EXPORTED declaration; a private helper (e.g.
    // `function hashString`) between the doc and the export is skipped so the
    // text reaches the real registry symbol.
    const next = /^[ \t]*export\s+(?:default\s+)?(?:abstract\s+)?(?:class|function|const|async function)\s+(\w+)/m.exec(after);
    if (next && next[1] === name) {
      const summary = cleanSummary(m[1]!);
      if (summary) return summary;
    }
  }
  const lines = content.split('\n');
  const exportRe = new RegExp(`export\\s+(?:default\\s+)?(?:abstract\\s+)?(?:class|function|const|async function)\\s+${name}\\b`);
  for (let i = 0; i < lines.length; i++) {
    if (exportRe.test(lines[i]!)) {
      const acc: string[] = [];
      for (let j = i - 1; j >= 0; j--) {
        const line = lines[j]!.trim();
        if (line.startsWith('//')) { acc.unshift(line.replace(/^\/\/\s?/, '')); continue; }
        if (line === '') { if (acc.length) break; else continue; }
        break;
      }
      if (acc.length) { const s = cleanSummary(acc.join(' ')); if (s) return s; }
      break;
    }
  }
  const named = new RegExp(`^\\s*//\\s*${name}\\b[^\\n]*`, 'm').exec(content);
  if (named) {
    const s = cleanSummary(named[0].replace(/^\s*\/\/\s?/, '').replace(new RegExp(`^${name}\\s*[-:\\u2014]?\\s*`), ''));
    if (s) return s;
  }
  return `${name} component`;
}

export interface ApiProp { name: string; type: string; required: boolean; description: string }
export interface ComponentApi { signature: string; props: ApiProp[] }

/** Pull the leading JSDoc or // description for an interface field. */
function fieldDescription(block: string, fieldName: string): string {
  const re = new RegExp(`(?:\\/\\*\\*([\\s\\S]*?)\\*\\/|\\/\\/([^\\n]*))\\s*\\n\\s*${fieldName}\\??\\s*:`, 'm');
  const m = re.exec(block);
  if (!m) return '';
  return cleanSummary(m[1] ?? m[2] ?? '');
}

/**
 * Parse `name?: type;` field lines from an interface/object body into props.
 * Brace-aware: a field whose TYPE is itself an inline object literal (e.g.
 * `anchor?: { x: number; y: number }`) is captured whole — the terminating `;`
 * is the one at brace-depth 0, not a `;` nested inside the type. Works for both
 * multi-line interfaces and single-line inline object literals.
 */
function parseFields(body: string): ApiProp[] {
  const props: ApiProp[] = [];
  // Matches the start of each field: `name?:` after the body start or a
  // depth-0 `;`/`{`. The lookbehind keeps the delimiter for the next field.
  const headRe = /(?:^|(?<=[;{]))\s*(\w+)(\??):\s*/gm;
  let h: RegExpExecArray | null;
  while ((h = headRe.exec(body)) !== null) {
    const name = h[1]!;
    // Walk from the end of the head to the depth-0 `;`, balancing nested braces.
    let depth = 0;
    let end = -1;
    for (let i = headRe.lastIndex; i < body.length; i++) {
      const c = body[i]!;
      if (c === '{') depth++;
      else if (c === '}') { if (depth === 0) { end = i; break; } depth--; }
      else if (c === ';' && depth === 0) { end = i; break; }
    }
    if (end === -1) end = body.length;
    const type = body.slice(headRe.lastIndex, end).replace(/\s+/g, ' ').trim();
    if (!type) continue;
    props.push({
      name,
      type,
      required: h[2] !== '?',
      description: fieldDescription(body, name),
    });
    // Resume scanning just past the terminator so the next head can anchor.
    headRe.lastIndex = end;
  }
  return props;
}

/** Parse `interface NameOptions { ... }` fields into props. */
function parseOptionsInterface(content: string, optionsTypeName: string): ApiProp[] {
  const re = new RegExp(`interface\\s+${optionsTypeName}\\s*(?:extends[^{]+)?{([\\s\\S]*?)\\n}`, 'm');
  const m = re.exec(content);
  if (!m) return [];
  return parseFields(m[1]!);
}

/**
 * Build a component's API: the constructor signature plus its options props.
 * Returns null when the source has no constructor.
 */
export function extractApi(content: string, name: string): ComponentApi | null {
  const ctor = /constructor\s*\(([\s\S]*?)\)\s*{/.exec(content);
  if (!ctor) return null;
  const params = ctor[1]!.replace(/\s+/g, ' ').trim();
  const signature = `new ${name}(${params})`;
  const props: ApiProp[] = [];

  // Inline object-literal options param: `options?: { ... } = {}`.
  const inlineOpts = /(?:options|opts|props)\??:\s*\{([\s\S]*?)\}\s*(?:=|,|$)/.exec(params);

  // Positional params: iterate the comma-split list but STOP at the first param
  // whose name is options/opts/props or whose type starts with `{`. A fragment
  // containing a brace means the naive comma-split already fragmented an inline
  // object, so guard against those broken fragments.
  for (const p of params.split(',')) {
    const t = p.trim();
    if (/[{}]/.test(t) || /=>/.test(t)) break;
    const pm = /^(\w+)(\??):\s*([^=]+?)(?:=.*)?$/.exec(t);
    if (!pm) break;
    if (/^(?:options|opts|props)$/.test(pm[1]!)) break;
    if (/style/i.test(pm[1]!) || /Options$/.test(pm[3]!.trim())) continue;
    props.push({ name: pm[1]!, type: pm[3]!.trim(), required: pm[2] !== '?' && !p.includes('='), description: '' });
  }

  if (inlineOpts) {
    props.push(...parseFields(inlineOpts[1]!));
  } else {
    const optType = /:\s*(?:Partial<)?(\w*Options)\b/.exec(params)?.[1];
    if (optType) props.push(...parseOptionsInterface(content, optType));
  }
  return { signature, props };
}

function scanDirectory(dir: string, entries: { path: string; content: string }[]): void {
  if (!statSync(dir, { throwIfNoEntry: false })) return;
  for (const file of readdirSync(dir)) {
    const full = join(dir, file);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      // skip test dirs and node_modules
      if (!['node_modules', 'dist', '__tests__'].includes(file)) {
        scanDirectory(full, entries);
      }
    } else if (file.endsWith('.ts') && !file.endsWith('.test.ts') && !file.endsWith('.d.ts')) {
      entries.push({ path: full.replace(ROOT + '/', ''), content: readFileSync(full, 'utf-8') });
    }
  }
}

const SCAN_PATHS = [
  'packages/widgets/src/display',
  'packages/widgets/src/feedback',
  'packages/widgets/src/input',
  'packages/widgets/src/layout',
  'packages/widgets/src/data',
  'packages/jsx/src/hooks',
  'packages/ui/src',
];

export function buildRegistryEntries(): RegistryEntry[] {
  const files: { path: string; content: string }[] = [];
  for (const p of SCAN_PATHS) {
    scanDirectory(join(ROOT, p), files);
  }

  const entries: RegistryEntry[] = [];
  for (const { path, content } of files) {
    const names = extractExportedNames(content);
    for (const name of names) {
      // Skip internal helpers and base classes
      if (['Widget', 'Screen', 'Box'].includes(name) && !path.includes('packages/ui/')) continue;
      const slug = toSlug(name);
      const pkg  = detectPackage(path);
      const rewritten = rewriteImports(content, pkg);
      entries.push({
        name,
        slug,
        package: pkg,
        category: detectCategory(path),
        description: extractDescription(content, name),
        tags: [detectCategory(path), slug],
        files: [{ path: `${slug}.ts`, content: rewritten }],
        dependencies: collectDeps(rewritten),
        importPath: pkg,
        api: extractApi(content, name),
      });
    }
  }

  // deduplicate by name (keep first occurrence)
  const seen = new Set<string>();
  return entries.filter(e => {
    if (seen.has(e.name)) return false;
    seen.add(e.name);
    return true;
  });
}

// ── CLI entrypoint ────────────────────────────────────

async function main(): Promise<void> {
  console.log('Building registry...');
  const entries = buildRegistryEntries();

  // Write master registry.json
  const registryPath = join(ROOT, 'registry.json');
  writeFileSync(registryPath, JSON.stringify(entries, null, 2));
  console.log(`✓ registry.json — ${entries.length} entries`);

  // Write per-component JSON to both the repo-root public/r/ (local dev / CLI
  // smoke tests) and website/public/r/ — the latter is what Next serves at
  // https://termui.io/r/<slug>.json, which `termuijs add` fetches.
  const targets = [join(ROOT, 'public', 'r'), join(ROOT, 'website', 'public', 'r')];
  for (const publicDir of targets) {
    mkdirSync(publicDir, { recursive: true });
    for (const entry of entries) {
      writeFileSync(join(publicDir, `${entry.slug}.json`), JSON.stringify(entry, null, 2));
    }
    writeFileSync(join(publicDir, 'registry.json'), JSON.stringify(entries, null, 2));
    console.log(`✓ ${publicDir.replace(ROOT + '/', '')} — ${entries.length} files + registry.json`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(e => { console.error(e); process.exit(1); });
}
