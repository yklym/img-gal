import { Stack } from "@mui/material";
import { Header } from "../../components/header";
import {
  SelectDateRangeChangeArgs,
  SelectRangeDatePicker,
} from "../../components/selectRangeDatePicker";

import { useState } from "react";
import {
  AvailableDateShortcuts,
  DATE_FORMATS,
  DEFAULT_DATE_RANGE_KEY,
  getDateShortcutEnd,
  getDateShortcutStart,
} from "../../components/selectRangeDatePicker/common";

import { getFilterOptions } from "./common";

const DEFAULT_SORT_KEY = AvailableDateShortcuts.TODAY;

const HomePage = () => {
  // eslint-disable-next-line
  const [currentFilters, setCurrentFilters] = useState({
    start: getDateShortcutStart(DEFAULT_SORT_KEY)?.format(
      DATE_FORMATS.API_DATE
    ),
    end: getDateShortcutEnd(DEFAULT_SORT_KEY)?.format(DATE_FORMATS.API_DATE),
  });

  const { customDateRange, currentShortcut } = getFilterOptions(currentFilters);
  // eslint-disable-next-line
  const [dateRange, setDateRange] = useState<string>(DEFAULT_DATE_RANGE_KEY);

  const onSelectedDateChange = ({ start, end }: SelectDateRangeChangeArgs) => {
    const startDate = start?.format(DATE_FORMATS.API_DATE) ?? null;
    const endDate = end?.format(DATE_FORMATS.API_DATE) ?? null;
    setDateRange(startDate + ":" + endDate);
  };
  const onDatePickerChangeSelect = (value) => {
    setDateRange(value);
    // setFilters({
    //   ...filters,
    //   start: getDateShortcutStart(value)?.format(DATE_FORMATS.API_DATE),
    //   end: getDateShortcutEnd(value)?.format(DATE_FORMATS.API_DATE),
    // });
  };

  return (
    <Stack>
      <Header />

      <SelectRangeDatePicker
        mainTitle=""
        defaultSelectedKey={currentShortcut}
        onSubmitDatePicker={onSelectedDateChange}
        onChangeSelect={onDatePickerChangeSelect}
        customDateRange={customDateRange}
        disableFuture
      />
    </Stack>
  );
};

export { HomePage };
