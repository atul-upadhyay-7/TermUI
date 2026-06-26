import type { RootWidget } from '@termuijs/core'
import {
    // display
    Badge,
    BigText,
    Text,
    LogView,
    JSONView,
    DiffView,
    StreamingText,
    ChatMessage,
    ChatThread,
    ToolCall,
    ToolApproval,
    FPSCounter,
    PerformanceOverlay,
    ThinkingBlock,
    DirectoryTree,
    UnorderedList,
    OrderedList,
    NotificationBadge,
    ShortcutBar,
    Tree,
    Markdown,
    Code,
    QRCode,
    QRCodePattern,
    Breadcrumbs,
    Tag,
    Canvas,
    Highlight,
    Digits,
    Accordion,
    Rule,
    Carousel,
    Stopwatch,
    Avatar,
    Tooltip,
    Clock,
    Gradient,
    Collapsible,
    Kbd,
    Timer,
    Watermark,
    Typewriter,
    Timeline,
    Stepper,
    Marquee,
    Link,
    Placeholder,
    // feedback
    Alert,
    Banner,
    Spinner,
    LoadingDots,
    ProgressBar,
    ProgressCircle,
    MultiProgress,
    TaskList,
    StatusMessage,
    EmptyState,
    Scrollbar,
    Callout,
    Progress,
    Skeleton,
    // data
    StatusIndicator,
    Gauge,
    Sparkline,
    BarChart,
    LineChart,
    KeyValue,
    Table,
    BulletChart,
    Hexdump,
    TreeTable,
    RadarChart,
    Definition,
    DataGrid,
    Stat,
    Calendar,
    CandlestickChart,
    AreaChart,
    StackedBarChart,
    Histogram,
    PieChart,
    GanttChart,
    ScatterPlot,
    HeatMap,
    Sidebar,
    LineGauge,
    // input
    TextInput,
    List,
    CommandPalette,
    Button,
    Checkbox,
    Slider,
    ContextMenu,
    Knob,
    PinInput,
    VirtualList,
    RangeInput,
    // layout
    Card,
    Stack,
    Panel,
    ScrollView,
    Columns,
    AspectRatio,
    Dock,
    Center,
    Divider,
    SplitPane,
    Fill,
    Masonry,
    Grid,
} from '@termuijs/widgets'
import {
    Tabs,
    MenuBar,
    Menu,
    Modal,
    Drawer,
    Select,
    Combobox,
    LinearPrompt,
    Pages,
    ContentSwitcher,
    SnippetPrompt,
    MultiSelect,
    Transfer,
    SortPrompt,
    Toast,
    ConfirmDialog,
    Form,
    NotificationCenter,
    PasswordInput,
    NumberInput,
    TagInput,
    MaskedInput,
    PathInput,
    KeyboardShortcuts,
    FilePicker,
    DatePicker,
    TimePicker,
    DateRangePicker,
    ColorPicker,
    AppShell,
    Pagination,
    ScalePrompt,
    SegmentedControl,
    SearchableSelect,
    Autocomplete,
    Switch,
    CheckboxGroup,
    ButtonGroup,
    Wizard,
    MultilineTextInput,
    BasicAuthPrompt,
    TextArea,
    Announcer,
    RadioGroup,
    Rating,
    ThemeSwitcher,
    TreeSelect,
    EmailInput,
    QuizPrompt,
    EditablePrompt,
    SurveyPrompt,
    Breadcrumb,
    Disclosure,
    Listbar,
    Popover,
    SearchInput,
    TokenUsage,
    WelcomeScreen,
    SetupFlow,
    Spacer,
} from '@termuijs/ui'
import {
    Meter,
    BrailleCanvas,
    GridItem,
    DraggableWidget,
    DroppableWidget,
} from '@termuijs/widgets'

