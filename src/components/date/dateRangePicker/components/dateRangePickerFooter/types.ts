import { Dayjs } from "dayjs";

export interface DateRangePickerFooterProps {
  startDate?: Dayjs;
  endDate?: Dayjs;
  onDismiss?: () => void;
  onApply: (startDate?: Dayjs, endDate?: Dayjs) => void;
}
