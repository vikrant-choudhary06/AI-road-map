/**
 * Local-timezone calendar date, week boundary, duration, and learning streak
 * utilities (Stage 5 — Section 11 & Section 19).
 *
 * Uses pure civil calendar arithmetic (Howard Hinnant's algorithm) when
 * stepping across `YYYY-MM-DD` dates so Daylight Saving Time (DST) transitions
 * and SSR/prerender passes never shift dates or invoke `new Date()` unnecessarily.
 */

const DATE_KEY_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const SHORT_WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function isValidDateKey(val: unknown): val is string {
  if (typeof val !== "string" || !DATE_KEY_REGEX.test(val)) return false;
  const [y, m, d] = val.split("-").map(Number);
  return y >= 2000 && y <= 2100 && m >= 1 && m <= 12 && d >= 1 && d <= 31;
}

function formatYmd(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function parseYmdParts(dateKey: string): { y: number; m: number; d: number } {
  if (!isValidDateKey(dateKey)) {
    return { y: 2026, m: 1, d: 5 };
  }
  const [y, m, d] = dateKey.split("-").map(Number);
  return { y, m, d };
}

/**
 * Pure integer days since 1970-01-01 from a civil `(y, m, d)` triple.
 */
function daysFromCivil(y: number, m: number, d: number): number {
  const year = m <= 2 ? y - 1 : y;
  const era = Math.floor((year >= 0 ? year : year - 399) / 400);
  const yoe = year - era * 400;
  const doy = Math.floor((153 * (m + (m > 2 ? -3 : 9)) + 2) / 5) + d - 1;
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy;
  return era * 146097 + doe - 719468;
}

/**
 * Pure civil `(y, m, d)` triple from integer days since 1970-01-01.
 */
function civilFromDays(z: number): { y: number; m: number; d: number } {
  const zShift = z + 719468;
  const era = Math.floor((zShift >= 0 ? zShift : zShift - 146096) / 146097);
  const doe = zShift - era * 146097;
  const yoe = Math.floor(
    (doe -
      Math.floor(doe / 1460) +
      Math.floor(doe / 36524) -
      Math.floor(doe / 146096)) /
      365
  );
  const y = yoe + era * 400;
  const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100));
  const mp = Math.floor((5 * doy + 2) / 153);
  const d = doy - Math.floor((153 * mp + 2) / 5) + 1;
  const m = mp + (mp < 10 ? 3 : -9);
  return { y: y + (m <= 2 ? 1 : 0), m, d };
}

/**
 * Returns day of week `0` (Sun) through `6` (Sat) from integer days since 1970-01-01.
 */
function dayOfWeekFromDays(z: number): number {
  return (((z + 4) % 7) + 7) % 7;
}

/**
 * Formats a `Date` object into a local calendar key `YYYY-MM-DD`.
 * Call only in client event handlers or after client mount.
 */
export function toLocalDateKey(date?: Date): string {
  const d = date ?? new Date();
  return formatYmd(d.getFullYear(), d.getMonth() + 1, d.getDate());
}

/**
 * Converts a stored ISO timestamp into a `YYYY-MM-DD` date key.
 */
export function isoToLocalDateKey(
  isoString: string,
  fallbackDateKey?: string
): string {
  if (typeof isoString === "string" && isoString.length >= 10) {
    const prefix = isoString.slice(0, 10);
    if (isValidDateKey(prefix)) {
      return prefix;
    }
  }
  return fallbackDateKey && isValidDateKey(fallbackDateKey)
    ? fallbackDateKey
    : "2026-01-05";
}

/**
 * Adds `deltaDays` (positive or negative) to a `YYYY-MM-DD` key using pure
 * civil calendar math (100% DST-safe and prerender-safe).
 */
export function addLocalDays(dateKey: string, deltaDays: number): string {
  const { y, m, d } = parseYmdParts(dateKey);
  const targetDays = daysFromCivil(y, m, d) + deltaDays;
  const next = civilFromDays(targetDays);
  return formatYmd(next.y, next.m, next.d);
}

/**
 * Returns the Monday (`YYYY-MM-DD`) of the week containing `referenceDateKey`.
 * Uses Monday as the start of the study week.
 */
export function getStartOfLocalWeek(referenceDateKey: string): string {
  const { y, m, d } = parseYmdParts(referenceDateKey);
  const z = daysFromCivil(y, m, d);
  const dow = dayOfWeekFromDays(z); // 0 = Sun, 1 = Mon, ... 6 = Sat
  const diffToMonday = dow === 0 ? -6 : 1 - dow;
  const monday = civilFromDays(z + diffToMonday);
  return formatYmd(monday.y, monday.m, monday.d);
}

export interface LocalCalendarDayInfo {
  dateKey: string;
  dayShort: string;
  monthShort: string;
  dayNumber: string;
  isToday: boolean;
}

