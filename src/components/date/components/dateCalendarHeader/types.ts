import { Dayjs } from "dayjs";
import { PickersCalendarHeaderProps } from "@mui/x-date-pickers/PickersCalendarHeader";
import { CalendarLocation } from "../../types";

export interface CustomCalendarHeaderProps {
  calendarLocation: CalendarLocation;
  onMonthHasBeenChanged: (
    newMonth: Dayjs,
    calendarLocation: CalendarLocation
  ) => void;
}

export interface CustomPickersCalendarHeaderProps
  extends PickersCalendarHeaderProps<Dayjs>,
    CustomCalendarHeaderProps {}
