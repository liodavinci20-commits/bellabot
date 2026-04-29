import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import {
  HiArrowLeft,
  HiArrowRight,
  HiOutlineLightningBolt,
  HiOutlineBookOpen,
  HiOutlineChatAlt2,
  HiOutlineCheckCircle,
  HiOutlineLightBulb,
  HiOutlineCode,
  HiOutlineX,
  HiOutlineLockClosed,
  HiOutlineAdjustments,
  HiOutlineExclamation,
} from 'react-icons/hi'
import { getLessonByProfile } from '../data/lessons/index'
import { useAuth } from '../hooks/useAuth'
import CodeBlock from '../components/learning/CodeBlock'
import AnimationBlock from '../components/learning/AnimationBlock'
import PracticeEditor from '../components/learning/PracticeEditor'
import ChatPanel from '../components/learning/ChatPanel'
import { Illustration } from '../components/learning/Illustrations'

/* ─── Banner d'adaptation pédagogique ─── */
function AdaptationBanner({ adaptation, profileLabel, onDismiss }) {
  if (!adaptation) return null
  return (
    <div className="rounded-2xl border border-violet-500/30 bg-violet-500/[0.07] overflow-hidden">
      <div className="flex items-start gap-3 px-5 py-4">
        <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
          <HiOutlineAdjustments className="w-4 h-4 text-violet-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-violet-300 mb-1">
            Leçon adaptée pour toi
          </p>
          <p className="text-xs text-violet-200/60 leading-relaxed">
            J'ai détecté une difficulté sur <span className="text-violet-300 font-medium">"{adaptation.errorTitle}"</span>.
            La suite de cette leçon a été ajustée pour ton style{' '}
            <span className="text-violet-300 font-medium">[{profileLabel}]</span>.
          </p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-violet-400/40 hover:text-violet-400/80 transition-colors shrink-0"
          >
            <HiOutlineX className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

/* ─── Contenu d'une étape ─── */
function StepContent({ step, profileId, adaptedStep }) {
  const introText        = adaptedStep?.intro        ?? step.intro?.text
  const keyPointText     = adaptedStep?.keyPoint     ?? step.keyPoint
  const illustrationType = adaptedStep?.illustration ?? step.illustration

  const blocksBeforeOriginal = adaptedStep?.extraCodeBlocks?.filter((b) => b.position === 'before') ?? []
  const blocksAfterOriginal  = adaptedStep?.extraCodeBlocks?.filter((b) => b.position === 'after')  ?? []

  return (
    <div className="space-y-6">

      {/* Badge + Titre */}
      <div className="space-y-2.5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
          bg-blue-500/15 border border-blue-500/25 text-blue-400 text-xs font-semibold">
          <HiOutlineBookOpen className="w-3 h-3" />
          {step.badge}
        </span>
        <h2 className="text-2xl font-bold text-white leading-snug">{step.title}</h2>

        {step.objective && (
          <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-blue-500/8 border border-blue-500/20">
            <HiOutlineLightBulb className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-300/80 leading-relaxed">
              <span className="font-semibold">Objectif : </span>{step.objective}
            </p>
          </div>
        )}
      </div>

      {/* Rappel d'erreur — visible uniquement si cette étape a été adaptée */}
      {adaptedStep?.reminder && (
        <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl
          bg-amber-500/8 border border-amber-500/20">
          <HiOutlineExclamation className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-300/80 leading-relaxed">
            <span className="font-semibold text-amber-400">Rappel · </span>
            {adaptedStep.reminder.text}
          </p>
        </div>
      )}

      {/* Intro — adaptée si erreur détectée, sinon originale */}
      {introText && (
        <p className="text-white/60 text-sm leading-relaxed">{introText}</p>
      )}

      {/* Illustration */}
      {illustrationType && (
        <div className="rounded-2xl border border-white/6 bg-white/[0.015] p-4">
          <Illustration type={illustrationType} profile={profileId} />
        </div>
      )}

      {/* Blocs supplémentaires AVANT les blocs originaux */}
      {blocksBeforeOriginal.map((block) =>
        block.type === 'animation'
          ? <AnimationBlock key={block.id} label={block.label} Component={block.component} />
          : <CodeBlock key={block.id} label={block.label} code={block.code} type={block.type} comment={block.comment} />
      )}

      {/* Blocs de code originaux */}
      {step.codeBlocks?.map((block) => (
        <CodeBlock
          key={block.id}
          label={block.label}
          code={block.code}
          type={block.type}
          comment={block.comment}
        />
      ))}

      {/* Blocs supplémentaires APRÈS les blocs originaux */}
      {blocksAfterOriginal.map((block) =>
        block.type === 'animation'
          ? <AnimationBlock key={block.id} label={block.label} Component={block.component} />
          : <CodeBlock key={block.id} label={block.label} code={block.code} type={block.type} comment={block.comment} />
      )}

      {/* Point clé — couleur amber si adapté, bleu si original */}
      {keyPointText && (
        <div className={`flex items-start gap-3 px-4 py-4 rounded-xl border ${
          adaptedStep?.keyPoint
            ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20'
            : 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/20'
        }`}>
          <HiOutlineCheckCircle className={`w-5 h-5 mt-0.5 shrink-0 ${
            adaptedStep?.keyPoint ? 'text-amber-400' : 'text-blue-400'
          }`} />
          <div>
            <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
              adaptedStep?.keyPoint ? 'text-amber-400' : 'text-blue-400'
            }`}>Point clé</p>
            <p className="text-sm text-white/75 leading-relaxed">{keyPointText}</p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Écran de fin ─── */
function CompletionScreen({ onRestart, onExit }) {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="glass-strong rounded-3xl p-12 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20
          border border-emerald-500/25 flex items-center justify-center mx-auto mb-6">
          <HiOutlineCheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Séance terminée !</h2>
        <p className="text-white/40 text-sm leading-relaxed mb-2">
          Tu as parcouru les 4 étapes sur les tableaux en algorithmique.
        </p>
        <p className="text-white/30 text-xs mb-8">
          Tu sais maintenant déclarer, parcourir et calculer avec des tableaux.
        </p>
        <div className="flex flex-col gap-2.5">
          <button
            onClick={onRestart}
            className="py-3 rounded-xl text-sm font-semibold glass
              hover:bg-white/10 text-white/60 hover:text-white transition-all"
          >
            Recommencer la séance
          </button>
          <button
            onClick={onExit}
            className="py-3 rounded-xl text-sm font-semibold
              bg-gradient-to-r from-blue-600 to-indigo-600 text-white
              hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.01]
              shadow-lg shadow-blue-500/25 transition-all"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Page principale ─── */
export default function LearningPage() {
  const { profile } = useAuth()
  const navigate    = useNavigate()
  const lesson      = getLessonByProfile(profile?.id)

  const [currentStep, setCurrentStep]   = useState(0)
  const [completed, setCompleted]       = useState(false)
  const [showEditor, setShowEditor]     = useState(false)
  const [showChat, setShowChat]         = useState(false)
  const [practicedSteps, setPracticedSteps] = useState(new Set())
  const [showPracticeAlert, setShowPracticeAlert] = useState(false)
  const [adaptation, setAdaptation]     = useState(null) // { errorId, adaptedContent, errorTitle }
  const [showAdaptBanner, setShowAdaptBanner] = useState(false)

  const step       = lesson.steps[currentStep]
  const isFirst    = currentStep === 0
  const isLast     = currentStep === lesson.steps.length - 1
  const canAdvance = !step.exercise || practicedSteps.has(currentStep)

  const markPracticed = () => {
    setPracticedSteps((prev) => new Set([...prev, currentStep]))
    setShowPracticeAlert(false)
  }

  const handleErrorAdaptation = (info) => {
    // Ne déclenche qu'une seule fois (première erreur)
    if (!adaptation) {
      setAdaptation(info)
      setShowAdaptBanner(true)
    }
  }

  const goNext = () => {
    if (!canAdvance) {
      setShowPracticeAlert(true)
      setTimeout(() => setShowPracticeAlert(false), 3000)
      return
    }
    if (isLast) { setCompleted(true); return }
    setCurrentStep((s) => s + 1)
    setShowEditor(false)
    setShowPracticeAlert(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goPrev = () => {
    setCurrentStep((s) => s - 1)
    setShowEditor(false)
    setShowPracticeAlert(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* ── Écran de fin ── */
  if (completed) {
    return (
      <div className="min-h-screen bg-app bg-mesh flex flex-col">
        <CompletionScreen
          onRestart={() => { setCurrentStep(0); setCompleted(false); setPracticedSteps(new Set()); setAdaptation(null); setShowAdaptBanner(false) }}
          onExit={() => navigate('/dashboard')}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-app bg-mesh flex">

      {/* ════════════════════════════════════
          SIDEBAR GAUCHE
      ════════════════════════════════════ */}
      <aside className="hidden lg:flex w-64 xl:w-72 shrink-0 flex-col
        border-r border-white/6 bg-panel sticky top-0 h-screen overflow-hidden">

        {/* ── Branding Bella ── */}
        <div className="px-5 pt-6 pb-5 border-b border-white/6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500/25 to-indigo-600/25
              border border-blue-500/30 flex items-center justify-center shrink-0">
              <HiOutlineLightningBolt className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-tight">AdaptativeCBot</p>
              <p className="text-[10px] text-white/30 leading-tight">Assistante pédagogique</p>
            </div>
          </div>

          {/* Leçon courante */}
          <div className="mt-4 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/6">
            <p className="text-[10px] font-semibold text-white/25 uppercase tracking-wider mb-0.5">Leçon</p>
            <p className="text-xs font-semibold text-white/65 leading-snug">{lesson.subject}</p>
            <p className="text-[10px] text-blue-400/60 mt-1">{profile?.name}</p>
          </div>
        </div>

        {/* ── Navigation étapes ── */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <p className="text-[10px] font-semibold text-white/20 uppercase tracking-widest px-2 mb-3">
            Progression
          </p>

          <div className="space-y-1">
            {lesson.steps.map((s, i) => {
              const isActive = i === currentStep
              const isDone   = i < currentStep

              return (
                <button
                  key={i}
                  onClick={() => { setCurrentStep(i); setShowEditor(false) }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left
                    transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500/12 border border-blue-500/20'
                      : 'hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  {/* Indicateur de statut */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center
                    shrink-0 text-[10px] font-bold transition-all ${
                    isActive ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : isDone ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                             : 'bg-white/8 text-white/25 border border-white/10'
                  }`}>
                    {isDone ? '✓' : i + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-medium truncate leading-tight ${
                      isActive ? 'text-blue-300' : isDone ? 'text-white/50' : 'text-white/30'
                    }`}>
                      {s.title}
                    </p>
                    <p className="text-[10px] text-white/20 truncate mt-0.5">{s.badge}</p>
                  </div>

                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Barre de progression globale */}
          <div className="mt-6 px-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-white/20 font-semibold uppercase tracking-wider">Avancement</p>
              <p className="text-[10px] text-white/30">
                {currentStep + 1}/{lesson.steps.length}
              </p>
            </div>
            <div className="h-1 rounded-full bg-white/8 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500
                  transition-all duration-500"
                style={{ width: `${((currentStep + 1) / lesson.steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Boutons d'action ── */}
        <div className="px-4 pb-6 pt-4 border-t border-white/6 space-y-2.5">

          {/* Pratiquer — visible uniquement si l'étape a un exercice */}
          {step.exercise ? (
            <button
              onClick={() => { setShowEditor((v) => !v); setShowChat(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
                transition-all duration-200 ${
                showEditor
                  ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.01] shadow-lg shadow-blue-500/20'
              }`}
            >
              <HiOutlineCode className="w-4 h-4 shrink-0" />
              <span>{showEditor ? 'Fermer l\'éditeur' : 'Pratiquer'}</span>
            </button>
          ) : (
            <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
              bg-white/[0.03] border border-white/6 text-white/20 cursor-not-allowed">
              <HiOutlineCode className="w-4 h-4 shrink-0" />
              <span>Pas d'exercice ici</span>
            </div>
          )}

          {/* Demander à Bella */}
          <button
            onClick={() => { setShowChat((v) => !v); setShowEditor(false) }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
              transition-all duration-200 ${
              showChat
                ? 'bg-violet-500/20 border border-violet-500/40 text-violet-300'
                : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 hover:scale-[1.01] shadow-lg shadow-violet-500/20'
            }`}
          >
            <HiOutlineChatAlt2 className="w-4 h-4 shrink-0" />
            <span>{showChat ? 'Fermer le chat' : 'AdaptativeCBot'}</span>
          </button>
        </div>
      </aside>

      {/* ════════════════════════════════════
          ZONE PRINCIPALE
      ════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">

        {/* ── Top nav ── */}
        <nav className="flex items-center justify-between px-4 sm:px-6 py-3.5
          border-b border-white/6 glass shrink-0 sticky top-0 z-20">

          {/* Retour */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg glass
              hover:bg-white/10 text-white/40 hover:text-white/70 transition-all text-sm"
          >
            <HiArrowLeft className="w-4 h-4" />
            <span className="hidden sm:block text-xs">Tableau de bord</span>
          </button>

          {/* Stepper dots */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              {lesson.steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i < currentStep    ? 'bg-blue-500 w-5'
                    : i === currentStep ? 'bg-blue-400 w-7'
                    : 'bg-white/10 w-3.5'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-white/25 ml-1">
              {currentStep + 1}/{lesson.steps.length}
            </span>
          </div>

          {/* Actions mobiles + toggle */}
          <div className="flex items-center gap-2">
            {step.exercise && (
              <button
                onClick={() => { setShowEditor((v) => !v); setShowChat(false) }}
                className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
                  showEditor ? 'bg-blue-500/25 text-blue-400' : 'glass text-white/40 hover:text-white/70'
                }`}
              >
                <HiOutlineCode className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => { setShowChat((v) => !v); setShowEditor(false) }}
              className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
                showChat ? 'bg-violet-500/25 text-violet-400' : 'glass text-white/40 hover:text-white/70'
              }`}
            >
              <HiOutlineChatAlt2 className="w-4 h-4" />
            </button>
            <ThemeToggle />
          </div>

          {/* Spacer desktop supprimé — toggle visible sur tous écrans */}
        </nav>

        {/* ── Contenu leçon ── */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-10 py-10">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Banner d'adaptation — affiché dès la première erreur */}
            {showAdaptBanner && adaptation && (
              <AdaptationBanner
                adaptation={adaptation}
                profileLabel={lesson.profile}
                onDismiss={() => setShowAdaptBanner(false)}
              />
            )}
            <StepContent
              step={step}
              profileId={profile?.id}
              adaptedStep={
                adaptation?.adaptedSteps?.[step.id] ??
                (adaptation?.adaptedContent?.[step.id]
                  ? { intro: adaptation.adaptedContent[step.id] }
                  : null)
              }
            />
          </div>
        </div>

        {/* ── Navigation bas ── */}
        <div className="shrink-0 px-4 sm:px-10 py-4 border-t border-white/6 glass">
          <div className="max-w-2xl mx-auto space-y-2">
            {/* Alerte pratique */}
            {showPracticeAlert && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                bg-amber-500/10 border border-amber-500/25 animate-pulse-once">
                <HiOutlineLockClosed className="w-4 h-4 text-amber-400 shrink-0" />
                <p className="text-xs text-amber-300 leading-snug">
                  Pratique au moins un exercice avant de continuer.
                  Clique sur <span className="font-semibold">Pratiquer</span> pour ouvrir l'éditeur.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <button
                onClick={goPrev}
                disabled={isFirst}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                  glass hover:bg-white/10 text-white/50 hover:text-white/80
                  transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <HiArrowLeft className="w-4 h-4" />
                Précédent
              </button>

              {/* Centre : badge ou message de blocage */}
              {!canAdvance && step.exercise ? (
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-amber-400/60">
                  <HiOutlineLockClosed className="w-3.5 h-3.5" />
                  <span>Pratique d'abord</span>
                </div>
              ) : (
                <span className="text-xs text-white/20 hidden sm:block">{step.badge}</span>
              )}

              <button
                onClick={goNext}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                  transition-all ${
                  canAdvance
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.01] shadow-lg shadow-blue-500/20'
                    : 'bg-white/8 border border-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                {!canAdvance && <HiOutlineLockClosed className="w-4 h-4" />}
                {isLast ? 'Terminer' : 'Suivant'}
                {canAdvance && <HiArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          PANNEAU FLOTTANT — ÉDITEUR (bottom sheet)
      ════════════════════════════════════ */}
      {showEditor && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={() => setShowEditor(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

          {/* Sheet */}
          <div
            className="relative w-full max-w-3xl bg-panel
              border border-blue-500/20 border-b-0
              rounded-t-3xl shadow-2xl shadow-blue-500/10
              animate-slide-up overflow-hidden"
            style={{ maxHeight: '88vh', display: 'flex', flexDirection: 'column' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-white/15" />
            </div>

            {/* Header éditeur */}
            <div className="flex items-center justify-between px-6 py-3.5
              border-b border-white/6 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/25
                  flex items-center justify-center">
                  <HiOutlineCode className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Éditeur de pratique</p>
                  <p className="text-xs text-white/30">{step.title}</p>
                </div>
              </div>
              <button
                onClick={() => setShowEditor(false)}
                className="w-8 h-8 flex items-center justify-center rounded-xl glass
                  text-white/35 hover:text-white/70 hover:bg-white/10 transition-all"
                aria-label="Fermer l'éditeur"
              >
                <HiOutlineX className="w-4 h-4" />
              </button>
            </div>

            {/* Contenu éditeur */}
            <div className="flex-1 overflow-y-auto p-5">
              {step.exercise
                ? <PracticeEditor exercise={step.exercise} onFirstPass={markPracticed} onErrorAdaptation={handleErrorAdaptation} />
                : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-white/25 text-sm">Pas d'exercice pour cette étape.</p>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════
          PANNEAU FLOTTANT — CHATBOT
          Mobile  : bottom sheet plein largeur
          Desktop : bulle coin bas-droit
      ════════════════════════════════════ */}
      {showChat && (
        <>
          {/* Backdrop mobile uniquement */}
          <div
            className="fixed inset-0 z-40 sm:hidden bg-black/50 backdrop-blur-sm"
            onClick={() => setShowChat(false)}
          />

          <div
            className="fixed z-50 animate-float-in
              bottom-0 left-0 right-0 w-full
              h-[78vh] max-h-[calc(100vh-60px)]
              sm:bottom-4 sm:right-4 sm:left-auto sm:w-[460px] sm:h-[86vh] sm:max-h-none
              lg:top-4 lg:bottom-4 lg:right-4 lg:left-auto lg:w-[500px] lg:h-auto"
          >
            {/* Lueur décorative — desktop seulement */}
            <div className="absolute -inset-3 rounded-[2rem] bg-violet-500/8 blur-2xl
              pointer-events-none hidden sm:block" />

            {/* Panneau chat */}
            <div className="relative h-full bg-panel border border-violet-500/20
              rounded-t-3xl sm:rounded-3xl
              shadow-2xl shadow-violet-900/40 overflow-hidden flex flex-col">
              <ChatPanel onClose={() => setShowChat(false)} />
            </div>
          </div>
        </>
      )}

    </div>
  )
}
