import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CONFIG } from '../../config/CONFIG'
import { isPlaceholderHandle } from '../../lib/streaks'
import { Reveal } from '../common/Reveal'

function ArcRing({ label, value, total, color = '#38bdf8' }) {
  const size = 72
  const r = 26
  const c = 2 * Math.PI * r
  const progress = total > 0 ? Math.max(0, Math.min(1, value / total)) : 0
  const dashOffset = c * (1 - progress)

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
        <motion.circle
          cx="36"
          cy="36"
          r={r}
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          style={{ rotate: '-90deg', transformOrigin: '36px 36px' }}
        />
      </svg>
      <div className="text-center">
        <div className="font-jetbrains text-white font-bold text-[16px] leading-none mb-1">
          {value}
        </div>
        <div className="font-jetbrains text-[#8a94b5] text-[10px] uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  )
}

function SkeletonRow({ height = 18 }) {
  return (
    <div className="h-[14px] bg-white/[0.04] rounded-md overflow-hidden relative">
      <div className="skeleton-shimmer absolute inset-0" style={{ height }} />
    </div>
  )
}

export function PlatformsSection({ onLeetCodeSolved }) {
  const [leetcodeLoading, setLeetcodeLoading] = useState(false)
  const [leetcode, setLeetCode] = useState({ easy: 0, medium: 0, hard: 0 })

  const [cfLoading, setCfLoading] = useState(false)
  const [cf, setCf] = useState({ rating: 0, rank: '-', maxRating: 0 })

  const cc = { rating: 1474, stars: '2★', solved: 304, globalRank: 858 }

  useEffect(() => {
    let mounted = true
    const run = async () => {
      try {
        if (isPlaceholderHandle(CONFIG.leetcode.username)) {
          setLeetCode({ easy: 0, medium: 0, hard: 0 })
          onLeetCodeSolved?.(0)
          return
        }
        setLeetcodeLoading(true)
        const res = await fetch(`https://alfa-leetcode-api.onrender.com/${encodeURIComponent(CONFIG.leetcode.username)}/solved`)
        if (!res.ok) throw new Error(`LeetCode fetch failed: ${res.status}`)
        const json = await res.json()
        const easy = Number(json.easySolved || 0)
        const medium = Number(json.mediumSolved || 0)
        const hard = Number(json.hardSolved || 0)
        const total = easy + medium + hard
        if (!mounted) return
        setLeetCode({ easy, medium, hard })
        onLeetCodeSolved?.(total)
      } catch {
        if (!mounted) return
        setLeetCode({ easy: 0, medium: 0, hard: 0 })
        onLeetCodeSolved?.(0)
      } finally {
        if (!mounted) return
        setLeetcodeLoading(false)
      }
    }
    run()
    return () => { mounted = false }
  }, [onLeetCodeSolved])

  useEffect(() => {
    let mounted = true
    const run = async () => {
      try {
        if (isPlaceholderHandle(CONFIG.codeforces.handle)) {
          setCf({ rating: 0, rank: '-', maxRating: 0 })
          return
        }
        setCfLoading(true)
        const res = await fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(CONFIG.codeforces.handle)}`)
        if (!res.ok) throw new Error(`Codeforces fetch failed: ${res.status}`)
        const json = await res.json()
        const item = json?.result?.[0]
        const rating = Number(item?.rating || 0)
        const maxRating = Number(item?.maxRating || 0)
        const rank = item?.rank || '-'
        if (!mounted) return
        setCf({ rating, rank, maxRating })
      } catch {
        if (!mounted) return
        setCf({ rating: 0, rank: '-', maxRating: 0 })
      } finally {
        if (!mounted) return
        setCfLoading(false)
      }
    }
    run()
    return () => { mounted = false }
  }, [])

  const leetTotal = leetcode.easy + leetcode.medium + leetcode.hard

  const cards = useMemo(
    () => [
      {
        key: 'leetcode',
        title: 'LeetCode',
        gradient: 'from-orange-400 to-amber-500',
        shadow: 'hover:shadow-[0_10px_40px_-10px_rgba(251,146,60,0.2)]',
        border: 'hover:border-orange-500/40',
        content: (
          <div className="space-y-6">
            <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-5">
              {leetcodeLoading ? (
                <div className="space-y-4">
                  <SkeletonRow />
                  <div className="flex gap-6 items-center justify-center pt-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="w-[72px] h-[72px] rounded-full bg-white/[0.02] shimmer-box" />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 sm:gap-6 items-start justify-between">
                  <ArcRing label="Easy" value={leetcode.easy} total={leetTotal} color="#34d399" />
                  <ArcRing label="Medium" value={leetcode.medium} total={leetTotal} color="#fbbf24" />
                  <ArcRing label="Hard" value={leetcode.hard} total={leetTotal} color="#f87171" />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between font-jetbrains text-sm">
              <span className="text-[#8a94b5] uppercase tracking-wider">Total Solved</span>
              <span className="text-white font-bold px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg">{leetTotal}</span>
            </div>
          </div>
        ),
      },
      {
        key: 'codeforces',
        title: 'Codeforces',
        gradient: 'from-blue-400 to-indigo-500',
        shadow: 'hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.2)]',
        border: 'hover:border-blue-500/40',
        content: (
          <div className="space-y-6">
            <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6">
              {cfLoading ? (
                <div className="space-y-4">
                  <SkeletonRow height={24} />
                  <SkeletonRow height={24} />
                  <SkeletonRow height={24} />
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="text-[#8a94b5] font-jetbrains uppercase tracking-wider text-xs">
                      CURRENT RATING
                    </div>
                    <div className="text-white font-bebas tracking-wide text-[38px] leading-none">
                      {cf.rating}
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <div className="text-[#8a94b5] font-jetbrains uppercase tracking-wider text-xs">
                      RANK
                    </div>
                    <div className="text-blue-400 font-jetbrains font-bold text-[16px] capitalize px-3 py-1 bg-blue-500/10 rounded-lg">
                      {cf.rank}
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <div className="text-[#8a94b5] font-jetbrains uppercase tracking-wider text-xs">
                      MAX RATING
                    </div>
                    <div className="text-white font-jetbrains font-bold text-[18px]">
                      {cf.maxRating}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ),
      },
      {
        key: 'codechef',
        title: 'CodeChef',
        gradient: 'from-emerald-400 to-teal-500',
        shadow: 'hover:shadow-[0_10px_40px_-10px_rgba(52,211,153,0.2)]',
        border: 'hover:border-emerald-500/40',
        content: (
          <div className="space-y-6">
            <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-[#8a94b5] font-jetbrains uppercase tracking-wider text-xs">
                    CURRENT RATING
                  </div>
                  <div className="text-white font-bebas tracking-wide text-[38px] leading-none">
                    {cc.rating}
                  </div>
                </div>
                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                  <div className="text-[#8a94b5] font-jetbrains uppercase tracking-wider text-xs">
                    STARS
                  </div>
                  <div className="text-emerald-400 font-jetbrains font-bold text-[16px] px-3 py-1 bg-emerald-500/10 rounded-lg">
                    {cc.stars}
                  </div>
                </div>
                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                  <div className="text-[#8a94b5] font-jetbrains uppercase tracking-wider text-xs">
                    SOLVED
                  </div>
                  <div className="text-white font-jetbrains font-bold text-[18px]">
                    {cc.solved}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
    [cf, cfLoading, leetcode, leetcodeLoading, leetTotal, cc]
  )

  return (
    <section id="platforms" className="bg-[#06060e] relative py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-[1200px] px-5 relative z-10">
        <Reveal className="space-y-4 text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white text-sm font-jetbrains uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
            Metrics
          </div>
          <h2 className="text-[clamp(44px,8vw,96px)] font-bebas font-bold leading-[0.9] tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            THE ARENA
          </h2>
          <p className="text-[#a0a8c0] text-lg font-jetbrains mt-4">
            Real-time performance statistics tracking algorithmic problem solving globally.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((c) => (
            <motion.div
              key={c.key}
              whileHover={{ y: -8 }}
              className={`group p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl transition-all duration-500 shadow-2xl relative overflow-hidden ${c.shadow} ${c.border}`}
            >
              {/* Flare */}
              <div className={`absolute -inset-px bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none`} />
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className={`w-3 h-8 rounded-full bg-gradient-to-b ${c.gradient}`} />
                <div className="font-bebas text-white text-[38px] leading-none mt-1">
                  {c.title}
                </div>
              </div>
              
              <div className="relative z-10">
                {c.content}
              </div>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

