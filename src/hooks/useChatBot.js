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

// Noms lisibles des sections pour le préfixe contextuel
const SECTION_LABELS = {
  declaration: 'déclaration de tableau',
  acces:       "lecture et modification d'une case",
  remplir:     'remplissage avec scanf',
  recherche:   'recherche de valeurs',
  parcours:    'somme, moyenne et filtres',
}

// Trouve la meilleure réponse dans la KB
// currentSection booste les entrées appartenant à la section active
function findBestMatch(input, currentSection) {
  const normalized = normalize(input)
  const words = normalized.split(/\s+/)

  let bestMatch = null
  let bestScore = 0

  for (const entry of CHATBOT_KB) {
    let score = 0
    for (const keyword of entry.keywords) {
      const normKw = normalize(keyword)
      if (normKw.length === 0) continue  // & %d %f etc. → chaîne vide → on ignore
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
    // Bonus si l'entrée appartient à la section où se trouve l'élève
    if (currentSection && entry.section === currentSection) score += 2

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
  text: "Bonjour ! Je suis **AdaptativeCBot**, ton assistante pour cette séance.\n\nPose-moi n'importe quelle question sur les tableaux Python. Je suis là pour t'aider.",
  timestamp: Date.now(),
}

export function useChatBot({ currentSection } = {}) {
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

    const match = findBestMatch(userText, currentSection)

    // Préfixe contextuel si la question correspond à la section active
    const isContextual = match && match.section && match.section === currentSection
    const contextPrefix = isContextual
      ? `Je vois que tu es dans la section **${SECTION_LABELS[currentSection]}** — et c'est une bonne question ! Voici :`
      : null

    const botMsg = {
      id: nextId(),
      from: 'bot',
      timestamp: Date.now(),
      ...(match
        ? { type: 'answer', response: match.response, contextPrefix }
        : { type: 'default', response: DEFAULT_RESPONSE }
      ),
    }

    setMessages((prev) => [...prev, botMsg])
    setTyping(false)
  }, [input, currentSection])

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
