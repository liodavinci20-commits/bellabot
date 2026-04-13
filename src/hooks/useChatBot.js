import { useState, useCallback, useRef } from 'react'
import { CHATBOT_KB, DEFAULT_RESPONSE } from '../data/lessons/chatbot-arrays'

// Normalise un texte pour la comparaison (minuscules, sans accents)
function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim()
}

// Trouve la meilleure réponse dans la KB
function findBestMatch(input) {
  const normalized = normalize(input)
  const words = normalized.split(/\s+/)

  let bestMatch = null
  let bestScore = 0

  for (const entry of CHATBOT_KB) {
    let score = 0
    for (const keyword of entry.keywords) {
      const normKw = normalize(keyword)
      // Correspondance exacte de phrase
      if (normalized.includes(normKw)) score += 3
      // Correspondance par mot individuel
      else {
        const kwWords = normKw.split(/\s+/)
        for (const word of words) {
          if (kwWords.includes(word) && word.length > 2) score += 1
        }
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = entry
    }
  }

  return bestScore >= 1 ? bestMatch : null
}

const BELLA_INTRO = {
  id: 'intro',
  from: 'bot',
  type: 'intro',
  text: "Bonjour ! Je suis **Bella**, ton assistante pour cette séance.\n\nPose-moi n'importe quelle question sur les tableaux Python. Je suis là pour t'aider.",
  timestamp: Date.now(),
}

export function useChatBot() {
  const [messages, setMessages] = useState([BELLA_INTRO])
  const [input, setInput]       = useState('')
  const [typing, setTyping]     = useState(false)
  const idRef = useRef(1)

  const nextId = () => `msg-${idRef.current++}`

  const sendMessage = useCallback(async (text) => {
    const userText = (text || input).trim()
    if (!userText) return

    // Ajouter le message utilisateur
    const userMsg = { id: nextId(), from: 'user', text: userText, timestamp: Date.now() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    // Simuler le temps de réponse de Bella
    await new Promise((r) => setTimeout(r, 700 + Math.random() * 400))

    const match = findBestMatch(userText)
    const botMsg = {
      id: nextId(),
      from: 'bot',
      timestamp: Date.now(),
      ...(match
        ? { type: 'answer', response: match.response }
        : { type: 'default', response: DEFAULT_RESPONSE }
      ),
    }

    setMessages((prev) => [...prev, botMsg])
    setTyping(false)
  }, [input])

  const sendQuickQuestion = useCallback((question) => {
    sendMessage(question)
  }, [sendMessage])

  const clearChat = useCallback(() => {
    setMessages([BELLA_INTRO])
  }, [])

  return {
    messages,
    input, setInput,
    typing,
    sendMessage,
    sendQuickQuestion,
    clearChat,
  }
}
