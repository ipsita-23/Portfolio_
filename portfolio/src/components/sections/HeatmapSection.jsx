import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CONFIG } from '../../config/CONFIG'
import { computeHeatmapStats } from '../../lib/streaks'
import codolioData from '../../data/codolio.json'

const appleFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif"
const appleFontDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif"

const COLORS = [
  'rgba(255,255,255,0.03)',
  'rgba(255,255,255,0.12)',
  'rgba(255,255,255,0.25)',
  'rgba(255,255,255,0.45)',
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

        const [ghRes] = await Promise.allSettled([
          fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(CONFIG.github)}`).then(r => r.json())
        ])

        const dailyCounts = new Map()

        if (ghRes.status === 'fulfilled' && ghRes.value?.contributions) {
          ghRes.value.contributions.forEach(c => {
            if (c.date && c.count > 0) {
              dailyCounts.set(c.date, (dailyCounts.get(c.date) || 0) + c.count)
            }
          })
        }

        const profiles = codolioData?.data?.platformProfiles?.platformProfiles || []
        profiles.forEach(p => {
          const cal = p.dailyActivityStatsResponse?.submissionCalendar
          if (cal) {
            for (const [timestampStr, count] of Object.entries(cal)) {
              if (count > 0) {
                const d = new Date(Number(timestampStr) * 1000)
                const y = d.getUTCFullYear()
                const m = String(d.getUTCMonth() + 1).padStart(2, '0')
                const day = String(d.getUTCDate()).padStart(2, '0')
                const dateStr = `${y}-${m}-${day}`
                dailyCounts.set(dateStr, (dailyCounts.get(dateStr) || 0) + count)
              }
            }
          }
        })

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
            className="transition-colors duration-300 hover:opacity-70"
          />
        )
      }
    }

    return { width, height, rects }
  }, [cells])

  return (
    <section id="commits" className="bg-[#1a1a2e] relative min-h-screen flex flex-col justify-center overflow-hidden snap-start">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36 relative z-10">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-6"
          style={{ fontFamily: appleFont }}
        >
          Activity
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-[48px] md:text-[72px] lg:text-[88px] font-bold leading-[1] tracking-[-0.04em] text-white mb-6"
          style={{ fontFamily: appleFontDisplay }}
        >
          Commits don't lie.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[17px] leading-[1.6] text-white/40 max-w-xl mb-16"
          style={{ fontFamily: appleFont }}
        >
          A real-time snapshot of engineering activity across all platforms over the last year.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap gap-x-16 gap-y-6 mb-12"
        >
          <div>
            <div className="text-[44px] font-bold tracking-[-0.03em] leading-none text-white/80 mb-1"
              style={{ fontFamily: appleFontDisplay }}
            >{stats.totalCommits}</div>
            <div className="text-[12px] font-medium uppercase tracking-[0.15em] text-white/25"
              style={{ fontFamily: appleFont }}
            >Total Commits</div>
          </div>
          <div>
            <div className="text-[44px] font-bold tracking-[-0.03em] leading-none text-white/80 mb-1"
              style={{ fontFamily: appleFontDisplay }}
            >{stats.currentStreak}</div>
            <div className="text-[12px] font-medium uppercase tracking-[0.15em] text-white/25"
              style={{ fontFamily: appleFont }}
            >Current Streak</div>
          </div>
          <div>
            <div className="text-[44px] font-bold tracking-[-0.03em] leading-none text-white/80 mb-1"
              style={{ fontFamily: appleFontDisplay }}
            >{stats.longestStreak}</div>
            <div className="text-[12px] font-medium uppercase tracking-[0.15em] text-white/25"
              style={{ fontFamily: appleFont }}
            >Longest Streak</div>
          </div>
        </motion.div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {loading ? (
            <div className="h-[140px] w-full rounded-xl bg-white/[0.02] animate-pulse" />
          ) : error ? (
            <div className="text-white/30 text-center py-10 text-[15px]" style={{ fontFamily: appleFont }}>
              Heatmap unavailable right now.
            </div>
          ) : (
            <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="min-w-max mx-auto">
                <svg
                  width={heatmapSvg.width}
                  height={heatmapSvg.height}
                  viewBox={`0 0 ${heatmapSvg.width} ${heatmapSvg.height}`}
                >
                  {heatmapSvg.rects}
                </svg>
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  )
}
