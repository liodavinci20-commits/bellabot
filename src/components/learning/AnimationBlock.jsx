export default function AnimationBlock({ label, Component }) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/8 bg-[#0d1525]">
      <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/6 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-violet-500" />
        <span className="text-xs text-white/50 font-medium">{label}</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded text-violet-400 bg-white/5">Animation</span>
      </div>
      <Component />
    </div>
  )
}
