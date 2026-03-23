import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts'

const appleFont = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif"
const appleFontDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif"

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-lg"
        style={{
          background: 'rgba(30,30,50,0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}
      >
        <p className="text-white/90 text-[13px] font-semibold" style={{ fontFamily: appleFont }}>
          {payload[0].value}
        </p>
        <p className="text-white/30 text-[10px] mt-0.5" style={{ fontFamily: appleFont }}>
          {payload[0].payload.name}
        </p>
      </div>
    )
  }
  return null
}

function RatingCard({ title, subLabel, rating, history, delay = 0, color = 'rgba(255,255,255,0.9)', glowColor = 'rgba(255,255,255,0.06)' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="rounded-2xl overflow-hidden group cursor-default"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${glowColor}`,
        boxShadow: `0 0 25px ${glowColor}`,
      }}
    >
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="text-[22px] font-bold tracking-[-0.02em] text-white/90"
              style={{ fontFamily: appleFontDisplay }}
            >
              {title}
            </h3>
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/25 mt-1"
              style={{ fontFamily: appleFont }}
            >
              {subLabel}
            </p>
          </div>
          <div className="text-right">
            <div className="text-[36px] font-bold tracking-[-0.03em] leading-none text-white/80"
              style={{ fontFamily: appleFontDisplay }}
            >
              {rating}
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="w-full h-[240px] lg:h-[280px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history} margin={{ top: 16, right: 4, left: 4, bottom: 0 }}>
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="rating"
                stroke={color}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: color, stroke: glowColor, strokeWidth: 10 }}
                animationDuration={2000}
                style={{ filter: `drop-shadow(0 0 8px ${color})` }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  )
}

import codolioData from '../../data/codolio.json'

export function PlatformsSection() {
  const profiles = codolioData.data.platformProfiles.platformProfiles || []

  // LeetCode
  const lcProfile = profiles.find(p => p.platform === 'leetcode')
  const lcHistory = useMemo(() => {
    if (!lcProfile?.contestActivityStats?.contestActivityList) return []
    return lcProfile.contestActivityStats.contestActivityList.map(c => ({
      name: c.contestName,
      rating: c.rating
    }))
  }, [lcProfile])
  const lcCurrent = lcProfile?.userStats?.currentRating || 0

  // Codeforces
  const cfProfile = profiles.find(p => p.platform === 'codeforces')
  const cfHistory = useMemo(() => {
    if (!cfProfile?.contestActivityStats?.contestActivityList) return []
    return cfProfile.contestActivityStats.contestActivityList.map(c => ({
      name: c.contestName,
      rating: c.rating
    }))
  }, [cfProfile])
  const cfCurrent = cfProfile?.userStats?.currentRating || 0
  const cfRank = cfProfile?.userStats?.rank || '-'

  // CodeChef
  const ccProfile = profiles.find(p => p.platform === 'codechef')
  const ccHistory = useMemo(() => {
    if (!ccProfile?.contestActivityStats?.contestActivityList) return []
    return ccProfile.contestActivityStats.contestActivityList.map(c => ({
      name: c.contestName,
      rating: c.rating
    }))
  }, [ccProfile])
  const ccCurrent = ccProfile?.userStats?.currentRating || 0
  const ccStars = ccProfile?.userStats?.stars ? `${ccProfile.userStats.stars}★` : '-'

  // Aggregated Problem Stats
  const { totalSolved, easy, medium, hard, platformCounts, topTopics } = useMemo(() => {
    let t = 0, e = 0, m = 0, h = 0;
    const pc = [];
    const topicsMap = {};

    profiles.forEach(p => {
      const q = p.totalQuestionStats;
      if (q && q.totalQuestionCounts) {
        t += q.totalQuestionCounts;
        e += q.easyQuestionCounts || 0;
        m += q.mediumQuestionCounts || 0;
        h += q.hardQuestionCounts || 0;
        
        let pName = p.platform;
        if (pName === 'leetcode') pName = 'LeetCode';
        else if (pName === 'codeforces') pName = 'Codeforces';
        else if (pName === 'codechef') pName = 'CodeChef';
        else if (pName === 'geeksforgeeks') pName = 'GeeksforGeeks';
        else if (pName === 'interviewbit') pName = 'InterviewBit';
        else if (pName === 'hackerrank') pName = 'HackerRank';
        
        pc.push({ name: pName, count: q.totalQuestionCounts });
      }

      const dist1 = p.topicAnalysisStats?.topicWiseDistribution;
      const dist2 = p.dailyActivityStatsResponse?.topicWiseDistribution;
      
      if (dist1) {
        Object.entries(dist1).forEach(([k, v]) => {
          const title = k.charAt(0).toUpperCase() + k.slice(1);
          topicsMap[title] = (topicsMap[title] || 0) + v
        })
      }
      if (dist2) {
        Object.entries(dist2).forEach(([k, v]) => {
          const title = k.charAt(0).toUpperCase() + k.slice(1);
          topicsMap[title] = (topicsMap[title] || 0) + v
        })
      }
    })

    const top = Object.entries(topicsMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 24)
      .map(([name, count]) => ({ name, count }));

    return { totalSolved: t, easy: e, medium: m, hard: h, platformCounts: pc.sort((a,b) => b.count - a.count), topTopics: top };
  }, [profiles])

  return (
    <section id="cp" className="bg-transparent relative overflow-hidden min-h-screen flex flex-col snap-start">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-28 md:pt-16 md:pb-36 relative z-10">

        {/* Apple-style overline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-6"
          style={{ fontFamily: appleFont }}
        >
          Competitive Programming
        </motion.p>

        {/* Hero heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-[48px] md:text-[72px] lg:text-[88px] font-bold leading-[1] tracking-[-0.04em] text-white mb-6"
          style={{ fontFamily: appleFontDisplay }}
        >
          Ratings speak<br />
          <span className="text-white/25">louder than words.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[17px] leading-[1.6] text-white/40 max-w-xl mb-20"
          style={{ fontFamily: appleFont }}
        >
          Live contest rating graphs across all major competitive programming arenas.
        </motion.p>

        {/* Stats summary row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap gap-x-16 gap-y-6 mb-16 pb-16"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div>
            <div className="text-[52px] font-bold tracking-[-0.03em] leading-none text-white mb-2"
              style={{ fontFamily: appleFontDisplay, textShadow: '0 0 20px rgba(255,255,255,0.3)' }}
            >
              {totalSolved}
            </div>
            <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/40"
              style={{ fontFamily: appleFont }}
            >
              Problems Solved
            </div>
          </div>

          <div className="flex gap-x-12 gap-y-4 flex-wrap items-end">
            <div>
              <div className="text-[28px] font-bold tracking-[-0.02em] leading-none text-white/70 mb-2"
                style={{ fontFamily: appleFontDisplay, textShadow: '0 0 15px rgba(255,255,255,0.2)' }}
              >{easy}</div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30"
                style={{ fontFamily: appleFont }}
              >Easy</div>
            </div>
            <div>
              <div className="text-[28px] font-bold tracking-[-0.02em] leading-none text-white/70 mb-2"
                style={{ fontFamily: appleFontDisplay, textShadow: '0 0 15px rgba(255,255,255,0.2)' }}
              >{medium}</div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30"
                style={{ fontFamily: appleFont }}
              >Medium</div>
            </div>
            <div>
              <div className="text-[28px] font-bold tracking-[-0.02em] leading-none text-white/70 mb-2"
                style={{ fontFamily: appleFontDisplay, textShadow: '0 0 15px rgba(255,255,255,0.2)' }}
              >{hard}</div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30"
                style={{ fontFamily: appleFont }}
              >Hard</div>
            </div>
          </div>

          {/* Platform breakdown */}
          <div className="flex gap-x-8 gap-y-3 flex-wrap items-end">
            {platformCounts.map((p, i) => (
              <div key={i}>
                <div className="text-[18px] font-bold tracking-[-0.01em] leading-none text-white/45 mb-1"
                  style={{ fontFamily: appleFontDisplay }}
                >{p.count}</div>
                <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/20"
                  style={{ fontFamily: appleFont }}
                >{p.name}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rating graphs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <RatingCard title="LeetCode" subLabel="Contest Rating" rating={lcCurrent} history={lcHistory} delay={0.05} color="#FFA116" glowColor="rgba(255,161,22,0.2)" />
          <RatingCard title="Codeforces" subLabel={cfRank} rating={cfCurrent} history={cfHistory} delay={0.1} color="#3B82F6" glowColor="rgba(59,130,246,0.2)" />
          <RatingCard title="CodeChef" subLabel={ccStars} rating={ccCurrent} history={ccHistory} delay={0.15} color="#C0713B" glowColor="rgba(192,113,59,0.2)" />
        </div>

        {/* Topic tags */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-16"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/25 mb-8"
            style={{ fontFamily: appleFont }}
          >
            Top Topics
          </p>
          <div className="flex flex-wrap gap-2.5">
            {topTopics.map((t, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.04 }}
                whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(255,255,255,0.25)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold text-white/60 hover:text-white/90 transition-all duration-300 cursor-default"
                style={{
                  fontFamily: appleFont,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 0 15px rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                {t.name}
                <span className="text-[10px] text-white/30 tabular-nums">{t.count}</span>
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
