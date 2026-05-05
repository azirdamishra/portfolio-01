import { useEffect, useRef, useState, useCallback } from 'react'

function SnippetCard({ snippet, onRun, terminalRef }) {
  const [open, setOpen] = useState(false)

  function handleRun() {
    onRun(snippet.source)
    terminalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="rounded-xl border border-gray-700 overflow-hidden" style={{ background: '#161b22' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <div>
          <span className="font-mono text-sm font-semibold text-cyan-400">{snippet.id}</span>
          <span className="ml-3 text-sm text-gray-300">{snippet.title}</span>
          {snippet.description && (
            <span className="ml-3 text-xs text-gray-500">{snippet.description}</span>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-gray-700">
          <pre
            className="px-5 py-4 font-mono text-sm text-green-400 leading-6 overflow-x-auto whitespace-pre"
            style={{ background: '#0d1117' }}
          >
            {snippet.source}
          </pre>
          <div className="px-5 py-3 flex justify-end" style={{ background: '#0d1117' }}>
            <button
              onClick={handleRun}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium
                         bg-gradient-to-r from-[#00c6ff] to-[#0072ff] text-white
                         hover:opacity-90 transition-opacity"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Run in terminal
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function SnippetsSection({ onRun, terminalRef }) {
  const [snippets, setSnippets] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch('/api/lox/snippets')
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => { setSnippets(data); setStatus('ok') })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div className="mt-16">
      <h2 className="subhead-text">
        Code{' '}
        <span className="blue-gradient_text font-semibold drop-shadow">Examples</span>
      </h2>
      <p className="mt-3 mb-8 text-slate-500 dark:text-slate-400 text-sm">
        Expand any snippet to view the source, then run it directly in the terminal above.
      </p>

      {status === 'loading' && (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-14 rounded-xl animate-pulse" style={{ background: '#161b22' }} />
          ))}
        </div>
      )}

      {status === 'error' && (
        <p className="font-mono text-sm text-red-400">
          Could not load snippets — the API may be sleeping (Render cold start). Try refreshing in a moment.
        </p>
      )}

      {status === 'ok' && (
        <div className="space-y-3">
          {snippets.map(snippet => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onRun={onRun}
              terminalRef={terminalRef}
            />
          ))}
        </div>
      )}
    </div>
  )
}

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

  const inputRef       = useRef(null)
  const abortRef       = useRef(null)
  const terminalRef    = useRef(null)
  const terminalBodyRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
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
        ref={terminalRef}
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
          ref={terminalBodyRef}
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

        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 font-mono text-center">
        Enter&nbsp;to run &nbsp;·&nbsp; Shift+Enter&nbsp;for newline &nbsp;·&nbsp; ↑↓&nbsp;history &nbsp;·&nbsp; Ctrl+L&nbsp;clear
      </p>

      <SnippetsSection onRun={runCode} terminalRef={terminalRef} />
    </section>
  )
}
