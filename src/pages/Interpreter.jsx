import { useEffect, useRef, useState, useCallback } from 'react'

const WELCOME_LINES = [
  { type: 'system', text: '╔══════════════════════════════════════════════════════╗' },
  { type: 'system', text: '║          Lox Interpreter  —  tree-walk v1.0          ║' },
  { type: 'system', text: '╚══════════════════════════════════════════════════════╝' },
  { type: 'system', text: '' },
  { type: 'system', text: 'A dynamically-typed scripting language built in Java.' },
  { type: 'system', text: 'Type Lox code below and press Enter to run it.' },
  { type: 'system', text: '' },
  { type: 'system', text: '  print "Hello, world!";' },
  { type: 'system', text: '  var x = 10; print x * x;' },
  { type: 'system', text: '  fun greet(name) { print "Hi, " + name + "!"; }' },
  { type: 'system', text: '' },
  { type: 'system', text: 'Shortcuts:  ↑ ↓  history   Ctrl+L  clear   Ctrl+C  abort' },
  { type: 'system', text: '─'.repeat(54) },
  { type: 'system', text: '' },
]

const LINE_COLORS = {
  input:  'text-green-400',
  output: 'text-gray-200',
  error:  'text-red-400',
  system: 'text-cyan-500',
}

function TerminalLine({ line }) {
  const color = LINE_COLORS[line.type] ?? 'text-gray-200'
  if (line.text === '') return <div className="h-3" />
  return (
    <div className={`font-mono text-sm leading-5 whitespace-pre-wrap break-all ${color}`}>
      {line.type === 'input' && (
        <span className="text-green-500 select-none">lox&gt;&nbsp;</span>
      )}
      {line.text}
    </div>
  )
}

function Spinner() {
  const [frame, setFrame] = useState(0)
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
  useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % frames.length), 80)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="font-mono text-sm text-yellow-400 leading-5">
      {frames[frame]} executing…
    </div>
  )
}

export default function Interpreter() {
  const [lines, setLines] = useState(WELCOME_LINES)
  const [input, setInput] = useState('')
  const [inputHistory, setInputHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)

  const bottomRef = useRef(null)
  const inputRef  = useRef(null)
  const abortRef  = useRef(null)

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => { scrollToBottom() }, [lines, isLoading, scrollToBottom])

  const focusInput = useCallback(() => inputRef.current?.focus(), [])

  const pushLines = useCallback((newLines) => {
    setLines(prev => [...prev, ...newLines])
  }, [])

  const clearTerminal = useCallback(() => {
    setLines(WELCOME_LINES)
  }, [])

  const runCode = useCallback(async (source) => {
    if (!source.trim()) return

    pushLines([{ type: 'input', text: source }])
    setInputHistory(prev => [source, ...prev])
    setHistoryIndex(-1)
    setInput('')
    setIsLoading(true)

    abortRef.current = new AbortController()

    try {
      const res = await fetch('/api/lox/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source }),
        signal: abortRef.current.signal,
      })

      const data = await res.json()

      if (!res.ok) {
        pushLines([{ type: 'error', text: data.error ?? data.message ?? `HTTP ${res.status}` }])
      } else {
        const stdout = (data.output ?? data.result ?? data.stdout ?? '').toString().trimEnd()
        const stderr = (data.error  ?? data.stderr  ?? '').toString().trimEnd()

        if (stdout) {
          stdout.split('\n').forEach(t => pushLines([{ type: 'output', text: t }]))
        }
        if (stderr) {
          stderr.split('\n').forEach(t => pushLines([{ type: 'error', text: t }]))
        }
        if (!stdout && !stderr) {
          pushLines([{ type: 'system', text: '(no output)' }])
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        pushLines([{ type: 'error', text: `Network error: ${err.message}` }])
      }
    } finally {
      setIsLoading(false)
      abortRef.current = null
    }
  }, [pushLines])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading) runCode(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistoryIndex(prev => {
        const next = Math.min(prev + 1, inputHistory.length - 1)
        setInput(inputHistory[next] ?? '')
        return next
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistoryIndex(prev => {
        const next = Math.max(prev - 1, -1)
        setInput(next === -1 ? '' : inputHistory[next] ?? '')
        return next
      })
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      clearTerminal()
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault()
      if (isLoading) {
        abortRef.current?.abort()
        pushLines([{ type: 'error', text: '^C' }])
      } else {
        setInput('')
      }
    }
  }, [input, isLoading, inputHistory, runCode, clearTerminal, pushLines])

  return (
    <section className="max-container">
      <h1 className="head-text">
        Lox{' '}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Interpreter
        </span>
      </h1>

      <p className="mt-5 text-slate-500 dark:text-slate-400 max-w-2xl">
        An interactive playground for{' '}
        <a
          href="https://craftinginterpreters.com/the-lox-language.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Lox
        </a>
        , a dynamically-typed scripting language. Built as a tree-walk
        interpreter in Java, served via a REST API I deployed on Render.
      </p>

      {/* Terminal window */}
      <div
        className="mt-10 rounded-xl overflow-hidden shadow-2xl border border-gray-700"
        style={{ background: '#0d1117' }}
        onClick={focusInput}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b border-gray-700 select-none"
          style={{ background: '#161b22' }}
        >
          <span className="w-3 h-3 rounded-full bg-red-500 cursor-default" title="Close" />
          <span className="w-3 h-3 rounded-full bg-yellow-400 cursor-default" title="Minimise" />
          <span className="w-3 h-3 rounded-full bg-green-500 cursor-default" title="Maximise" />
          <span
            className="ml-auto mr-auto font-mono text-xs text-gray-400 tracking-wide"
            style={{ marginLeft: 'auto', marginRight: 'auto', transform: 'translateX(-2rem)' }}
          >
            lox — interpreter
          </span>
        </div>

        {/* Output scroll area */}
        <div
          className="p-5 overflow-y-auto cursor-text"
          style={{ minHeight: '340px', maxHeight: '520px' }}
        >
          {lines.map((line, i) => (
            <TerminalLine key={i} line={line} />
          ))}

          {isLoading && <Spinner />}

          {/* Active input row */}
          {!isLoading && (
            <div className="flex items-start font-mono text-sm leading-5 mt-0.5">
              <span className="text-green-500 select-none shrink-0">lox&gt;&nbsp;</span>
              <div className="relative flex-1">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  className="w-full resize-none bg-transparent text-green-400 outline-none border-none caret-green-400 font-mono text-sm leading-5 overflow-hidden"
                  style={{ caretColor: '#4ade80' }}
                  onInput={e => {
                    e.target.style.height = 'auto'
                    e.target.style.height = e.target.scrollHeight + 'px'
                  }}
                />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 font-mono text-center">
        Enter&nbsp;to run &nbsp;·&nbsp; Shift+Enter&nbsp;for newline &nbsp;·&nbsp; ↑↓&nbsp;history &nbsp;·&nbsp; Ctrl+L&nbsp;clear
      </p>
    </section>
  )
}