const demos: Record<string, () => RootWidget> = {
    // ── Display ───────────────────────────────────────

    'badge': () => new Badge('v0.1.7', {}, { variant: 'success' }),

    'big-text': () => new BigText('TERMUI', {}, { color: { type: 'named', name: 'cyan' } }),

    'text': () => new Text('The quick brown fox jumps over the lazy dog. TermUI renders text with word-wrap, alignment, and smooth scrolling.', {}, { wrap: true }),

    'log-view': () => {
        const w = new LogView({}, { autoScroll: true })
        w.setLines([
            '[12:00:01] INFO  Server started on port 3000',
            '[12:00:02] INFO  Connected to database',
            '[12:00:04] WARN  Memory usage above 80%',
            '[12:00:05] ERROR Failed to reach upstream API',
            '[12:00:06] DEBUG Retrying in 5 seconds…',
            '[12:00:11] INFO  Retry successful',
            '[12:00:15] INFO  Request GET /api/users 200 42ms',
        ])
        return w
    },

    'json-view': () => new JSONView({
        data: {
            name: 'Claude',
            version: 3,
            capabilities: ['text', 'code', 'vision'],
            config: { temperature: 0.7, maxTokens: 4096, stream: true },
        },
    }),

    'diff-view': () => new DiffView({
        lines: [
            { type: 'context', content: 'function greet(name: string) {', lineNo: 1 },
            { type: 'remove',  content: '  return "Hello, " + name;',     lineNo: 2 },
            { type: 'add',     content: '  return `Hello, ${name}!`;',    lineNo: 2 },
            { type: 'context', content: '}',                               lineNo: 3 },
            { type: 'context', content: '',                                lineNo: 4 },
            { type: 'remove',  content: 'const msg = greet("World");',    lineNo: 5 },
            { type: 'add',     content: 'const msg = greet("TermUI");',   lineNo: 5 },
        ],
        showLineNumbers: true,
    }),

    'streaming-text': () => new StreamingText({
        text: 'TermUI streams AI responses token by token with a blinking cursor, giving your CLI apps the feel of a real-time chat interface.',
        speed: 0,
    }),

    'chat-message': () => new ChatMessage({
        role: 'assistant',
        content: 'I can help you build beautiful terminal UIs with TermUI. What would you like to create?',
        timestamp: new Date('2026-06-25T12:00:00'),
    }),

    'chat-thread': () => new ChatThread({}, [
        { role: 'user',      content: 'What is TermUI?' },
        { role: 'assistant', content: 'TermUI is a framework for building rich terminal UIs in TypeScript.' },
        { role: 'user',      content: 'Does it support widgets?' },
        { role: 'assistant', content: 'Yes — over 60 widgets including charts, inputs, and AI-native components.' },
    ]),

    'tool-call': () => new ToolCall({
        name: 'read_file',
        args: { path: '/src/index.ts', encoding: 'utf-8' },
        status: 'done',
        result: '// TermUI entry point',
        collapsed: false,
    }),

    'tool-approval': () => new ToolApproval({
        name: 'exec',
        args: { command: 'rm -rf ./dist', cwd: '/project' },
        status: 'pending',
        collapsed: false,
    }),

    'f-p-s-counter': () => {
        const w = new FPSCounter({}, { showAverage: true, showMinMax: true })
        w.updateFPS(58)
        w.updateFPS(60)
        w.updateFPS(59)
        w.updateFPS(61)
        return w
    },

    'performance-overlay': () => {
        const w = new PerformanceOverlay()
        w.updateStats({ cellsChanged: 142, bytesWritten: 1024, durationMs: 2.4 })
        return w
    },

    'thinking-block': () => {
        const w = new ThinkingBlock({
            thinking: 'Let me reason through this step by step. First I need to consider the time complexity of the algorithm, then the space usage…',
        })
        return w
    },

    'directory-tree': () => new DirectoryTree({
        tree: [
            { name: 'packages', type: 'dir', children: [
                { name: 'core',    type: 'dir', children: [
                    { name: 'src',       type: 'dir', children: [] },
                    { name: 'package.json', type: 'file' },
                ]},
                { name: 'widgets', type: 'dir', children: [
                    { name: 'src',       type: 'dir', children: [] },
                    { name: 'package.json', type: 'file' },
                ]},
            ]},
            { name: 'website',   type: 'dir', children: [] },
            { name: 'README.md', type: 'file' },
        ],
    }),

    'unordered-list': () => new UnorderedList([
        { text: 'Install dependencies' },
        { text: 'Configure widgets', children: [
            { text: 'Set up theme' },
            { text: 'Configure layout' },
        ]},
        { text: 'Run the app' },
        { text: 'Deploy to production' },
    ]),

    'ordered-list': () => new OrderedList([
        { text: 'Clone the repository' },
        { text: 'Install packages', children: [
            { text: 'npm install' },
            { text: 'npm run build' },
        ]},
        { text: 'Start development server' },
        { text: 'Open localhost:3000' },
    ]),

    'notification-badge': () => new NotificationBadge(
        { count: 7, position: 'top-right' },
    ),

    'shortcut-bar': () => new ShortcutBar([
        { key: 'F1',   label: 'Help' },
        { key: 'F3',   label: 'Search' },
        { key: 'F5',   label: 'Refresh' },
        { key: 'F10',  label: 'Menu' },
        { key: 'q',    label: 'Quit' },
    ]),

    'tree': () => new Tree({
        nodes: [
            { label: 'Documents', children: [
                { label: 'Resume.pdf' },
                { label: 'Projects', children: [
                    { label: 'termui.md' },
                    { label: 'roadmap.md' },
                ]},
            ], expanded: true },
            { label: 'Downloads', children: [
                { label: 'archive.zip' },
            ]},
        ],
    }),

    'markdown': () => new Markdown({ content: `# TermUI

**Build** terminal UIs with _ease_.

- 60+ widgets
- TypeScript native
- \`xterm.js\` renderer

> Ship fast. Look good.
` }),

    'code': () => new Code(
        `function fibonacci(n: number): number {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
        {},
        { language: 'typescript', showLineNumbers: true },
    ),

    'q-r-code': () => new QRCode('https://termuijs.dev', {}),

    'q-r-code-pattern': () => new QRCodePattern(
        'https://termuijs.dev',
        {},
        { showText: true },
    ),

    // ── Feedback ──────────────────────────────────────

    'alert': () => new Alert({ variant: 'info', message: 'Component loaded successfully' }),

    'banner': () => new Banner({}, {
        variant: 'warning',
        title: 'Deprecation Notice',
        body: 'This API will be removed in v2.0. Please migrate to the new widget API.',
    }),

    'spinner': () => new Spinner({}, { label: 'Loading components…' }),

    'loading-dots': () => new LoadingDots({}, { label: 'Connecting to server', maxDots: 3 }),

    'progress-bar': () => new ProgressBar({}, { value: 0.68, showLabel: true, labelFormat: 'percent' }),

    'progress-circle': () => new ProgressCircle({}, { value: 72, label: '72%' }),

    'multi-progress': () => new MultiProgress({
        items: [
            { label: 'CPU',    value: 0.74, color: { type: 'named', name: 'red' } },
            { label: 'Memory', value: 0.51, color: { type: 'named', name: 'yellow' } },
            { label: 'Disk',   value: 0.28, color: { type: 'named', name: 'green' } },
            { label: 'Network',value: 0.09, color: { type: 'named', name: 'cyan' } },
        ],
        labelWidth: 9,
        showValues: true,
    }),

    'task-list': () => new TaskList(
        {},
        {
            pendingText:  '○ waiting',
            runningText:  '● running',
            doneText:     '✓ done',
            errorText:    '✗ failed',
        },
        [
            { id: 1, label: 'Install deps',   status: 'done' },
            { id: 2, label: 'Type check',     status: 'done' },
            { id: 3, label: 'Run tests',      status: 'running' },
            { id: 4, label: 'Build bundle',   status: 'pending' },
            { id: 5, label: 'Deploy to CDN',  status: 'pending' },
        ],
    ),

    'status-message': () => new StatusMessage(
        'All systems operational',
        {},
        { variant: 'success' },
    ),

    'empty-state': () => new EmptyState(
        'No results found',
        {},
        {
            description: 'Try adjusting your search or filters',
            hint: 'Press / to search',
        },
    ),

    // ── Data ─────────────────────────────────────────

    'status-indicator': () => new StatusIndicator('API Server', true),

    'gauge': () => {
        const w = new Gauge('CPU', {}, { showLabel: true })
        w.setValue(0.65)
        return w
    },

    'sparkline': () => {
        const w = new Sparkline('Latency', {}, { showRange: true })
        w.setData([12, 18, 14, 22, 19, 30, 25, 16, 12, 20, 28, 15, 10, 14, 18])
        return w
    },

    'bar-chart': () => new BarChart([
        { bars: [{ value: 42, label: 'Mon' }] },
        { bars: [{ value: 58, label: 'Tue' }] },
        { bars: [{ value: 35, label: 'Wed' }] },
        { bars: [{ value: 71, label: 'Thu' }] },
        { bars: [{ value: 63, label: 'Fri' }] },
    ], {}, { direction: 'vertical' }),

    'line-chart': () => {
        const w = new LineChart(
            [10, 25, 18, 42, 35, 58, 47, 63, 55, 72, 68, 80],
            {},
            { showYAxis: false, color: { type: 'named', name: 'cyan' } },
        )
        return w
    },

    'key-value': () => new KeyValue([
        { key: 'Version',    value: '0.1.7' },
        { key: 'Runtime',    value: 'Node 22' },
        { key: 'Renderer',   value: 'xterm.js' },
        { key: 'Widgets',    value: 60 },
        { key: 'License',    value: 'MIT' },
    ]),

    'table': () => new Table(
        [
            { header: 'Package',  key: 'pkg',     width: 14 },
            { header: 'Version',  key: 'version', width: 10 },
            { header: 'Size',     key: 'size',    width: 8 },
            { header: 'License',  key: 'license', width: 8 },
        ],
        [
            { pkg: '@termuijs/core',    version: '0.1.7', size: '42 kB', license: 'MIT' },
            { pkg: '@termuijs/widgets', version: '0.1.7', size: '98 kB', license: 'MIT' },
            { pkg: '@termuijs/motion',  version: '0.1.7', size: '12 kB', license: 'MIT' },
            { pkg: '@termuijs/ui',      version: '0.1.7', size: '55 kB', license: 'MIT' },
        ],
        {},
        { showHeader: true, stripe: true },
    ),

    // ── Input ─────────────────────────────────────────

    'text-input': () => new TextInput({}, { placeholder: 'Type something…' }),

    'list': () => new List([
        { label: 'New file',       value: 'new-file' },
        { label: 'Open folder',    value: 'open-folder' },
        { label: 'Recent files',   value: 'recent' },
        { label: 'Settings',       value: 'settings' },
        { label: 'Quit',           value: 'quit' },
    ]),

    'command-palette': () => new CommandPalette({
        commands: [
            { id: 'open',  label: 'Open File',       description: 'Ctrl+O', action: () => {} },
            { id: 'save',  label: 'Save',             description: 'Ctrl+S', action: () => {} },
            { id: 'find',  label: 'Find in Files',    description: 'Ctrl+F', action: () => {} },
            { id: 'term',  label: 'New Terminal',     description: 'Ctrl+`', action: () => {} },
            { id: 'debug', label: 'Start Debugging',  description: 'F5',     action: () => {} },
            { id: 'quit',  label: 'Quit',             description: 'Ctrl+Q', action: () => {} },
        ],
        placeholder: 'Search commands…',
        maxVisible: 6,
    }),

    'button': () => new Button('Deploy to Production', {}, { variant: 'primary' }),

    'checkbox': () => new Checkbox(
        'Enable dark mode',
        {},
        { checked: true },
    ),

    'slider': () => new Slider('Volume', {}, { min: 0, max: 100, step: 5, showValue: true }),

    // ── Layout ───────────────────────────────────────

    'card': () => {
        const c = new Card({}, { title: 'System Status', borderColor: { type: 'named', name: 'cyan' } })
        c.addChild(new StatusMessage('All services running', {}, { variant: 'success' }))
        return c
    },

    'stack': () => {
        const base = new Text('Base layer', { fg: { type: 'named', name: 'brightBlack' } })
        const top  = new Text('Top layer (overlaid)', { fg: { type: 'named', name: 'white' } })
        return new Stack([base, top])
    },

    // ── Display (new) ────────────────────────────────

    'breadcrumbs': () => new Breadcrumbs(
        ['Home', 'Docs', 'Widgets', 'Breadcrumbs'],
        {},
        { separator: '❯' },
    ),

    'tag': () => new Tag('typescript', {}, { variant: 'info' }),

    'canvas': () => {
        const w = new Canvas({})
        // Draw a simple X pattern using setPixel; pixels are set after mount
        return w
    },

    'highlight': () => new Highlight(
        'TermUI is a powerful terminal UI framework for TypeScript',
        'terminal',
    ),

    'digits': () => {
        const w = new Digits({ height: 3 }, { color: { type: 'named', name: 'cyan' } })
        w.setValue('42:07')
        return w
    },

    'accordion': () => new Accordion(
        [
            { title: 'Installation',  content: 'npm install @termuijs/widgets\nnpm install @termuijs/core' },
            { title: 'Configuration', content: 'Import widgets and mount them to a Screen instance.' },
            { title: 'Usage',         content: 'const w = new Text("hello");\nscreen.setRoot(w);' },
        ],
        {},
        { openIndex: 0 },
    ),

    'j-s-o-n-view': () => new JSONView({ data: { name: 'Claude', version: 3 } }),

    'rule': () => new Rule({}, { title: 'Section Break', orientation: 'horizontal' }),

    'carousel': () => new Carousel(
        [
            '  Slide 1: Build terminal UIs effortlessly',
            '  Slide 2: 60+ widgets out of the box',
            '  Slide 3: TypeScript native, zero config',
        ],
        { showDots: true },
    ),

    'stopwatch': () => {
        const w = new Stopwatch({}, {})
        // Leave at 00:00.00 — no timer running in static preview
        return w
    },

    'avatar': () => new Avatar('Karanjot Singh', {}, { shape: 'square' }),

    'tooltip': () => new Tooltip(
        { text: 'Press F1 for help', visible: true },
        {},
    ),

    'clock': () => new Clock({}, { showSeconds: true, use24Hour: true }),

    'gradient': () => new Gradient(
        'TermUI — build beautiful terminal UIs',
        {},
        { startColor: '#ff6b6b', endColor: '#4ecdc4' },
    ),

    'collapsible': () => new Collapsible(
        'Advanced Options',
        'theme: dark\nfont-size: 14\nline-height: 1.5\ntab-size: 2',
        {},
        { open: true },
    ),

    'kbd': () => new Kbd('Ctrl+Shift+P'),

    'timer': () => {
        const w = new Timer({ duration: 5 * 60 * 1000 }, {})
        // Shows 05:00 in static preview
        return w
    },

    'watermark': () => new Watermark(
        'CONFIDENTIAL',
        {},
        { color: { type: 'named', name: 'brightBlack' }, angle: 45 },
    ),

    'typewriter': () => {
        const w = new Typewriter(
            'TermUI reveals text character by character — perfect for onboarding flows.',
            {},
            { speed: 2 },
        )
        // Reveal first 30 chars for the static preview
        for (let i = 0; i < 30; i++) w.tick()
        return w
    },

    'timeline': () => new Timeline([
        { title: 'Project kickoff',   time: 'Jan 2026', status: 'done'    },
        { title: 'Alpha release',     time: 'Mar 2026', status: 'done'    },
        { title: 'Beta release',      time: 'May 2026', status: 'active'  },
        { title: 'General availability', time: 'Jul 2026', status: 'pending' },
    ]),

    'stepper': () => new Stepper(
        [
            { label: 'Setup',   status: 'completed' },
            { label: 'Config',  status: 'active'    },
            { label: 'Review',  status: 'pending'   },
            { label: 'Deploy',  status: 'pending'   },
        ],
        {},
        { orientation: 'horizontal' },
    ),

    'marquee': () => new Marquee(
        'TermUI · 60+ widgets · TypeScript native · xterm.js renderer · ship fast',
        {},
        { speed: 1, gap: 6 },
    ),

    'link': () => new Link(
        'Visit termuijs.dev',
        {},
        { url: 'https://termuijs.dev', showUrlFallback: false },
    ),

    'placeholder': () => new Placeholder(
        'Widget Area',
        { height: 8 },
        { borderColor: { type: 'named', name: 'brightBlack' } },
    ),

    // ── Feedback (new) ───────────────────────────────

    'scrollbar': () => new Scrollbar(
        { height: 12 },
        { contentLength: 100, viewportLength: 12, position: 20, orientation: 'verticalRight' },
    ),

    'callout': () => new Callout(
        'Your API key expires in 3 days. Please rotate it to avoid disruption.',
        {},
        { variant: 'warn', title: 'Action Required' },
    ),

    'progress': () => {
        const w = new Progress(
            {
                tasks: [
                    { label: 'Uploading assets',    value: 1.0, status: 'done'    },
                    { label: 'Compiling bundles',   value: 0.72, status: 'running' },
                    { label: 'Running tests',       value: 0.0,  status: 'pending' },
                ],
            },
        )
        return w
    },

    'skeleton': () => new Skeleton({ height: 5 }, { variant: 'pulse', shape: 'card' }),

    // ── Input (new) ──────────────────────────────────

    'context-menu': () => new ContextMenu(
        [
            { label: 'Cut',        value: 'cut'    },
            { label: 'Copy',       value: 'copy'   },
            { label: 'Paste',      value: 'paste'  },
            { label: 'Delete',     value: 'delete', disabled: true },
            { label: 'Select All', value: 'select-all' },
        ],
        2,
        2,
    ),

    'knob': () => {
        const w = new Knob('Volume', {}, { min: 0, max: 100, step: 5, showValue: true })
        w.setValue(65)
        return w
    },

    'pin-input': () => new PinInput({}, { length: 6, masked: false }),

    'virtual-list': () => new VirtualList({
        totalItems: 10_000,
        itemHeight: 1,
        renderItem: (i) => `  Item #${String(i + 1).padStart(5, '0')}  —  row data goes here`,
    }),

    'range-input': () => {
        const w = new RangeInput('Price Range', {}, { min: 0, max: 1000, step: 10, showValue: true })
        w.setLow(200)
        w.setHigh(750)
        return w
    },

    // ── Layout (new) ─────────────────────────────────

    'panel': () => {
        const p = new Panel({}, { title: 'Server Metrics', borderColor: { type: 'named', name: 'cyan' } })
        p.addChild(new Text('Uptime: 99.98%  |  Requests: 1.2M  |  Errors: 0.02%'))
        return p
    },

    'scroll-view': () => {
        const w = new ScrollView({ height: 6 }, { contentHeight: 20, showScrollbar: true })
        for (let i = 1; i <= 12; i++) {
            w.addChild(new Text(`Line ${i}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`))
        }
        return w
    },

    'columns': () => {
        const c = new Columns()
        c.addChild(new Text('Left column content'))
        c.addChild(new Text('Center column content'))
        c.addChild(new Text('Right column content'))
        return c
    },

    'aspect-ratio': () => new AspectRatio(
        new Text('16:9 content area'),
        {},
        { ratio: 16 / 9 },
    ),

    'dock': () => {
        const header = new Text('Header', { fg: { type: 'named', name: 'cyan' } })
        const footer = new Text('Footer', { fg: { type: 'named', name: 'brightBlack' } })
        const main   = new Text('Main content area')
        return new Dock([
            { widget: header, edge: 'top',  size: 1 },
            { widget: footer, edge: 'bottom', size: 1 },
            { widget: main,   edge: 'fill' },
        ])
    },

    'center': () => {
        const w = new Center()
        w.addChild(new Text('Centered!', { fg: { type: 'named', name: 'cyan' } }))
        return w
    },

    'divider': () => new Divider({}, { orientation: 'horizontal', label: 'Stats' }),

    'split-pane': () => new SplitPane(
        new Text('Left pane: file explorer or sidebar content'),
        new Text('Right pane: main editor or preview area'),
        {},
        { ratio: 0.35, direction: 'horizontal' },
    ),

    'fill': () => new Fill(
        { height: 4 },
        { char: '·', color: { type: 'named', name: 'brightBlack' } },
    ),

    'masonry': () => {
        const items = [
            new Text('Card A\nShort content.', { height: 2 }),
            new Text('Card B\nThis card has\nmore content.', { height: 3 }),
            new Text('Card C\nTwo lines\nhere too.', { height: 3 }),
            new Text('Card D\nJust one line.', { height: 2 }),
        ]
        return new Masonry(items, {}, { columns: 2, gap: 1 })
    },

    'grid': () => {
        const g = new Grid({}, { columns: 3, rows: 2, gap: 1 })
        g.addItem(new Text('A'))
        g.addItem(new Text('B'))
        g.addItem(new Text('C'))
        g.addItem(new Text('D'))
        g.addItem(new Text('E'))
        g.addItem(new Text('F'))
        return g
    },

    // ── Data (new) ───────────────────────────────────

    'bullet-chart': () => {
        const w = new BulletChart(
            {},
            {
                max: 100,
                label: 'Revenue',
                ranges: [
                    { to: 40,  color: { type: 'named', name: 'red'    } },
                    { to: 70,  color: { type: 'named', name: 'yellow' } },
                    { to: 100, color: { type: 'named', name: 'green'  } },
                ],
            },
        )
        w.setValue(65)
        w.setTarget(80)
        return w
    },

    'hexdump': () => {
        const data = new Uint8Array([
            0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x54,
            0x65, 0x72, 0x6d, 0x55, 0x49, 0x21, 0x0a, 0x00,
            0xde, 0xad, 0xbe, 0xef, 0xca, 0xfe, 0xba, 0xbe,
            0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
        ])
        return new Hexdump(data, {}, { bytesPerRow: 16 })
    },

    'tree-table': () => new TreeTable(
        [
            { header: 'Name',    key: 'name',    width: 20 },
            { header: 'Type',    key: 'type',    width: 8  },
            { header: 'Size',    key: 'size',    width: 10 },
        ],
        [
            { name: 'packages', type: 'dir',  size: '—', expanded: true, children: [
                { name: 'core',    type: 'dir',  size: '—', children: [
                    { name: 'index.ts', type: 'file', size: '12 kB' },
                ]},
                { name: 'widgets', type: 'dir',  size: '—', children: [
                    { name: 'index.ts', type: 'file', size: '98 kB' },
                ]},
            ]},
            { name: 'README.md', type: 'file', size: '4 kB' },
        ],
        {},
        { showHeader: true, stripe: true },
    ),

    'radar-chart': () => {
        const w = new RadarChart(
            {},
            { axes: ['Speed', 'Power', 'Accuracy', 'Ease', 'Cost'] },
        )
        w.setSeries([
            {
                label: 'TermUI',
                values: [0.9, 0.7, 0.95, 0.85, 0.8],
                color: { type: 'named', name: 'cyan' },
            },
        ])
        return w
    },

    'definition': () => new Definition(
        [
            { term: 'Widget',    definition: 'A reusable UI component that renders to a terminal screen.' },
            { term: 'Screen',    definition: 'The virtual buffer that maps to the terminal output.' },
            { term: 'Renderer',  definition: 'Writes the screen buffer diff to stdout via xterm.js.' },
        ],
        {},
        { spacing: true, termColor: { type: 'named', name: 'cyan' } },
    ),

    'data-grid': () => new DataGrid(
        [
            { header: 'Name',    key: 'name',    width: 14, sortable: true },
            { header: 'Version', key: 'version', width: 10, sortable: true },
            { header: 'License', key: 'license', width: 8  },
        ],
        [
            { name: '@termuijs/core',    version: '0.1.7', license: 'MIT' },
            { name: '@termuijs/widgets', version: '0.1.7', license: 'MIT' },
            { name: '@termuijs/motion',  version: '0.1.7', license: 'MIT' },
        ],
        {},
        { showHeader: true },
    ),

    'stat': () => {
        const w = new Stat(
            'Monthly Revenue',
            '$48,320',
            {},
            { delta: 1, valueColor: { type: 'named', name: 'green' } },
        )
        return w
    },

    'calendar': () => new Calendar(
        {},
        { date: new Date('2026-06-26') },
    ),

    'candlestick-chart': () => {
        const w = new CandlestickChart(
            {},
            { upColor: { type: 'named', name: 'green' }, downColor: { type: 'named', name: 'red' } },
        )
        w.setData([
            { open: 100, high: 115, low: 95,  close: 110 },
            { open: 110, high: 120, low: 105, close: 108 },
            { open: 108, high: 118, low: 100, close: 115 },
            { open: 115, high: 125, low: 112, close: 120 },
            { open: 120, high: 128, low: 108, close: 112 },
            { open: 112, high: 122, low: 109, close: 119 },
            { open: 119, high: 130, low: 116, close: 127 },
            { open: 127, high: 135, low: 120, close: 122 },
        ])
        return w
    },

    'area-chart': () => {
        const w = new AreaChart(
            {},
            { lineColor: { type: 'named', name: 'cyan' }, fillColor: { type: 'named', name: 'brightBlack' }, showLine: true },
        )
        w.setData([10, 25, 18, 42, 35, 58, 47, 63, 55, 72, 68, 80, 75, 88, 92])
        return w
    },

    'stacked-bar-chart': () => {
        const w = new StackedBarChart(
            {},
            { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
        )
        w.setSeries([
            { label: 'Frontend', data: [30, 40, 35, 50, 45], color: { type: 'named', name: 'cyan'   } },
            { label: 'Backend',  data: [20, 25, 30, 20, 35], color: { type: 'named', name: 'green'  } },
            { label: 'Infra',    data: [10, 10, 15, 12, 10], color: { type: 'named', name: 'yellow' } },
        ])
        return w
    },

    'histogram': () => {
        const w = new Histogram(
            {},
            { bins: 8, barColor: { type: 'named', name: 'cyan' }, xLabel: 'Response Time (ms)' },
        )
        w.setData([12, 45, 23, 67, 34, 89, 12, 56, 78, 34, 23, 45, 67, 89, 12, 34,
                   56, 23, 78, 45, 67, 12, 89, 34, 56, 23, 45, 78, 12, 67])
        return w
    },

    'pie-chart': () => new PieChart({
        slices: [
            { label: 'TypeScript', value: 62, color: '#3178c6' },
            { label: 'JavaScript', value: 22, color: '#f7df1e' },
            { label: 'CSS',        value: 10, color: '#264de4' },
            { label: 'Other',      value: 6,  color: '#888888' },
        ],
        showLegend: true,
    }),

    'gantt-chart': () => new GanttChart(
        [
            { label: 'Design',   start: 0,  duration: 3 },
            { label: 'Develop',  start: 2,  duration: 6, color: { type: 'named', name: 'cyan'  } },
            { label: 'Test',     start: 7,  duration: 3, color: { type: 'named', name: 'green' } },
            { label: 'Deploy',   start: 9,  duration: 2, color: { type: 'named', name: 'yellow'} },
        ],
        {},
        { minTime: 0, maxTime: 12 },
    ),

    'scatter-plot': () => {
        const w = new ScatterPlot(
            {},
            { xLabel: 'Latency (ms)', yLabel: 'Throughput', pointColor: { type: 'named', name: 'cyan' } },
        )
        w.setData([
            { x: 12, y: 80 }, { x: 25, y: 65 }, { x: 8,  y: 90 },
            { x: 40, y: 40 }, { x: 18, y: 75 }, { x: 55, y: 30 },
            { x: 30, y: 55 }, { x: 62, y: 20 }, { x: 5,  y: 95 },
            { x: 48, y: 35 }, { x: 35, y: 50 }, { x: 22, y: 70 },
        ])
        return w
    },

    'heat-map': () => new HeatMap(
        [
            [0.1, 0.3, 0.6, 0.8, 0.5],
            [0.4, 0.7, 0.9, 0.6, 0.3],
            [0.8, 0.5, 0.4, 0.9, 0.7],
            [0.2, 0.6, 0.7, 0.4, 1.0],
            [0.6, 0.2, 0.5, 0.7, 0.4],
        ],
        {},
        {
            rowLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            colLabels: ['00h', '06h', '12h', '18h', '23h'],
        },
    ),

    'sidebar': () => new Sidebar(
        [
            { label: 'Dashboard',  badge: '3',  active: true  },
            { label: 'Widgets',    badge: '60'              },
            { label: 'Docs',                                 },
            { label: 'Settings',                             },
            { label: 'Logout',                               },
        ],
        {},
        { activeColor: { type: 'named', name: 'cyan' } },
    ),

    'line-gauge': () => {
        const w = new LineGauge({}, { showLabel: true, fillColor: { type: 'named', name: 'cyan' } })
        w.setValue(0.73)
        return w
    },

    // ── @termuijs/widgets (remaining) ────────────────

    'meter': () => {
        const g = new Grid({}, { columns: 1, gap: 0 })
        const cpu = new Meter('CPU ', {}, { low: 0.25, high: 0.75, showLabel: true })
        const mem = new Meter('MEM ', {}, { low: 0.25, high: 0.75, showLabel: true })
        const dsk = new Meter('DSK ', {}, { low: 0.25, high: 0.75, showLabel: true })
        cpu.setValue(0.74)
        mem.setValue(0.51)
        dsk.setValue(0.28)
        g.addItem(cpu)
        g.addItem(mem)
        g.addItem(dsk)
        return g
    },

    'braille-canvas': () => {
        const w = new BrailleCanvas(
            { width: 80, height: 32, color: { type: 'named', name: 'cyan' } },
        )
        // Draw a sine wave
        for (let x = 0; x < 80; x++) {
            const y = Math.round(12 + 10 * Math.sin((x / 80) * Math.PI * 4))
            w.drawPixel(x, y)
        }
        // Draw a horizontal axis
        for (let x = 0; x < 80; x++) {
            w.drawPixel(x, 24)
        }
        return w
    },

    'grid-item': () => {
        const g = new Grid({}, { columns: 3, rows: 2, gap: 1 })
        // Normal items
        const a = new GridItem()
        a.addChild(new Text('A'))
        const b = new GridItem({}, { columnStart: 2, columnEnd: 4 })
        b.addChild(new Text('B (spans cols 2–3)'))
        const c = new GridItem()
        c.addChild(new Text('C'))
        const d = new GridItem({}, { rowStart: 2 })
        d.addChild(new Text('D'))
        const e = new GridItem()
        e.addChild(new Text('E'))
        g.addItem(a)
        g.addItem(b)
        g.addItem(c)
        g.addItem(d)
        g.addItem(e)
        return g
    },

    'draggable-widget': () => {
        const container = new Stack([])
        const label = new Text('[ Drag me ] — press Space to start drag, Esc to cancel', { fg: { type: 'named', name: 'cyan' } })
        const dw = new DraggableWidget({ id: 'demo-item', onDragStart: () => {} })
        dw.addChild(label)
        container.addChild(dw)
        return container
    },

    'droppable-widget': () => {
        const container = new Stack([])
        const label = new Text('[ Drop zone ] — press Enter/Space to accept drop', { fg: { type: 'named', name: 'yellow' } })
        const dz = new DroppableWidget({ id: 'demo-zone', onDrop: (_id) => {} })
        dz.addChild(label)
        container.addChild(dz)
        return container
    },

    // ── @termuijs/ui ─────────────────────────────────

    'tabs': () => new Tabs(
        [
            { label: 'Overview',  content: new Text('Welcome to TermUI — a rich component library for building terminal UIs.') },
            { label: 'Install',   content: new Text('npm install @termuijs/ui @termuijs/widgets @termuijs/core') },
            { label: 'Changelog', content: new Text('v0.1.7 — Added 71 @termuijs/ui components.\nv0.1.0 — Initial release.') },
        ],
        { activeColor: { type: 'named', name: 'cyan' } },
    ),

    'menu-bar': () => new MenuBar(
        [
            { label: 'File',  items: [
                { label: 'New',   action: () => {} },
                { label: 'Open',  action: () => {} },
                { label: 'Save',  action: () => {} },
                { label: 'Quit',  action: () => {} },
            ]},
            { label: 'Edit',  items: [
                { label: 'Undo',  action: () => {} },
                { label: 'Redo',  action: () => {} },
                { label: 'Cut',   action: () => {} },
                { label: 'Copy',  action: () => {} },
                { label: 'Paste', action: () => {} },
            ]},
            { label: 'View',  items: [
                { label: 'Zoom In',  action: () => {} },
                { label: 'Zoom Out', action: () => {} },
            ]},
        ],
        {},
        { activeColor: { type: 'named', name: 'cyan' } },
    ),

    'menu': () => new Menu({
        items: [
            { label: 'New File',     shortcut: 'Ctrl+N', onSelect: () => {} },
            { label: 'Open…',        shortcut: 'Ctrl+O', onSelect: () => {} },
            { label: 'Save',         shortcut: 'Ctrl+S', onSelect: () => {} },
            { label: 'Save As…',     shortcut: 'Ctrl+Shift+S', onSelect: () => {} },
            { label: 'Close',        shortcut: 'Ctrl+W', disabled: true, onSelect: () => {} },
            { label: 'Quit',         shortcut: 'Ctrl+Q', onSelect: () => {} },
        ],
        onClose: () => {},
    }),

    'modal': () => {
        const m = new Modal(
            { title: 'Confirm Action', width: 40, height: 8, borderColor: { type: 'named', name: 'cyan' } },
        )
        m.setContent(new Text('Are you sure you want to deploy to production?\n\nThis will affect all users immediately.', {}, { wrap: true }))
        m.show()
        return m
    },

    'drawer': () => {
        const d = new Drawer({
            position: 'right',
            width: 30,
            title: 'Settings',
            onClose: () => {},
        })
        d.open()
        return d
    },

    'select': () => new Select(
        [
            { label: 'Node.js 22',   value: 'node22' },
            { label: 'Node.js 20',   value: 'node20' },
            { label: 'Node.js 18',   value: 'node18', disabled: true },
            { label: 'Deno 2',       value: 'deno2'  },
            { label: 'Bun 1',        value: 'bun1'   },
        ],
        { placeholder: 'Select a runtime…' },
    ),

    'combobox': () => new Combobox(
        [
            { label: 'TypeScript',  value: 'ts'  },
            { label: 'JavaScript',  value: 'js'  },
            { label: 'Rust',        value: 'rs'  },
            { label: 'Go',          value: 'go'  },
            { label: 'Python',      value: 'py'  },
            { label: 'Zig',         value: 'zig' },
        ],
        { placeholder: 'Search languages…' },
    ),

    'linear-prompt': () => new LinearPrompt(
        [
            { label: 'Development',  value: 'dev'  },
            { label: 'Staging',      value: 'stage'},
            { label: 'Production',   value: 'prod' },
        ],
        { question: 'Which environment to deploy to?', activeColor: { type: 'named', name: 'cyan' } },
    ),

    'pages': () => {
        const p = new Pages([
            { name: 'home',    content: new Text('Home page — press Tab to navigate') },
            { name: 'widgets', content: new Text('Widgets page — 60+ components') },
            { name: 'docs',    content: new Text('Docs page — full API reference') },
        ])
        return p
    },

    'content-switcher': () => {
        const cs = new ContentSwitcher()
        cs.addChild(new Text('Panel A — Active content shown here'))
        cs.addChild(new Text('Panel B — Hidden until switched'))
        return cs
    },

    'snippet-prompt': () => new SnippetPrompt(
        'Hello, {{name}}! Welcome to {{project}}.',
        {},
    ),

    'multi-select': () => new MultiSelect(
        [
            { label: 'TypeScript',  value: 'ts'     },
            { label: 'ESLint',      value: 'eslint'  },
            { label: 'Prettier',    value: 'prettier'},
            { label: 'Vitest',      value: 'vitest'  },
            { label: 'Husky',       value: 'husky'   },
        ],
        { activeColor: { type: 'named', name: 'cyan' } },
    ),

    'transfer': () => new Transfer(
        [
            { label: 'TypeScript', value: 'ts'      },
            { label: 'React',      value: 'react'   },
            { label: 'Vite',       value: 'vite'    },
            { label: 'Vitest',     value: 'vitest'  },
            { label: 'Prettier',   value: 'prettier'},
            { label: 'ESLint',     value: 'eslint'  },
        ],
        { activeColor: { type: 'named', name: 'cyan' } },
    ),

    'sort-prompt': () => new SortPrompt(
        ['Design', 'Implement', 'Test', 'Review', 'Deploy'],
        { activeColor: { type: 'named', name: 'cyan' } },
    ),

    'toast': () => {
        const t = new Toast({ position: 'top-right', durationMs: 99999 })
        t.success('Deployment successful!')
        t.info('3 new notifications')
        t.warning('Memory usage at 80%')
        return t
    },

    'confirm-dialog': () => {
        const d = new ConfirmDialog({
            message: 'Are you sure you want to delete this file?\nThis action cannot be undone.',
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            borderColor: { type: 'named', name: 'red' },
            onConfirm: () => {},
            onCancel: () => {},
        })
        d.show()
        return d
    },

    'form': () => new Form(
        [
            { name: 'name',    label: 'Full Name',    type: 'text',     placeholder: 'John Doe'          },
            { name: 'email',   label: 'Email',        type: 'text',     placeholder: 'john@example.com'  },
            { name: 'role',    label: 'Role',         type: 'select',   options: ['Admin', 'Editor', 'Viewer'] },
            { name: 'agree',   label: 'Terms',        type: 'checkbox'                                    },
        ],
        { activeColor: { type: 'named', name: 'cyan' } },
    ),

    'notification-center': () => new NotificationCenter({
        position: 'top-right',
        maxVisible: 5,
        width: 36,
    }),

    'password-input': () => new PasswordInput(
        {},
        { placeholder: 'Enter your password…' },
    ),

    'number-input': () => new NumberInput(
        {},
        { placeholder: 'Enter a number…', min: 0, max: 999, step: 1 },
    ),

    'tag-input': () => new TagInput(
        {},
        { placeholder: 'Add tags…', defaultTags: ['typescript', 'terminal', 'ui'] },
    ),

    'masked-input': () => new MaskedInput(
        {},
        { mask: '9999-9999-9999-9999', placeholder: 'Card number' },
    ),

    'path-input': () => new PathInput(
        {},
        { placeholder: '/path/to/file', cwd: '/Users' },
    ),

    'keyboard-shortcuts': () => new KeyboardShortcuts(
        [
            { key: 'Ctrl+N', description: 'New file',          category: 'File'   },
            { key: 'Ctrl+O', description: 'Open file',         category: 'File'   },
            { key: 'Ctrl+S', description: 'Save file',         category: 'File'   },
            { key: 'Ctrl+Z', description: 'Undo',              category: 'Edit'   },
            { key: 'Ctrl+Y', description: 'Redo',              category: 'Edit'   },
            { key: 'Ctrl+F', description: 'Find in files',     category: 'Search' },
            { key: 'Ctrl+P', description: 'Command palette',   category: 'Search' },
            { key: 'F5',     description: 'Start debugging',   category: 'Debug'  },
        ],
        { showCategories: true, columns: 2 },
    ),

    'file-picker': () => new FilePicker({
        startPath: '/Users',
        showHidden: false,
        onSelect: (_path: string) => {},
        onCancel: () => {},
    }),

    'date-picker': () => new DatePicker({
        value: new Date('2026-06-26'),
    }),

    'time-picker': () => new TimePicker({
        value: new Date('2026-06-26T14:30:00'),
        use24Hour: true,
    }),

    'date-range-picker': () => new DateRangePicker({
        value: { start: new Date('2026-06-01'), end: new Date('2026-06-30') },
    }),

    'color-picker': () => new ColorPicker({
        value: '#4ecdc4',
    }),

    'app-shell': () => {
        const header = new Text(' TermUI App', { fg: { type: 'named', name: 'cyan' } })
        const footer = new Text(' Press ? for help  |  q to quit', { fg: { type: 'named', name: 'brightBlack' } })
        const sidebar = new Text('• Dashboard\n• Widgets\n• Docs\n• Settings')
        const main = new Text('Main content area — select a page from the sidebar.')
        return new AppShell({ header, footer, sidebar, main, sidebarWidth: 18 })
    },

    'pagination': () => new Pagination(3, 10, {}),

    'scale-prompt': () => new ScalePrompt(
        {},
        {
            max: 10,
            question: 'How likely are you to recommend TermUI?',
            endLabels: ['Not likely', 'Very likely'],
            activeColor: { type: 'named', name: 'cyan' },
        },
    ),

    'segmented-control': () => new SegmentedControl({
        options: ['Day', 'Week', 'Month', 'Year'],
        value: 'Week',
        activeColor: { type: 'named', name: 'cyan' },
    }),

    'searchable-select': () => new SearchableSelect(
        [
            { label: 'Vercel',     value: 'vercel'    },
            { label: 'Netlify',    value: 'netlify'   },
            { label: 'Cloudflare', value: 'cloudflare'},
            { label: 'Railway',    value: 'railway'   },
            { label: 'Render',     value: 'render'    },
            { label: 'Fly.io',     value: 'flyio'     },
        ],
        { placeholder: 'Search providers…', activeColor: { type: 'named', name: 'cyan' } },
    ),

    'autocomplete': () => new Autocomplete(
        {},
        {
            items: ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'Zig', 'Swift', 'Kotlin', 'Elixir'],
            placeholder: 'Type a language…',
            maxSuggestions: 5,
        },
    ),

    'switch': () => new Switch({
        defaultValue: true,
        label: 'Enable notifications',
        onChange: (_val: boolean) => {},
    }),

    'checkbox-group': () => new CheckboxGroup({
        options: [
            { label: 'TypeScript',  value: 'ts'      },
            { label: 'ESLint',      value: 'eslint'  },
            { label: 'Prettier',    value: 'prettier'},
            { label: 'Husky',       value: 'husky'   },
            { label: 'lint-staged', value: 'lint-staged' },
        ],
        defaultValues: ['ts', 'prettier'],
    }),

    'button-group': () => new ButtonGroup(
        [
            { label: 'Save',    value: 'save'   },
            { label: 'Preview', value: 'preview'},
            { label: 'Discard', value: 'discard'},
        ],
        {},
        { activeColor: { type: 'named', name: 'cyan' }, onSelect: (_v: string) => {} },
    ),

    'wizard': () => new Wizard(
        [
            { title: 'Project Setup',  render: () => new Text('Enter project name and description.') },
            { title: 'Dependencies',   render: () => new Text('Select packages to install.') },
            { title: 'Configuration',  render: () => new Text('Configure TypeScript and linting.') },
            { title: 'Review',         render: () => new Text('Review your choices before creating.') },
        ],
        { onComplete: (_data: unknown[]) => {} },
    ),

    'multiline-text-input': () => new MultilineTextInput(
        {},
        { placeholder: 'Write a detailed description…' },
    ),

    'basic-auth-prompt': () => new BasicAuthPrompt(
        {},
        { usernameLabel: 'Username', passwordLabel: 'Password' },
    ),

    'text-area': () => new TextArea(
        {},
        { rows: 5, placeholder: 'Start typing your message here…' },
    ),

    'announcer': () => {
        const a = new Announcer({ history: 5 })
        a.announce('Widget mounted successfully', 'polite')
        a.announce('3 notifications pending', 'polite')
        return a
    },

    'radio-group': () => new RadioGroup({
        options: [
            { label: 'Light',  value: 'light' },
            { label: 'Dark',   value: 'dark'  },
            { label: 'System', value: 'system'},
        ],
        defaultValue: 'dark',
        onChange: (_v: string) => {},
    }),

    'rating': () => {
        const r = new Rating(
            {},
            { max: 5, filledColor: { type: 'named', name: 'yellow' }, onSelect: (_v: number) => {} },
        )
        r.setValue(4)
        return r
    },

    'theme-switcher': () => new ThemeSwitcher({
        themes: ['Default', 'Dracula', 'Catppuccin', 'Nord', 'One Dark'],
        activeTheme: 'Catppuccin',
        activeColor: { type: 'named', name: 'cyan' },
    }),

    'tree-select': () => new TreeSelect(
        [
            { label: 'Frontend', value: 'frontend', expanded: true, children: [
                { label: 'React',      value: 'react'  },
                { label: 'Vue',        value: 'vue'    },
                { label: 'Svelte',     value: 'svelte' },
            ]},
            { label: 'Backend', value: 'backend', children: [
                { label: 'Node.js',    value: 'node'   },
                { label: 'Deno',       value: 'deno'   },
                { label: 'Bun',        value: 'bun'    },
            ]},
        ],
        { multiple: true, activeColor: { type: 'named', name: 'cyan' } },
    ),

    'email-input': () => new EmailInput(
        {},
        {
            placeholder: 'you@example.com',
            domains: ['gmail.com', 'outlook.com', 'proton.me', 'termuijs.dev'],
        },
    ),

    'quiz-prompt': () => new QuizPrompt(
        [
            {
                question: 'What does TermUI use to render widgets?',
                options: ['Canvas API', 'xterm.js', 'React DOM', 'WebGL'],
                correctIndex: 1,
            },
            {
                question: 'Which language does TermUI use?',
                options: ['JavaScript', 'Python', 'TypeScript', 'Rust'],
                correctIndex: 2,
            },
        ],
        {},
        { correctColor: { type: 'named', name: 'green' }, wrongColor: { type: 'named', name: 'red' } },
    ),

    'editable-prompt': () => new EditablePrompt({
        message: 'Configure your project:',
        choices: [
            { type: 'checkbox', name: 'typescript', message: 'Enable TypeScript', initial: 'true' },
            { type: 'checkbox', name: 'eslint',     message: 'Add ESLint',        initial: 'true' },
            { type: 'text',     name: 'projectName',message: 'Project name',      initial: 'my-app' },
        ],
    }),

    'survey-prompt': () => new SurveyPrompt(
        [
            { id: 'satisfaction', question: 'How satisfied are you?',  type: 'choice', options: ['Very', 'Somewhat', 'Not really', 'Not at all'] },
            { id: 'recommend',   question: 'Would you recommend?',      type: 'choice', options: ['Yes', 'Maybe', 'No'] },
            { id: 'feedback',    question: 'Any other feedback?',        type: 'text' },
        ],
        {},
        { onComplete: (_answers: Record<string, string>) => {} },
    ),

    'breadcrumb': () => new Breadcrumb({
        items: [
            { label: 'Home',    onSelect: () => {} },
            { label: 'Docs',    onSelect: () => {} },
            { label: 'Widgets', onSelect: () => {} },
            { label: 'Breadcrumb' },
        ],
        currentColor:    { type: 'named', name: 'cyan'       },
        separatorColor:  { type: 'named', name: 'brightBlack'},
    }),

    'disclosure': () => new Disclosure(
        new Text('TermUI ships with over 60 widgets covering display, feedback, data, input, and layout categories. All widgets are TypeScript-native and work in both Node.js and browser environments via xterm.js.', {}, { wrap: true }),
        { summary: 'About TermUI', defaultOpen: true },
    ),

    'listbar': () => new Listbar(
        [
            { label: 'New',     key: 'n', action: () => {} },
            { label: 'Open',    key: 'o', action: () => {} },
            { label: 'Save',    key: 's', action: () => {} },
            { label: 'Search',  key: '/', action: () => {} },
            { label: 'Help',    key: '?', action: () => {} },
            { label: 'Quit',    key: 'q', action: () => {} },
        ],
        {},
        { activeColor: { type: 'named', name: 'cyan' }, keyColor: { type: 'named', name: 'brightBlack' } },
    ),

    'popover': () => {
        const content = new Text('Press ? for help\nPress q to quit\nPress Tab to focus next')
        const p = new Popover(content, {}, { placement: 'bottom', title: 'Shortcuts' })
        p.open()
        return p
    },

    'search-input': () => new SearchInput({
        placeholder: 'Search components…',
        onSearch: (_q: string) => {},
    }),

    'token-usage': () => {
        const w = new TokenUsage({ inputTokens: 1842, outputTokens: 524 })
        return w
    },

    'welcome-screen': () => new WelcomeScreen({
        title: 'TermUI',
        subtitle: 'The shadcn/ui for terminals',
        tagline: 'Build beautiful CLI apps in TypeScript',
        keymap: [
            { key: '↑↓',  action: 'navigate'    },
            { key: 'Enter', action: 'select'     },
            { key: '?',     action: 'help'       },
            { key: 'q',     action: 'quit'       },
        ],
    }),

    'setup-flow': () => new SetupFlow({
        appName: 'My TermUI App',
        steps: [
            { title: 'Welcome',      render: () => new Text('Let\'s get your project set up!') },
            { title: 'Install',      render: () => new Text('npm install @termuijs/ui') },
            { title: 'Configure',    render: () => new Text('Create your first widget.') },
        ],
        onComplete: () => {},
    }),

    'spacer': () => {
        const col = new Stack([])
        col.addChild(new Text('Above spacer', { fg: { type: 'named', name: 'cyan' } }))
        col.addChild(new Spacer(1))
        col.addChild(new Text('Below spacer', { fg: { type: 'named', name: 'yellow' } }))
        return col
    },
}

export default demos
