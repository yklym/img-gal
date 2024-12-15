import dayjs from "dayjs";
import { useState } from "react";

export enum DATE_FORMATS {
  MONTH_DAY_YEAR_SLASH = "MM/DD/YYYY",
  MONTH_DAY_DOT = "MM.DD",
  MONTH_DAY_YEAR_TIME = "MM/DD/YYYY hh:mmA",
  API_DATE = "YYYY-MM-DD",
  MONTH_DAY_YEAR_DASH = "MM-DD-YYYY",
  MONTH_YEAR_SLASH = "MM/YYYY",
  MONTH_YEAR_SLASH_SHORT = "MM/YY",
  HOUR_MINUTE_SLASH = "hh:mmA",
}

export enum AvailableDateShortcuts {
  ALL_TIME = "All Time",
  TODAY = "Today",
  YESTERDAY = "Yesterday",
  LAST_7_DAYS = "Last 7 Days",
  LAST_30_DAYS = "Last 30 Days",
  CURRENT_MONTH = "This Month",
  LAST_MONTH = "Last Month",
  CUSTOM = "custom",
}

export const AVAILABLE_DATE_SHORTCUTS_TEXTS = Object.freeze({
  [AvailableDateShortcuts.ALL_TIME]: "All time",
  [AvailableDateShortcuts.TODAY]: "Today",
  [AvailableDateShortcuts.YESTERDAY]: "Yesterday",
  [AvailableDateShortcuts.LAST_7_DAYS]: "Last 7 days",
  [AvailableDateShortcuts.LAST_30_DAYS]: "Last 30 days",
  [AvailableDateShortcuts.CURRENT_MONTH]: "Current month",
  [AvailableDateShortcuts.LAST_MONTH]: "Last month",
  [AvailableDateShortcuts.CUSTOM]: "Custom Range",
});

export const getDateShortcutStart = (shortcut: AvailableDateShortcuts) => {
  switch (shortcut) {
    case AvailableDateShortcuts.ALL_TIME:
      return null;
    case AvailableDateShortcuts.TODAY:
      return dayjs().startOf("day");
    case AvailableDateShortcuts.YESTERDAY:
      return dayjs().subtract(1, "day").startOf("day");
    case AvailableDateShortcuts.LAST_7_DAYS:
      return dayjs().subtract(7, "day").startOf("day");
    case AvailableDateShortcuts.LAST_30_DAYS:
      return dayjs().subtract(30, "day").startOf("day");
    case AvailableDateShortcuts.CURRENT_MONTH:
      return dayjs().startOf("month");
    case AvailableDateShortcuts.LAST_MONTH:
      return dayjs().subtract(1, "month").startOf("month");
    default:
      return null;
  }
};

export const getDateShortcutEnd = (
  shortcut: AvailableDateShortcuts,
  useNullAsDefault?: boolean
) => {
  switch (shortcut) {
    case AvailableDateShortcuts.ALL_TIME:
      return null;
    case AvailableDateShortcuts.YESTERDAY:
      return dayjs().subtract(1, "day").endOf("day");
    case AvailableDateShortcuts.LAST_MONTH:
      return dayjs().subtract(1, "month").endOf("month");
    default:
      return useNullAsDefault ? null : dayjs().endOf("day");
  }
};

export const findShortcutByRange = (dateStart: string, dateEnd: string) => {
  if (!dateStart && !dateEnd) {
    return AvailableDateShortcuts.ALL_TIME;
  }

  return Object.values(AvailableDateShortcuts).find(
    (dateFilter) =>
      dayjs(dateStart).isSame(getDateShortcutStart(dateFilter), "day") &&
      dayjs(dateEnd).isSame(getDateShortcutEnd(dateFilter), "day")
  );
};

export const getDateShortcuts = (shortcuts: AvailableDateShortcuts[]) =>
  shortcuts.map((shortcut) => ({
    id: shortcut,
    name: AVAILABLE_DATE_SHORTCUTS_TEXTS[shortcut],
    start: getDateShortcutStart(shortcut),
    end: getDateShortcutEnd(shortcut),
  }));

export const dateRangeSelectOptions = getDateShortcuts([
  AvailableDateShortcuts.ALL_TIME,
  AvailableDateShortcuts.TODAY,
  AvailableDateShortcuts.YESTERDAY,
  AvailableDateShortcuts.LAST_7_DAYS,
  AvailableDateShortcuts.LAST_30_DAYS,
  AvailableDateShortcuts.CURRENT_MONTH,
  AvailableDateShortcuts.LAST_MONTH,
  AvailableDateShortcuts.CUSTOM,
]);

export const DEFAULT_DATE_RANGE_KEY = AvailableDateShortcuts.ALL_TIME;

// used to reset uncontrolled components by providing key
export const useResetKey = () => {
  const [resetKey, setResetKey] = useState(0);

  const reset = () => setResetKey((key) => key + 1);

  return {
    resetKey,
    reset,
  };
};