/**
 * Returns the 7 days (Monday through Sunday) for the week starting at `mondayDateKey`.
 */
export function getLocalWeekDays(
  mondayDateKey: string,
  todayDateKey: string
): LocalCalendarDayInfo[] {
  const startMonday = getStartOfLocalWeek(mondayDateKey);
  const { y, m, d } = parseYmdParts(startMonday);
  const startZ = daysFromCivil(y, m, d);
  const days: LocalCalendarDayInfo[] = [];

  for (let i = 0; i < 7; i += 1) {
    const z = startZ + i;
    const civ = civilFromDays(z);
    const dow = dayOfWeekFromDays(z);
    const key = formatYmd(civ.y, civ.m, civ.d);
    days.push({
      dateKey: key,
      dayShort: SHORT_WEEKDAYS[dow],
      monthShort: SHORT_MONTHS[civ.m - 1],
      dayNumber: String(civ.d).padStart(2, "0"),
      isToday: key === todayDateKey,
    });
  }

  return days;
}

/**
 * Returns `count` consecutive local calendar days ending on `endDateKey` (inclusive).
 */
export function getTrailingLocalDays(
  endDateKey: string,
  count: number
): LocalCalendarDayInfo[] {
  const { y, m, d } = parseYmdParts(endDateKey);
  const endZ = daysFromCivil(y, m, d);
  const days: LocalCalendarDayInfo[] = [];

  for (let i = count - 1; i >= 0; i -= 1) {
    const z = endZ - i;
    const civ = civilFromDays(z);
    const dow = dayOfWeekFromDays(z);
    const key = formatYmd(civ.y, civ.m, civ.d);
    days.push({
      dateKey: key,
      dayShort: SHORT_WEEKDAYS[dow],
      monthShort: SHORT_MONTHS[civ.m - 1],
      dayNumber: String(civ.d).padStart(2, "0"),
      isToday: key === endDateKey,
    });
  }
  return days;
}

/**
 * Formats `YYYY-MM-DD` into a concise human-readable local date (e.g. "Mon, Nov 9, 2026").
 */
export function formatLocalDateReadable(dateKey: string): string {
  if (!isValidDateKey(dateKey)) return dateKey;
  const { y, m, d } = parseYmdParts(dateKey);
  const z = daysFromCivil(y, m, d);
  const dow = dayOfWeekFromDays(z);
  return `${SHORT_WEEKDAYS[dow]}, ${SHORT_MONTHS[m - 1]} ${d}, ${y}`;
}

/**
 * Formats minutes into a human-friendly string (e.g., "45m", "1h 30m").
 */
export function formatDurationMinutes(minutes: number): string {
  const safe = Math.max(0, Math.round(minutes));
  if (safe < 60) return `${safe}m`;
  const hrs = Math.floor(safe / 60);
  const rem = safe % 60;
  return rem === 0 ? `${hrs}h` : `${hrs}h ${rem}m`;
}

export interface LearningStreakSummary {
  currentStreak: number;
  longestStreak: number;
  lastActiveDateKey: string | null;
  totalActiveDays: number;
  activeToday: boolean;
}

/**
 * Deterministically computes the learner's current and longest study streak
 * from a collection of local `YYYY-MM-DD` date keys where qualifying learning
 * actions occurred.
 */
export function computeLearningStreak(
  rawDateKeys: Iterable<string>,
  todayDateKey: string
): LearningStreakSummary {
  const uniqueSet = new Set<string>();
  for (const key of rawDateKeys) {
    if (isValidDateKey(key)) {
      uniqueSet.add(key);
    }
  }

  if (uniqueSet.size === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDateKey: null,
      totalActiveDays: 0,
      activeToday: false,
    };
  }

  const sortedAsc = Array.from(uniqueSet).sort();
  const lastActiveDateKey = sortedAsc[sortedAsc.length - 1] ?? null;
  const activeToday = uniqueSet.has(todayDateKey);
  const yesterdayKey = addLocalDays(todayDateKey, -1);

  // Calculate current streak
  let currentStreak = 0;
  let cursorKey: string | null = activeToday
    ? todayDateKey
    : uniqueSet.has(yesterdayKey)
      ? yesterdayKey
      : null;

  while (cursorKey && uniqueSet.has(cursorKey)) {
    currentStreak += 1;
    cursorKey = addLocalDays(cursorKey, -1);
  }

  // Calculate longest streak across all recorded dates
  let longestStreak = 0;
  let currentRun = 0;
  let prevKey: string | null = null;

  for (const key of sortedAsc) {
    if (prevKey && addLocalDays(prevKey, 1) === key) {
      currentRun += 1;
    } else {
      currentRun = 1;
    }
    if (currentRun > longestStreak) {
      longestStreak = currentRun;
    }
    prevKey = key;
  }

  return {
    currentStreak,
    longestStreak,
    lastActiveDateKey,
    totalActiveDays: uniqueSet.size,
    activeToday,
  };
}
