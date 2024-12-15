import { Dayjs } from "dayjs";
import { DATE_FORMATS } from "../../../../selectRangeDatePicker/common";

export const formatDate = (date: Dayjs) =>
  date.format(DATE_FORMATS.MONTH_DAY_YEAR_SLASH);
