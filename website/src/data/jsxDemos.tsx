/** @jsxImportSource @termuijs/jsx */
// Live demos for @termuijs/jsx hooks. Each entry returns a VNode; BrowserPreview
// reconciles it and wires the fiber re-render loop + useInput dispatch, so the
// hooks run for real (state updates, effects, keyboard interaction).
import type { VNode } from '@termuijs/jsx'
import {
    useState,
    useEffect,
    useCounter,
    useInput,
    useModal,
    useViewMeta,
    useTerminalSize,
    useFeedback,
    useFocusWithin,
    useToggle,
    useTypeahead,
    useKeyboardNavigation,
    useSubprocess,
    useFocus,
    useThrottle,
    useTimeout,
    useBoolean,
    useBell,
    useList,
    useStopwatch,
    useMap,
    useDebounce,
    useFocusManager,
    useCountdown,
    useElementSize,
    useClipboard,
    useFocusTrap,
    useSet,
    detectPackageManager,
    getPackageManagerCommands,
    usePackageManager,
    triggerFeedback,
    AUDIBLE_FEEDBACK_TYPES,
    type FeedbackType,
} from '@termuijs/jsx'

// ── use-counter ──────────────────────────────────────
function UseCounterDemo() {
    const [count, { increment, decrement, reset }] = useCounter(0, { min: 0, max: 10 })
    useInput((key) => {
        if (key === '+' || key === '=') increment()
        else if (key === '-' || key === '_') decrement()
        else if (key === 'r') reset()
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useCounter</text>
            <text>Count: <text bold color="green">{String(count)}</text>  (0–10)</text>
            <text dim>press + / − to change · r to reset</text>
        </box>
    )
}

// ── use-modal ────────────────────────────────────────
function UseModalDemo() {
    const confirm = useModal<{ message: string }, boolean>()
    const [result, setResult] = useState<string>('none')
    useInput((key) => {
        if (key === 'o') confirm.show({ message: 'Delete file?' })
        else if (key === 'y') { confirm.dismiss(true); setResult('confirmed') }
        else if (key === 'n') { confirm.hide(); setResult('cancelled') }
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useModal</text>
            <text>visible: <text bold color={confirm.visible ? 'green' : 'red'}>{String(confirm.visible)}</text></text>
            <text>message: <text color="yellow">{confirm.props?.message ?? '—'}</text></text>
            <text>last result: <text bold>{result}</text></text>
            <text dim>o open · y confirm · n cancel</text>
        </box>
    )
}

// ── use-view-meta ────────────────────────────────────
function UseViewMetaDemo() {
    const [title, setTitle] = useState('TermUI Demo')
    useViewMeta({ title, cursor: 'bar', mouseMode: 'click' })
    useInput((key) => {
        if (key === 't') setTitle((t) => (t === 'TermUI Demo' ? 'Changed!' : 'TermUI Demo'))
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useViewMeta</text>
            <text>title: <text bold color="green">{title}</text></text>
            <text>cursor: <text color="yellow">bar</text> · mouse: <text color="yellow">click</text></text>
            <text dim>writes terminal title/cursor/mouse ANSI (no visible output here) · t to change title</text>
        </box>
    )
}

// ── use-terminal-size ────────────────────────────────
function UseTerminalSizeDemo() {
    const { cols, rows } = useTerminalSize()
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useTerminalSize</text>
            <text>cols: <text bold color="green">{String(cols)}</text>  rows: <text bold color="green">{String(rows)}</text></text>
            <text dim>resize the preview to see it update live</text>
        </box>
    )
}

// ── use-feedback ─────────────────────────────────────
function UseFeedbackDemo() {
    const feedback = useFeedback({ enabled: true })
    const [last, setLast] = useState<FeedbackType | 'none'>('none')
    useInput((key) => {
        if (key === 's') { feedback('success'); setLast('success') }
        else if (key === 'e') { feedback('error'); setLast('error') }
        else if (key === 'c') { feedback('click'); setLast('click') }
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useFeedback</text>
            <text>last cue: <text bold color="green">{last}</text></text>
            <text dim>fires terminal bell for audible types · s success · e error · c click (silent)</text>
        </box>
    )
}

// ── use-focus-within ─────────────────────────────────
function UseFocusWithinDemo() {
    const { focused, focus, FocusContext } = useFocusManager()
    return (
        <FocusContext.Provider value={{ focused, focus, blur: () => {} }}>
            <FocusWithinInner focus={focus} focused={focused} />
        </FocusContext.Provider>
    )
}
function FocusWithinInner({ focus, focused }: { focus: (id: string) => void; focused: string | null }) {
    const within = useFocusWithin({ ids: ['a', 'b'] })
    useInput((key) => {
        if (key === '1') focus('a')
        else if (key === '2') focus('b')
        else if (key === '3') focus('c')
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useFocusWithin</text>
            <text>focused id: <text bold color="yellow">{focused ?? '—'}</text></text>
            <text>within [a,b]: <text bold color={within ? 'green' : 'red'}>{String(within)}</text></text>
            <text dim>1 focus a · 2 focus b · 3 focus c (outside)</text>
        </box>
    )
}

// ── use-toggle ───────────────────────────────────────
function UseToggleDemo() {
    const [value, { toggle, on, off }] = useToggle(false) as [boolean, { toggle: () => void; on: () => void; off: () => void }]
    useInput((key) => {
        if (key === ' ' || key === 't') toggle()
        else if (key === 'o') on()
        else if (key === 'f') off()
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useToggle</text>
            <text>value: <text bold color={value ? 'green' : 'red'}>{String(value)}</text></text>
            <text dim>space/t toggle · o on · f off</text>
        </box>
    )
}

// ── use-typeahead ────────────────────────────────────
function UseTypeaheadDemo() {
    const items = ['apple', 'apricot', 'banana', 'cherry', 'cranberry', 'date']
    const matchIndex = useTypeahead(items, (s) => s)
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useTypeahead</text>
            <text>matchIndex: <text bold color="green">{String(matchIndex)}</text></text>
            <text>matched: <text bold color="yellow">{matchIndex >= 0 ? items[matchIndex] : '—'}</text></text>
            <text dim>type letters (e.g. "ap", "cr") to jump · resets after 500ms</text>
        </box>
    )
}

// ── use-keyboard-navigation ──────────────────────────
function UseKeyboardNavigationDemo() {
    const items = ['Profile', 'Settings', 'Billing', 'Logout']
    const [chosen, setChosen] = useState('—')
    const { selectedIndex } = useKeyboardNavigation({
        itemCount: items.length,
        onSelect: (i) => setChosen(items[i]!),
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useKeyboardNavigation</text>
            <box flexDirection="column">
                {items.map((item, i) => (
                    <text color={i === selectedIndex ? 'green' : undefined} bold={i === selectedIndex}>
                        {i === selectedIndex ? '› ' : '  '}{item}
                    </text>
                ))}
            </box>
            <text>selected: <text bold>{chosen}</text></text>
            <text dim>↑/↓ move · enter select · home/end jump</text>
        </box>
    )
}

// ── use-subprocess ───────────────────────────────────
function UseSubprocessDemo() {
    const { run } = useSubprocess()
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useSubprocess</text>
            <text>run: <text bold color="green">{typeof run === 'function' ? 'ready' : 'unavailable'}</text></text>
            <text dim>run(['git','status']) drops raw mode, spawns the process, restores on exit — no subprocess in browser</text>
        </box>
    )
}

// ── use-focus ────────────────────────────────────────
function UseFocusDemo() {
    const { focused, focus, blur, FocusContext } = useFocusManager()
    return (
        <FocusContext.Provider value={{ focused, focus, blur }}>
            <FocusInner />
        </FocusContext.Provider>
    )
}
function FocusInner() {
    const name = useFocus({ id: 'name', autoFocus: true })
    const email = useFocus({ id: 'email' })
    useInput((key) => {
        if (key === '1') name.focus()
        else if (key === '2') email.focus()
        else if (key === 'b') name.blur()
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useFocus</text>
            <text color={name.isFocused ? 'green' : undefined} bold={name.isFocused}>{name.isFocused ? '› ' : '  '}name</text>
            <text color={email.isFocused ? 'green' : undefined} bold={email.isFocused}>{email.isFocused ? '› ' : '  '}email</text>
            <text dim>1 focus name · 2 focus email · b blur</text>
        </box>
    )
}

// ── use-throttle ─────────────────────────────────────
function UseThrottleDemo() {
    const [raw, setRaw] = useState(0)
    const throttled = useThrottle(raw, 1000)
    useEffect(() => {
        const id = setInterval(() => setRaw((n) => n + 1), 150)
        return () => clearInterval(id)
    }, [])
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useThrottle</text>
            <text>raw: <text bold color="yellow">{String(raw)}</text></text>
            <text>throttled (1s): <text bold color="green">{String(throttled)}</text></text>
            <text dim>raw ticks every 150ms; throttled updates at most once/sec</text>
        </box>
    )
}

// ── use-timeout ──────────────────────────────────────
function UseTimeoutDemo() {
    const [fired, setFired] = useState(false)
    const [nonce, setNonce] = useState(0)
    useTimeout(() => setFired(true), 2000)
    useInput((key) => {
        if (key === 'r') { setFired(false); setNonce((n) => n + 1) }
    })
    return (
        <box flexDirection="column" padding={1} gap={1} key={String(nonce)}>
            <text bold color="cyan">useTimeout</text>
            <text>fired after 2s: <text bold color={fired ? 'green' : 'red'}>{String(fired)}</text></text>
            <text dim>callback runs once after 2000ms · r to restart</text>
        </box>
    )
}

// ── use-boolean ──────────────────────────────────────
function UseBooleanDemo() {
    const [value, { setTrue, setFalse, toggle }] = useBoolean(false)
    useInput((key) => {
        if (key === 't') toggle()
        else if (key === 'y') setTrue()
        else if (key === 'n') setFalse()
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useBoolean</text>
            <text>value: <text bold color={value ? 'green' : 'red'}>{String(value)}</text></text>
            <text dim>t toggle · y setTrue · n setFalse</text>
        </box>
    )
}

// ── use-bell ─────────────────────────────────────────
function UseBellDemo() {
    const bell = useBell()
    const [count, setCount] = useState(0)
    useInput((key) => {
        if (key === 'b') { bell(); setCount((c) => c + 1) }
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useBell</text>
            <text>rings: <text bold color="green">{String(count)}</text></text>
            <text dim>press b to emit BEL (audible in a real terminal) · b</text>
        </box>
    )
}

// ── use-list ─────────────────────────────────────────
function UseListDemo() {
    const [list, { push, removeAt, clear }] = useList<string>(['alpha', 'beta'])
    useInput((key) => {
        if (key === 'a') push('item-' + (list.length + 1))
        else if (key === 'd') removeAt(list.length - 1)
        else if (key === 'c') clear()
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useList</text>
            <text>count: <text bold color="green">{String(list.length)}</text></text>
            <box flexDirection="column">
                {list.map((item) => <text color="yellow">• {item}</text>)}
            </box>
            <text dim>a add · d remove last · c clear</text>
        </box>
    )
}

// ── use-stopwatch ────────────────────────────────────
function UseStopwatchDemo() {
    const [elapsed, { start, pause, reset, isRunning }] = useStopwatch({ intervalMs: 100 })
    useEffect(() => { start() }, [])
    useInput((key) => {
        if (key === 's') start()
        else if (key === 'p') pause()
        else if (key === 'r') reset()
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useStopwatch</text>
            <text>elapsed: <text bold color="green">{(elapsed / 1000).toFixed(1)}s</text></text>
            <text>running: <text bold color={isRunning ? 'green' : 'red'}>{String(isRunning)}</text></text>
            <text dim>auto-started · s start · p pause · r reset</text>
        </box>
    )
}

// ── use-map ──────────────────────────────────────────
function UseMapDemo() {
    const [map, { set, remove, reset }] = useMap<string, number>([['a', 1], ['b', 2]])
    useInput((key) => {
        if (key === 's') set('c', map.size + 1)
        else if (key === 'd') remove('a')
        else if (key === 'r') reset()
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useMap</text>
            <text>size: <text bold color="green">{String(map.size)}</text></text>
            <box flexDirection="column">
                {[...map.entries()].map(([k, v]) => <text color="yellow">{k} = {String(v)}</text>)}
            </box>
            <text dim>s set c · d remove a · r reset</text>
        </box>
    )
}

// ── use-debounce ─────────────────────────────────────
function UseDebounceDemo() {
    const [raw, setRaw] = useState(0)
    const debounced = useDebounce(raw, 800)
    useInput((key) => {
        if (key === ' ' || key === '+') setRaw((n) => n + 1)
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useDebounce</text>
            <text>raw: <text bold color="yellow">{String(raw)}</text></text>
            <text>debounced (800ms): <text bold color="green">{String(debounced)}</text></text>
            <text dim>press space rapidly; debounced settles after 800ms idle</text>
        </box>
    )
}

// ── use-focus-manager ────────────────────────────────
function UseFocusManagerDemo() {
    const { focused, focus, blur, FocusContext } = useFocusManager()
    useInput((key) => {
        if (key === '1') focus('first')
        else if (key === '2') focus('second')
        else if (key === 'b') blur()
    })
    return (
        <FocusContext.Provider value={{ focused, focus, blur }}>
            <box flexDirection="column" padding={1} gap={1}>
                <text bold color="cyan">useFocusManager</text>
                <text>focused: <text bold color="green">{focused ?? '(none)'}</text></text>
                <text dim>owns focus state for a subtree · 1 first · 2 second · b blur</text>
            </box>
        </FocusContext.Provider>
    )
}

// ── use-countdown ────────────────────────────────────
function UseCountdownDemo() {
    const [count, { start, pause, reset }] = useCountdown(10, { intervalMs: 1000 })
    useEffect(() => { start() }, [])
    useInput((key) => {
        if (key === 's') start()
        else if (key === 'p') pause()
        else if (key === 'r') reset()
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useCountdown</text>
            <text>count: <text bold color={count === 0 ? 'red' : 'green'}>{String(count)}</text></text>
            <text dim>auto-started from 10 · s start · p pause · r reset</text>
        </box>
    )
}

// ── use-element-size ─────────────────────────────────
function UseElementSizeDemo() {
    const [, { width, height }] = useElementSize()
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useElementSize</text>
            <text>width: <text bold color="green">{String(width)}</text>  height: <text bold color="green">{String(height)}</text></text>
            <text dim>returns [ref, size] — attach ref to a widget; reports its layout rect on resize</text>
        </box>
    )
}

// ── use-clipboard ────────────────────────────────────
function UseClipboardDemo() {
    const { copied, copy } = useClipboard({ resetMs: 1500 })
    useInput((key) => {
        if (key === 'c') copy('Hello from TermUI!')
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useClipboard</text>
            <text>copied: <text bold color={copied ? 'green' : 'red'}>{String(copied)}</text></text>
            <text dim>c copies "Hello from TermUI!" to the system clipboard · flag resets after 1.5s</text>
        </box>
    )
}

// ── use-focus-trap ───────────────────────────────────
function UseFocusTrapDemo() {
    const { focused, focus, blur, FocusContext } = useFocusManager()
    return (
        <FocusContext.Provider value={{ focused, focus, blur }}>
            <FocusTrapInner focused={focused} />
        </FocusContext.Provider>
    )
}
function FocusTrapInner({ focused }: { focused: string | null }) {
    const ids = ['ok', 'cancel']
    useFocusTrap(ids)
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useFocusTrap</text>
            {ids.map((id) => (
                <text color={focused === id ? 'green' : undefined} bold={focused === id}>{focused === id ? '› ' : '  '}{id}</text>
            ))}
            <text dim>Tab / Shift+Tab cycles focus within [ok, cancel] only</text>
        </box>
    )
}

// ── use-set ──────────────────────────────────────────
function UseSetDemo() {
    const [set, { add, toggle, clear }] = useSet<string>(['red'])
    useInput((key) => {
        if (key === 'g') add('green')
        else if (key === 'b') toggle('blue')
        else if (key === 'c') clear()
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">useSet</text>
            <text>size: <text bold color="green">{String(set.size)}</text></text>
            <text>members: <text color="yellow">{[...set].join(', ') || '—'}</text></text>
            <text dim>g add green · b toggle blue · c clear</text>
        </box>
    )
}

// ── detect-package-manager ───────────────────────────
function DetectPackageManagerDemo() {
    const pm = detectPackageManager()
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">detectPackageManager()</text>
            <text>detected: <text bold color="green">{pm}</text></text>
            <text dim>reads npm_config_user_agent / npm_execpath from the environment</text>
        </box>
    )
}

// ── get-package-manager-commands ─────────────────────
function GetPackageManagerCommandsDemo() {
    const cmds = getPackageManagerCommands('pnpm')
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">getPackageManagerCommands('pnpm')</text>
            <text>install: <text color="yellow">{cmds.install('react')}</text></text>
            <text>run: <text color="yellow">{cmds.run('build')}</text></text>
            <text>x: <text color="yellow">{cmds.x('vitest')}</text></text>
        </box>
    )
}

// ── use-package-manager ──────────────────────────────
function UsePackageManagerDemo() {
    const cmds = usePackageManager()
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">usePackageManager</text>
            <text>pm: <text bold color="green">{cmds.pm}</text></text>
            <text>install: <text color="yellow">{cmds.install('react')}</text></text>
            <text dim>hook — stable commands for the detected package manager</text>
        </box>
    )
}

// ── trigger-feedback ─────────────────────────────────
function TriggerFeedbackDemo() {
    const [last, setLast] = useState('none')
    useInput((key) => {
        if (key === 's') { triggerFeedback('success'); setLast('success (bell)') }
        else if (key === 'x') { triggerFeedback('cancel'); setLast('cancel (silent)') }
    })
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">triggerFeedback</text>
            <text>last call: <text bold color="green">{last}</text></text>
            <text dim>plain fn — writes BEL for audible types, otherwise silent · s success · x cancel</text>
        </box>
    )
}

// ── AUDIBLE_FEEDBACK_TYPES ───────────────────────────
function AudibleFeedbackTypesDemo() {
    const values = [...AUDIBLE_FEEDBACK_TYPES]
    return (
        <box flexDirection="column" padding={1} gap={1}>
            <text bold color="cyan">AUDIBLE_FEEDBACK_TYPES</text>
            <text>count: <text bold color="green">{String(values.length)}</text></text>
            <text>values: <text color="yellow">{values.join(', ')}</text></text>
            <text dim>the FeedbackType set that produces an audible bell</text>
        </box>
    )
}

const jsxDemos: Record<string, () => VNode> = {
    'use-counter': () => <UseCounterDemo />,
    'use-modal': () => <UseModalDemo />,
    'use-view-meta': () => <UseViewMetaDemo />,
    'use-terminal-size': () => <UseTerminalSizeDemo />,
    'use-feedback': () => <UseFeedbackDemo />,
    'use-focus-within': () => <UseFocusWithinDemo />,
    'use-toggle': () => <UseToggleDemo />,
    'use-typeahead': () => <UseTypeaheadDemo />,
    'use-keyboard-navigation': () => <UseKeyboardNavigationDemo />,
    'use-subprocess': () => <UseSubprocessDemo />,
    'use-focus': () => <UseFocusDemo />,
    'use-throttle': () => <UseThrottleDemo />,
    'use-timeout': () => <UseTimeoutDemo />,
    'use-boolean': () => <UseBooleanDemo />,
    'use-bell': () => <UseBellDemo />,
    'use-list': () => <UseListDemo />,
    'use-stopwatch': () => <UseStopwatchDemo />,
    'use-map': () => <UseMapDemo />,
    'use-debounce': () => <UseDebounceDemo />,
    'use-focus-manager': () => <UseFocusManagerDemo />,
    'use-countdown': () => <UseCountdownDemo />,
    'use-element-size': () => <UseElementSizeDemo />,
    'use-clipboard': () => <UseClipboardDemo />,
    'use-focus-trap': () => <UseFocusTrapDemo />,
    'use-set': () => <UseSetDemo />,
    'detect-package-manager': () => <DetectPackageManagerDemo />,
    'get-package-manager-commands': () => <GetPackageManagerCommandsDemo />,
    'use-package-manager': () => <UsePackageManagerDemo />,
    'trigger-feedback': () => <TriggerFeedbackDemo />,
    'a-u-d-i-b-l-e_-f-e-e-d-b-a-c-k_-t-y-p-e-s': () => <AudibleFeedbackTypesDemo />,
}

export default jsxDemos
