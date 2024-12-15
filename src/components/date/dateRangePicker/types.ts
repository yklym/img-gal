import { Dayjs } from "dayjs";
import { PopoverProps, SlotComponentProps } from "@mui/material";
import {
  DateCalendarProps,
  DateCalendarSlotProps,
} from "@mui/x-date-pickers/DateCalendar";
import { PickersCalendarHeader } from "@mui/x-date-pickers/PickersCalendarHeader";
import { CustomCalendarHeaderProps } from "../components/dateCalendarHeader/types";

export interface CustomDateCalendarSlotProps
  extends DateCalendarSlotProps<Dayjs> {
  calendarHeader?: SlotComponentProps<
    typeof PickersCalendarHeader,
    object,
    DateCalendarProps<Dayjs>
  > &
    CustomCalendarHeaderProps;
}

export interface DateRangePickerProps {
  id: PopoverProps["id"];
  x?: number;
  y?: number;
  disableFuture?: boolean;
  open: PopoverProps["open"];
  startDate?: Dayjs;
  endDate?: Dayjs;
  onDismiss: () => void;
  onApply: (startDate?: Dayjs, endDate?: Dayjs) => void;
}
