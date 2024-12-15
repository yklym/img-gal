import { FilterSortKey, UnitType } from "@/types";
import {
  AvailableDateShortcuts,
  findShortcutByRange,
} from "../../../../components/selectRangeDatePicker/common";
import dayjs, { Dayjs } from "dayjs";

interface FilterOptions {
  currentShortcut: AvailableDateShortcuts;
  customDateRange?: [Dayjs, Dayjs];
}

interface DateFields {
  from: string;
  to: string;
}

export const getFilterOptions = <T extends Record<string, any>>(
  filters: T,
  dateFields: DateFields = { from: "start", to: "end" }
): FilterOptions => {
  let startDate: string | null = null;
  let endDate: string | null = null;

  if (filters[dateFields.from]) {
    startDate = filters[dateFields.from];
  }

  if (filters[dateFields.to]) {
    endDate = filters[dateFields.to];
  }

  const currentShortcut =
    findShortcutByRange(startDate, endDate) || AvailableDateShortcuts.CUSTOM;

  let customDateRange: [Dayjs, Dayjs] | undefined = undefined;
  if (
    currentShortcut === AvailableDateShortcuts.CUSTOM &&
    startDate &&
    endDate
  ) {
    customDateRange = [dayjs(startDate), dayjs(endDate)];
  }

  return { currentShortcut, customDateRange };
};

export const sortOptions = [
  {
    label: "Created at ASC",
    value: FilterSortKey.CREATED_ASC,
  },
  {
    label: "Created at DESC",
    value: FilterSortKey.CREATED_DESC,
  },
];

export const unitTypeOptions = Object.values(UnitType).map((name) => ({
  label: name,
  value: name,
}));
