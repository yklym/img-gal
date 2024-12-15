import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";

import {
  AvailableDateShortcuts,
  DATE_FORMATS,
  DEFAULT_DATE_RANGE_KEY,
  getDateShortcutEnd,
  getDateShortcutStart,
} from "@/components/selectRangeDatePicker/common";
import { useState } from "react";
import {
  SelectDateRangeChangeArgs,
  SelectRangeDatePicker,
} from "@/components/selectRangeDatePicker";
import { getFilterOptions, sortOptions, unitTypeOptions } from "./common";
import { useImageDataContext } from "@/components/imageDataContext";
import { FilterSortKey, UnitType } from "@/types";
import { SelectChangeEvent } from "@mui/material/Select";

const DEFAULT_SORT_KEY = AvailableDateShortcuts.ALL_TIME;

const HomepageFilters = () => {
  const { filters, onSetFilter } = useImageDataContext();

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
    onSetFilter("date", {
      startDate: getDateShortcutStart(value),
      endDate: getDateShortcutEnd(value),
    });
  };

  const handleChangeSort = (e: SelectChangeEvent<FilterSortKey>) => {
    onSetFilter("sort", e.target.value as FilterSortKey);
  };

  const handleChangeUnitType = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    onSetFilter(
      "unitTypes",
      // On autofill we get a stringified value.
      (typeof value === "string" ? value.split(",") : value) as UnitType[]
    );
  };

  return (
    <Stack direction="row" gap={2} px={"40px"} py={3} maxWidth={"65vw"}>
      <FormControl sx={{ my: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Sort by</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={filters.sort}
          onChange={handleChangeSort}
          input={<OutlinedInput label="Sort by" />}
          sx={{
            height: "40px",
          }}
        >
          {sortOptions.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ my: 1, width: 300 }}>
        <InputLabel
          id="demo-multiple-checkbox-label"
          sx={{ bottom: "24px", top: "unset" }}
        >
          Unit type
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={filters.unitTypes as string[]}
          onChange={handleChangeUnitType}
          input={<OutlinedInput label="Tag" />}
          sx={{
            height: "40px",
          }}
          renderValue={(value: string[]) => value.join(", ")}
        >
          {unitTypeOptions.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              <Checkbox checked={filters.unitTypes.includes(value)} />
              <ListItemText primary={label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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

export { HomepageFilters };
