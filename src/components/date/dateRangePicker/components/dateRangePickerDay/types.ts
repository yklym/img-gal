import { Dayjs } from 'dayjs';
import { PickersDayProps } from '@mui/x-date-pickers/PickersDay';

export interface CustomPickerDayViewProps extends PickersDayProps<Dayjs> {
  isRangeLimitPoint: boolean;
  isInBetweenPoint: boolean;
  isStartOfMonth: boolean;
  isEndOfMonth: boolean;
  isFirstDayOfWeek: boolean;
  isLastDayOfWeek: boolean;
}

export interface CustomDayProps extends PickersDayProps<Dayjs> {
  startDate?: Dayjs | null;
  endDate?: Dayjs | null;
  hoveredDay?: Dayjs | null;
}

export interface SelectedDayBackgroundProps {
  hasBackground: boolean;
  circleCornersLeft: boolean;
  circleCornersRight: boolean;
}
