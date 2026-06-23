import { describe, it, expect } from 'vitest';
import { buildRegistryEntries, toSlug, detectCategory } from './build-registry.js';

describe('registry build utilities', () => {
  it('toSlug converts PascalCase to kebab-case', () => {
    expect(toSlug('ProgressCircle')).toBe('progress-circle');
    expect(toSlug('HeatMap')).toBe('heat-map');
    expect(toSlug('BigText')).toBe('big-text');
    expect(toSlug('usePackageManager')).toBe('use-package-manager');
  });

  it('detectCategory returns correct category for widget paths', () => {
    expect(detectCategory('packages/widgets/src/display/ProgressCircle.ts')).toBe('display');
    expect(detectCategory('packages/widgets/src/feedback/Spinner.ts')).toBe('feedback');
    expect(detectCategory('packages/widgets/src/data/HeatMap.ts')).toBe('data');
    expect(detectCategory('packages/widgets/src/input/TextInput.ts')).toBe('input');
    expect(detectCategory('packages/jsx/src/hooks/usePackageManager.ts')).toBe('hook');
    expect(detectCategory('packages/ui/src/WelcomeScreen.ts')).toBe('template');
  });

  it('buildRegistryEntries returns an array with name/slug/package fields', () => {
    const entries = buildRegistryEntries();
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
    const first = entries[0]!;
    expect(first.name).toBeTruthy();
    expect(first.slug).toBeTruthy();
    expect(first.package).toMatch(/^@termuijs\//);
  });

  it('ProgressCircle entry exists in registry', () => {
    const entries = buildRegistryEntries();
    const pc = entries.find(e => e.name === 'ProgressCircle');
    expect(pc).toBeDefined();
    expect(pc!.slug).toBe('progress-circle');
    expect(pc!.package).toBe('@termuijs/widgets');
    expect(pc!.category).toBe('display');
  });

  it('usePackageManager hook entry exists', () => {
    const entries = buildRegistryEntries();
    const hook = entries.find(e => e.name === 'usePackageManager');
    expect(hook).toBeDefined();
    expect(hook!.category).toBe('hook');
    expect(hook!.package).toBe('@termuijs/jsx');
  });
});
