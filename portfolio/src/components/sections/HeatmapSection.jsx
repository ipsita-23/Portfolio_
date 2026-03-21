import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CONFIG } from '../../config/CONFIG'
import {
  computeHeatmapStats,
  isPlaceholderHandle,
  normalizeContributions,
} from '../../lib/streaks'
import { Reveal } from '../common/Reveal'

// Vibrant Pink/Purple scale
const COLORS = [
  'rgba(255,255,255,0.03)', 
  'rgba(168,85,247,0.4)',  // Purple
  'rgba(217,70,239,0.7)',  // Fuchsia
  'rgba(236,72,153,1)'     // Pink
]

function heatColor(level) {
  const l = Math.max(0, Math.min(4, Number(level || 0)))
  if (l <= 0) return COLORS[0]
  if (l === 1) return COLORS[1]
  if (l === 2) return COLORS[2]
  return COLORS[3]
}

function toUTCKey(dateStr) {
  const [y, m, d] = String(dateStr).split('-').map((x) => Number(x))
  return Date.UTC(y, m - 1, d)
}

function utcToDayIndexMondayStart(utcMs) {
  const dow = new Date(utcMs).getUTCDay()
  return (dow + 6) % 7
}

export function HeatmapSection({ onGithubCommits }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({ totalCommits: 0, currentStreak: 0, longestStreak: 0 })
  const [cells, setCells] = useState([])

  useEffect(() => {
    let mounted = true
    const run = async () => {
      try {
        setLoading(true)
        setError(null)

        const [ghRes, lcRes, cfRes] = await Promise.allSettled([
          fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(CONFIG.github)}`).then(r => r.json()),
          fetch(`https://alfa-leetcode-api.onrender.com/${encodeURIComponent(CONFIG.leetcode.username)}/calendar`).then(r => r.json()),
          fetch(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(CONFIG.codeforces.handle)}`).then(r => r.json())
        ])

        const dailyCounts = new Map()

        // 1. GitHub
        if (ghRes.status === 'fulfilled' && ghRes.value?.contributions) {
          ghRes.value.contributions.forEach(c => {
            if (c.date && c.count > 0) {
              dailyCounts.set(c.date, (dailyCounts.get(c.date) || 0) + c.count)
            }
          })
        }

        // 2. LeetCode
        if (lcRes.status === 'fulfilled' && lcRes.value?.submissionCalendar) {
          const cal = typeof lcRes.value.submissionCalendar === 'string'
            ? JSON.parse(lcRes.value.submissionCalendar)
            : lcRes.value.submissionCalendar
          
          for (const [timestampStr, count] of Object.entries(cal)) {
            const d = new Date(Number(timestampStr) * 1000)
            const y = d.getUTCFullYear()
            const m = String(d.getUTCMonth() + 1).padStart(2, '0')
            const day = String(d.getUTCDate()).padStart(2, '0')
            const dateStr = `${y}-${m}-${day}`
            dailyCounts.set(dateStr, (dailyCounts.get(dateStr) || 0) + count)
          }
        }

        // 3. Codeforces
        if (cfRes.status === 'fulfilled' && cfRes.value?.status === 'OK' && Array.isArray(cfRes.value.result)) {
           cfRes.value.result.forEach(sub => {
             if (sub.creationTimeSeconds) {
               const d = new Date(sub.creationTimeSeconds * 1000)
               const y = d.getUTCFullYear()
               const m = String(d.getUTCMonth() + 1).padStart(2, '0')
               const day = String(d.getUTCDate()).padStart(2, '0')
               const dateStr = `${y}-${m}-${day}`
               dailyCounts.set(dateStr, (dailyCounts.get(dateStr) || 0) + 1)
             }
           })
        }

        // Generate the last 371 days (53 weeks * 7 days)
        const normalized = []
        const nowUtc = Date.now()
        for (let i = 370; i >= 0; i--) {
           const d = new Date(nowUtc - i * 86400000)
           const y = d.getUTCFullYear()
           const m = String(d.getUTCMonth() + 1).padStart(2, '0')
           const day = String(d.getUTCDate()).padStart(2, '0')
           const dateStr = `${y}-${m}-${day}`
           
           const count = dailyCounts.get(dateStr) || 0
           let level = 0
           if (count > 0) level = 1
           if (count >= 3) level = 2
           if (count >= 6) level = 3
           if (count >= 10) level = 4
           
           normalized.push({ date: dateStr, count, level })
        }

        const newCells = normalized.map((c) => ({
          date: c.date,
          utc: toUTCKey(c.date),
          count: c.count,
          level: c.level,
        }))

        const newStats = computeHeatmapStats(normalized)

        if (!mounted) return
        setCells(newCells)
        setStats(newStats)
        setLoading(false)
        onGithubCommits?.(newStats.totalCommits)
      } catch (e) {
        if (!mounted) return
        setLoading(false)
        setError(e?.message || 'Heatmap error')
      }
    }

    run()
    return () => { mounted = false }
  }, [onGithubCommits])

  const heatmapSvg = useMemo(() => {
    const cell = 12
    const gap = 3
    const cols = 53
    const dayMs = 24 * 60 * 60 * 1000
    const endUtc = cells.length > 0 ? Math.max(...cells.map((c) => c.utc)) : Date.now()

    const endDayIndex = utcToDayIndexMondayStart(endUtc)
    const alignedEndUtc = endUtc + (6 - endDayIndex) * dayMs
    const gridStartUtc = alignedEndUtc - (cols * 7 - 1) * dayMs

    const byUtc = new Map(cells.map((c) => [c.utc, c]))

    const width = cols * (cell + gap)
    const height = 7 * (cell + gap)

    const rects = []
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < 7; row++) {
        const actualUtc = gridStartUtc + col * 7 * dayMs + row * dayMs
        const cellData = byUtc.get(actualUtc)

        const key = actualUtc
        const x = col * (cell + gap)
        const y = row * (cell + gap)
        const level = cellData?.level ?? 0
        const fill = heatColor(level)

        rects.push(
          <rect
            key={key}
            x={x}
            y={y}
            width={cell}
            height={cell}
            rx={3}
            fill={fill}
            className="transition-colors duration-300 hover:opacity-80"
          />
        )
      }
    }

    return { width, height, rects }
  }, [cells])

  return (
    <section id="commits" className="bg-[#06060e] relative py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-[1200px] px-5 relative z-10">
        <Reveal className="space-y-4 text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white text-sm font-jetbrains uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 animate-pulse" />
            Cross-Platform
          </div>
          <h2 className="text-[clamp(44px,8vw,96px)] font-bebas font-bold leading-[0.9] tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500">
            COMMITS DON'T LIE
          </h2>
          <p className="text-[#a0a8c0] text-lg font-jetbrains mt-4">
            A real-time snapshot of my open-source and private engineering activity over the last year.
          </p>
        </Reveal>

        <Reveal className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Inner Light Flare */}
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent opacity-50" />
          
          {loading ? (
            <div className="space-y-6">
              <div className="h-[160px] w-full rounded-2xl bg-white/[0.02] shimmer-heatmap" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-[80px] rounded-2xl bg-white/[0.02] shimmer-box" />
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="text-[#8a94b5] font-jetbrains text-center py-10 border border-white/5 rounded-2xl bg-white/[0.02]">
              Heatmap unavailable right now.
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-pink-500/20 scrollbar-track-transparent">
                <div className="min-w-max mx-auto p-4 bg-[#0a0f1d]/50 rounded-2xl border border-white/[0.05] shadow-inner">
                  <svg
                    width={heatmapSvg.width}
                    height={heatmapSvg.height}
                    viewBox={`0 0 ${heatmapSvg.width} ${heatmapSvg.height}`}
                    className="drop-shadow-[0_0_8px_rgba(236,72,153,0.1)]"
                  >
                    {heatmapSvg.rects}
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Total Commits" value={stats.totalCommits} color="text-pink-400" gradient="from-pink-500/20 to-pink-500/0" border="hover:border-pink-500/40" />
                <StatCard label="Current Streak" value={stats.currentStreak} color="text-purple-400" gradient="from-purple-500/20 to-purple-500/0" border="hover:border-purple-500/40" />
                <StatCard label="Longest Streak" value={stats.longestStreak} color="text-indigo-400" gradient="from-indigo-500/20 to-indigo-500/0" border="hover:border-indigo-500/40" />
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}

function StatCard({ label, value, color, gradient, border }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`relative group bg-white/[0.03] border border-white/10 p-6 rounded-2xl overflow-hidden transition-all duration-300 ${border} hover:shadow-xl`}
    >
      <div className={`absolute -inset-px bg-gradient-to-b ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="relative z-10">
        <div className="font-jetbrains text-[#8a94b5] text-xs uppercase tracking-wider mb-2">
          {label}
        </div>
        <div className={`font-bebas font-bold text-[48px] leading-none ${color}`}>
          {value}
        </div>
      </div>
    </motion.div>
  )
}

