import { useEffect, useRef } from 'react'
import { HiOutlinePaperAirplane, HiOutlineLightningBolt, HiOutlineX } from 'react-icons/hi'
import { useChatBot } from '../../hooks/useChatBot'
import CodeBlock from './CodeBlock'

/* ─── Rendu d'un message bot avec markdown simple ─── */
function BotText({ text }) {
  const rendered = text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/90">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-blue-300">$1</em>')
    .replace(/`(.*?)`/g, '<code class="px-1 py-0.5 rounded bg-white/10 text-emerald-300 text-xs font-mono">$1</code>')
    .replace(/\n/g, '<br/>')

  return <p className="text-sm text-white/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: rendered }} />
}

/* ─── Bulle message ─── */
function MessageBubble({ msg }) {
  if (msg.from === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-tr-sm
          bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm">
          {msg.text}
        </div>
      </div>
    )
  }

  if (msg.type === 'intro') {
    return (
      <div className="flex gap-2.5">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600
          flex items-center justify-center shrink-0 mt-0.5">
          <HiOutlineLightningBolt className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%]">
          <BotText text={msg.text} />
        </div>
      </div>
    )
  }

  const { response } = msg

  return (
    <div className="flex gap-2.5">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600
        flex items-center justify-center shrink-0 mt-0.5">
        <HiOutlineLightningBolt className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="flex-1 space-y-2.5 max-w-[92%]">
        {/* Texte */}
        <div className="glass rounded-2xl rounded-tl-sm px-4 py-3">
          <BotText text={response.text} />
        </div>

        {/* Exemple de code */}
        {response.example && (
          <CodeBlock
            label="Exemple"
            code={response.example}
            type="neutral"
            comment={null}
          />
        )}

        {/* Tip */}
        {response.tip && (
          <div className="px-4 py-2.5 rounded-xl bg-amber-500/8 border border-amber-500/20">
            <p className="text-xs text-amber-300 leading-relaxed">
              <span className="font-semibold">Astuce : </span>{response.tip}
            </p>
          </div>
        )}

        {/* Suggestions (réponse par défaut) */}
        {response.suggestions && (
          <div className="space-y-1.5 pt-1">
            {response.suggestions.map((s) => (
              <p key={s} className="text-xs text-blue-400/70">• {s}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Indicateur de frappe ─── */
function TypingIndicator() {
  return (
    <div className="flex gap-2.5">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600
        flex items-center justify-center shrink-0">
        <HiOutlineLightningBolt className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="glass rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Panel principal ─── */
export default function ChatPanel({ onClose }) {
  const { messages, input, setInput, typing, sendMessage } = useChatBot()
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  // Scroll automatique vers le bas
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/6 shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600
          flex items-center justify-center">
          <HiOutlineLightningBolt className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Bella</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/35">Assistante pédagogique</span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg
              text-white/30 hover:text-white/70 hover:bg-white/8 transition-all"
            aria-label="Fermer"
          >
            <HiOutlineX className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>


      {/* Input */}
      <div className="px-4 pb-4 shrink-0">
        <div className="flex gap-2 glass rounded-xl p-1.5">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Pose ta question à Bella..."
            disabled={typing}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-white/25
              outline-none disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || typing}
            className="flex items-center justify-center w-9 h-9 rounded-lg
              bg-gradient-to-br from-blue-600 to-indigo-600
              text-white hover:from-blue-500 hover:to-indigo-500
              transition-all duration-150 shrink-0
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <HiOutlinePaperAirplane className="w-4 h-4 rotate-90" />
          </button>
        </div>
        <p className="text-[10px] text-white/20 mt-1.5 text-center">Entrée pour envoyer</p>
      </div>
    </div>
  )
}
