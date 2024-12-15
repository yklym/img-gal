import { Dayjs } from "dayjs";
import { WEEK_DAY_FORMAT } from "./constants";

export const dayOfWeekFormatter = (dayOfWeek: Dayjs) =>
  dayOfWeek.format(WEEK_DAY_FORMAT);
