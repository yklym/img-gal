import { useCallback, useMemo, useState } from "react";

import dayjs, { Dayjs } from "dayjs";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Popover, { PopoverProps } from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { CustomDateCalendarSlotProps, DateRangePickerProps } from "./types";
import { CalendarLocation } from "../types";
import { ANIMATION_DURATION } from "./constants";
import { DateRangePickerFooter } from "./components/dateRangePickerFooter";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePickerDay } from "./components/dateRangePickerDay";
import { DateCalendarHeader } from "../components/dateCalendarHeader";
import { dayOfWeekFormatter } from "../utils";

interface IDateRangePicker extends DateRangePickerProps {
  popoverSx?: PopoverProps["sx"];
}

export const DateRangePicker = ({
  id,
  x,
  y,
  startDate: startDateProp,
  endDate: endDateProp,
  open,
  disableFuture,
  onDismiss,
  onApply,
  popoverSx,
}: IDateRangePicker) => {
  // if disable past is active, show current date on right side
  // as user will unlikely navigate to future
  const [valueLeft, setValueLeft] = useState<Dayjs | null>(
    disableFuture ? dayjs().subtract(1, "month") : dayjs()
  );

  const [valueRight, setValueRight] = useState<Dayjs | null>(
    disableFuture ? dayjs() : dayjs().add(1, "month")
  );

  const [hoveredDay, setHoveredDay] = useState<Dayjs | null>(null);
  const [startDate, setStartDate] = useState<Dayjs | undefined>(startDateProp);
  const [endDate, setEndDate] = useState<Dayjs | undefined>(endDateProp);

  const onResetHoveredDay = useCallback(() => setHoveredDay(null), []);

  const calendarSlots: any = useMemo(
    () => ({
      day: DateRangePickerDay,
      calendarHeader: DateCalendarHeader,
    }),
    []
  );

  const onMonthHasBeenChanged = useCallback(
    (newMonth: Dayjs, calendarLocation: CalendarLocation) => {
      if (calendarLocation === "left") {
        setValueLeft(newMonth);
        setValueRight(newMonth.add(1, "month"));
      } else {
        setValueRight(newMonth);
        setValueLeft(newMonth.subtract(1, "month"));
      }
    },
    []
  );

  const createCalendarSlotsProps = (
    calendarLocation: CalendarLocation
  ): CustomDateCalendarSlotProps => ({
    day: (ownerState) => ({
      startDate,
      endDate,
      hoveredDay,
      onPointerEnter: () => setHoveredDay(ownerState.day),
      onPointerLeave: onResetHoveredDay,
    }),
    calendarHeader: {
      calendarLocation,
      onMonthHasBeenChanged,
    },
  });

  // works in three modes:
  // 1. user selects start date
  // 2. user selects end date
  // 3. user selects new start date, delete old values
  const onChange = (newValue: Dayjs) => {
    if (!startDate) {
      setStartDate(newValue);
    } else if (!endDate && !newValue.isBefore(startDate, "date")) {
      // don't allow end date to be earlier than start date
      setEndDate(newValue);
    } else {
      // if both start and end dates are set, reset them
      // if new value earlier than start date, set new start date
      setStartDate(newValue);
      setEndDate(undefined);
    }
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorReference="anchorPosition"
      transitionDuration={ANIMATION_DURATION}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      anchorPosition={{ top: y ?? 0, left: x ?? 0 }}
      elevation={0}
      slotProps={{
        paper: {
          sx: {
            my: 1,
            borderRadius: "24px",
          },
        },
      }}
      sx={{ ...popoverSx }}
    >
      <ClickAwayListener onClickAway={onDismiss}>
        <Container direction="column">
          <Stack direction="row">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledDateCalendar
                value={valueLeft}
                disableFuture={disableFuture}
                onChange={onChange}
                disableHighlightToday
                slots={calendarSlots}
                slotProps={createCalendarSlotsProps("left")}
                reduceAnimations // to save resources
                dayOfWeekFormatter={dayOfWeekFormatter}
              />
              <StyledDateCalendar
                value={valueRight}
                onChange={onChange}
                disableFuture={disableFuture}
                disableHighlightToday
                slots={calendarSlots}
                slotProps={createCalendarSlotsProps("right")}
                reduceAnimations // to save resources
                dayOfWeekFormatter={dayOfWeekFormatter}
              />
            </LocalizationProvider>
          </Stack>

          <DateRangePickerFooter
            startDate={startDate}
            endDate={endDate}
            onDismiss={onDismiss}
            onApply={onApply}
          />
        </Container>
      </ClickAwayListener>
    </Popover>
  );
};

const StyledDateCalendar = styled(DateCalendar)(({ theme }) => ({
  ".MuiDayCalendar-weekDayLabel": {
    color: "#483375",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "10px",
    margin: "0 2px",
  },
}));

const Container = styled(Stack)(({ theme }) => ({
  borderRadius: "inherit",
  padding: theme.spacing(2),
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: theme.palette.grey[300],
}));
