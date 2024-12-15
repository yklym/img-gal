import { FC, useEffect, useId, useRef, useState } from "react";

import dayjs, { Dayjs } from "dayjs";
import { Box } from "@mui/material";
import {
  AvailableDateShortcuts,
  DATE_FORMATS,
  dateRangeSelectOptions,
  useResetKey,
} from "./common";
import { DateRangePicker } from "../date/dateRangePicker";
import Select, { SelectOption } from "../select";
import { SxProps, useTheme } from "@mui/material/styles";

export type SelectDateRangeChangeArgs = {
  start: Dayjs | null;
  end: Dayjs | null;
  key: AvailableDateShortcuts | null;
};

type OptionType = {
  start: Dayjs | string | number;
  end: Dayjs | string | number;
  id: string | null | undefined;
  name: string | null | undefined;
};

export interface SelectRangeDatePickerProps {
  defaultSelectedKey?: AvailableDateShortcuts;
  disableFuture?: boolean;
  options?: OptionType[];
  mainTitle?: string;
  multiple?: boolean;
  selectClassName?: string;
  customDateRange?: [Dayjs, Dayjs];

  onSubmitDatePicker?: (values: SelectDateRangeChangeArgs) => void;
  onChangeSelect?: (value: AvailableDateShortcuts) => void;
  sx?: SxProps;
}

export const SelectRangeDatePicker: FC<SelectRangeDatePickerProps> = ({
  defaultSelectedKey = AvailableDateShortcuts.ALL_TIME,
  disableFuture = false,
  options = dateRangeSelectOptions,
  multiple = false,
  mainTitle = "Overview for",
  selectClassName = "",
  customDateRange,
  onSubmitDatePicker,
  onChangeSelect,
  sx,
}) => {
  const [selectedDateFilterKey, setSelectedDayFilterKey] =
    useState(defaultSelectedKey);
  const [selectDisplayValue, setSelectDisplayValue] = useState("");

  const selectRef = useRef<HTMLInputElement | null>(null);

  const datePickerId = useId();

  const [selectBounds, setSelectBounds] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isOpenDatePicker, setDatePickerOpen] = useState(false);
  const onDismissDatePicker = () => setDatePickerOpen(false);

  const { resetKey: datePickerKey, reset: resetDatePicker } = useResetKey();

  const handleDateRangeChange = ([key]: any[]) => {
    setSelectedDayFilterKey(key as AvailableDateShortcuts);
    resetDatePicker();

    if (key === AvailableDateShortcuts.CUSTOM) return setDatePickerOpen(true);
    const selectedOption = options.find((option: any) => option.id === key);
    if (selectedOption) {
      setSelectDisplayValue(selectedOption.name || "");
    }
  };

  const onApply = (startDate?: Dayjs, endDate?: Dayjs) => {
    setSelectedDayFilterKey(AvailableDateShortcuts.CUSTOM);
    setSelectDisplayValue(
      `${dayjs(startDate).format(DATE_FORMATS.MONTH_DAY_DOT)} - ${dayjs(endDate).format(DATE_FORMATS.MONTH_DAY_DOT)}`
    );

    onSubmitDatePicker?.({
      start: dayjs(startDate),
      end: dayjs(endDate),
      key: null, // case key== custom
    });

    setDatePickerOpen(false);
  };

  useEffect(() => {
    if (selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      setSelectBounds({
        x: rect.x + rect.width,
        y: rect.y + rect.height,
      });
    }
  }, []);

  useEffect(() => {
    if (
      defaultSelectedKey &&
      defaultSelectedKey !== AvailableDateShortcuts.CUSTOM
    ) {
      setSelectedDayFilterKey(defaultSelectedKey);
      const selectedOption = options.find(
        (option) => option.id === defaultSelectedKey
      );
      if (selectedOption) {
        setSelectDisplayValue(selectedOption.name || "");
      }
      onChangeSelect?.(defaultSelectedKey);
    }
  }, [defaultSelectedKey]);

  useEffect(() => {
    if (
      selectedDateFilterKey &&
      selectedDateFilterKey !== AvailableDateShortcuts.CUSTOM
    ) {
      const selectedOption = options.find(
        (option) => option.id === selectedDateFilterKey
      );
      if (selectedOption) {
        setSelectDisplayValue(selectedOption.name || "");
      }
      onChangeSelect?.(selectedDateFilterKey);
    } else if (
      selectedDateFilterKey === AvailableDateShortcuts.CUSTOM &&
      customDateRange
    ) {
      // Use custom date range for display
      const [start, end] = customDateRange;
      setSelectDisplayValue(
        `${dayjs(start).format(DATE_FORMATS.MONTH_DAY_DOT)} - ${dayjs(end).format(DATE_FORMATS.MONTH_DAY_DOT)}`
      );
    }
  }, [selectedDateFilterKey, customDateRange]);

  const dateRangePickerValue = (() => {
    if (
      selectedDateFilterKey === AvailableDateShortcuts.CUSTOM &&
      customDateRange
    ) {
      const [startDate, endDate] = customDateRange;

      return {
        startDate,
        endDate,
      };
    }

    return null;
  })();

  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        fontWeight: 500,
        selectClassName,
        ...sx,
      }}
    >
      {mainTitle && <span>{mainTitle}</span>}

      <Box sx={{ position: "relative", minWidth: "180px" }} ref={selectRef}>
        <Select
          radio
          multiple={multiple}
          options={options as unknown as SelectOption[]}
          selectedOptions={[selectedDateFilterKey]}
          displayValue={
            selectedDateFilterKey === AvailableDateShortcuts.CUSTOM
              ? selectDisplayValue
              : undefined // Let it use default option names for non-custom
          }
          type="datePicker"
          placeholder="Choose date range"
          onItemsChange={handleDateRangeChange}
        />

        <DateRangePicker
          key={datePickerKey}
          id={isOpenDatePicker ? datePickerId : undefined}
          disableFuture={disableFuture}
          open={isOpenDatePicker}
          startDate={dateRangePickerValue?.startDate}
          endDate={dateRangePickerValue?.endDate}
          x={selectBounds?.x}
          y={selectBounds?.y}
          onDismiss={onDismissDatePicker}
          onApply={onApply}
        />
      </Box>
    </Box>
  );
};
