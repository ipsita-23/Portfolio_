function toUTCKey(dateStr) {
  // dateStr is YYYY-MM-DD
  const [y, m, d] = dateStr.split('-').map((x) => Number(x))
  // Use UTC midnight to avoid timezone / DST off-by-one.
  return Date.UTC(y, m - 1, d)
}

function fromUTCKey(utcMs) {
  const dt = new Date(utcMs)
  const y = dt.getUTCFullYear()
  const m = String(dt.getUTCMonth() + 1).padStart(2, '0')
  const d = String(dt.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function computeHeatmapStats(contributions) {
  // contributions: [{ date: 'YYYY-MM-DD', count: number }, ...]
  if (!Array.isArray(contributions) || contributions.length === 0) {
    return { totalCommits: 0, currentStreak: 0, longestStreak: 0 }
  }

  const countByDay = new Map()
  let totalCommits = 0
  let minUtc = Infinity
  let maxUtc = -Infinity

  for (const c of contributions) {
    const utc = toUTCKey(c.date)
    minUtc = Math.min(minUtc, utc)
    maxUtc = Math.max(maxUtc, utc)
    const count = Number(c.count || 0)
    totalCommits += count
    countByDay.set(utc, count)
  }

  const isActive = (utcMs) => (Number(countByDay.get(utcMs) || 0) > 0)

  // Find the last active day in the dataset.
  let lastActive = null
  for (let utc = maxUtc; utc >= minUtc; utc -= 24 * 60 * 60 * 1000) {
    if (isActive(utc)) {
      lastActive = utc
      break
    }
  }

  // Current streak ends on the most recent active day.
  let currentStreak = 0
  if (lastActive !== null) {
    for (
      let utc = lastActive;
      utc >= minUtc && isActive(utc);
      utc -= 24 * 60 * 60 * 1000
    ) {
      currentStreak += 1
    }
  }

  // Longest streak across the whole dataset (day-to-day consecutive actives).
  let longestStreak = 0
  let run = 0
  for (let utc = minUtc; utc <= maxUtc; utc += 24 * 60 * 60 * 1000) {
    if (isActive(utc)) {
      run += 1
      longestStreak = Math.max(longestStreak, run)
    } else {
      run = 0
    }
  }

  return { totalCommits, currentStreak, longestStreak }
}

export function normalizeContributions(contributions) {
  // Ensures contributions are sorted ascending and has {date,count,level}
  const safe = Array.isArray(contributions) ? contributions : []
  return safe
    .map((c) => ({
      date: c.date,
      count: Number(c.count || 0),
      level: Number(c.level || 0),
    }))
    .sort((a, b) => toUTCKey(a.date) - toUTCKey(b.date))
}

export function isPlaceholderHandle(value) {
  if (typeof value !== 'string') return true
  return value.trim() === '' || value.includes('__PLACEHOLDER__')
}

