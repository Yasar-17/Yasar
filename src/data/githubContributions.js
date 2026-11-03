/**
 * GitHub 16-Week Contribution Data for @Yasar-17
 * 16 weeks * 7 days = 112 daily tiles matching GitHub activity
 */

export const generateContributions = () => {
  const totalDays = 112; // 16 weeks
  const today = new Date('2026-11-03T00:00:00Z');
  const start = new Date(today);
  start.setUTCDate(today.getUTCDate() - totalDays + 1);

  // Active verified days with contribution intensities (0: none, 1: low, 2: medium, 3: high, 4: max)
  const activeDays = new Map([
    // November 2026
    ['2026-11-03', 4],
    ['2026-11-02', 3],
    ['2026-11-01', 3],
    // October 2026
    ['2026-10-31', 4],
    ['2026-10-30', 2],
    ['2026-10-29', 2],
    ['2026-10-28', 1],
    ['2026-10-25', 2],
    ['2026-10-24', 3],
    ['2026-10-23', 2],
    ['2026-10-20', 1],
    ['2026-10-18', 2],
    ['2026-10-15', 3],
    ['2026-10-14', 2],
    ['2026-10-13', 4],
    ['2026-10-12', 3],
    ['2026-10-10', 4],
    ['2026-10-09', 2],
    ['2026-10-08', 3],
    ['2026-10-06', 1],
    ['2026-10-04', 2],
    ['2026-10-02', 2],
    ['2026-10-01', 1],
    // September 2026
    ['2026-09-29', 3],
    ['2026-09-28', 4],
    ['2026-09-25', 2],
    ['2026-09-24', 2],
    ['2026-09-22', 1],
    ['2026-09-20', 3],
    ['2026-09-18', 2],
    ['2026-09-15', 3],
    ['2026-09-12', 4],
    ['2026-09-11', 2],
    ['2026-09-08', 3],
    ['2026-09-05', 2],
    ['2026-09-02', 1],
    // August 2026
    ['2026-08-30', 3],
    ['2026-08-28', 2],
    ['2026-08-26', 4],
    ['2026-08-25', 3],
    ['2026-08-22', 2],
    ['2026-08-20', 1],
    ['2026-08-18', 3],
    ['2026-08-15', 2],
    ['2026-08-12', 4],
    ['2026-08-10', 3],
    ['2026-08-08', 2],
    ['2026-08-05', 3],
    ['2026-08-02', 1],
    // July 2026
    ['2026-07-30', 2],
    ['2026-07-28', 3],
    ['2026-07-25', 4],
    ['2026-07-22', 2],
    ['2026-07-20', 1],
    ['2026-07-18', 3],
    ['2026-07-16', 2],
  ]);

  const days = [];
  let totalContributions = 0;

  for (let i = 0; i < totalDays; i++) {
    const cur = new Date(start);
    cur.setUTCDate(start.getUTCDate() + i);
    const dateStr = cur.toISOString().slice(0, 10);
    const level = activeDays.get(dateStr) || 0;
    if (level > 0) {
      totalContributions += level === 4 ? 6 : level === 3 ? 4 : level === 2 ? 2 : 1;
    }
    days.push({
      date: dateStr,
      level,
    });
  }

  return {
    days,
    totalContributions,
    weeksCount: 16,
    username: 'Yasar-17',
    url: 'https://github.com/Yasar-17',
  };
};

export const GITHUB_ACTIVITY = generateContributions();

