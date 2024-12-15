import {
  CustomDayProps,
  CustomPickerDayViewProps,
  SelectedDayBackgroundProps,
} from "./types";
import { styled } from "@mui/material/styles";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import dayjs from "dayjs";

import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export const DateRangePickerDay = (props: CustomDayProps) => {
  const { day, startDate, endDate, hoveredDay, ...other } = props;

  const isStartOfMonth = day.date() === 1;
  const isEndOfMonth = day.date() === day.daysInMonth();
  const isFirstDayOfWeek = day.day() === 0;
  const isLastDayOfWeek = day.day() === 6;
  const isDaySameAsStart = startDate && day.isSame(startDate, "date");
  const isDaySameAsEnd = endDate && day.isSame(endDate, "date");
  const isDaySameAsHoveredDay = hoveredDay && day.isSame(hoveredDay, "date");
  const isDayNotBeforeStartDay = startDate && !day.isBefore(startDate, "date");
  const isHoveredDayNotBeforeStartDay =
    hoveredDay && !hoveredDay.isBefore(startDate, "date");
  const isHoveredDayLimitPoint =
    !endDate &&
    hoveredDay &&
    day.isSame(hoveredDay, "date") &&
    (startDate ? isDayNotBeforeStartDay : true);

  let endPoint = null;
  if (startDate) {
    endPoint = endDate || (isHoveredDayNotBeforeStartDay ? hoveredDay : null);
  }

  const isRangeLimitPoint =
    isDaySameAsStart || isHoveredDayLimitPoint || isDaySameAsEnd;
  const isInBetweenPoint =
    startDate != null &&
    endPoint != null &&
    day.isBetween(startDate, endPoint, null, "()") &&
    !isRangeLimitPoint;

  let hasAdditionalBackground = false;
  let circleCornersLeft = false;
  let circleCornersRight = false;
  if (isRangeLimitPoint) {
    hasAdditionalBackground = !other.outsideCurrentMonth;
    if (isDaySameAsStart) {
      hasAdditionalBackground &&=
        !isLastDayOfWeek && !isEndOfMonth && (!!endDate || !!hoveredDay);
    } else if (isDaySameAsEnd) {
      hasAdditionalBackground &&= !isFirstDayOfWeek && !isStartOfMonth;
    } else if (isDaySameAsHoveredDay && startDate) {
      hasAdditionalBackground &&= !isFirstDayOfWeek && !isStartOfMonth;
    }
    circleCornersLeft = startDate
      ? !!isDaySameAsStart
      : !!isHoveredDayLimitPoint;
    circleCornersRight = !!(isDaySameAsEnd || isHoveredDayLimitPoint);
  }

  return (
    <RangePointAdditionalBackground
      hasBackground={hasAdditionalBackground}
      circleCornersLeft={circleCornersLeft}
      circleCornersRight={circleCornersRight}
    >
      <CustomPickersDay
        {...other}
        day={day}
        sx={{ px: 2.5, py: 2.5 }}
        disableMargin
        selected={false}
        isRangeLimitPoint={!!isRangeLimitPoint}
        isInBetweenPoint={isInBetweenPoint}
        isStartOfMonth={isStartOfMonth}
        isEndOfMonth={isEndOfMonth}
        isFirstDayOfWeek={isFirstDayOfWeek}
        isLastDayOfWeek={isLastDayOfWeek}
      />
    </RangePointAdditionalBackground>
  );
};

const RangePointAdditionalBackground = styled(
  "div"
)<SelectedDayBackgroundProps>(
  ({ hasBackground, circleCornersLeft, circleCornersRight }) => ({
    ...(hasBackground && {
      backgroundColor: "#EEECFF80",
    }),
    ...(circleCornersLeft && {
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
    }),
    ...(circleCornersRight && {
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    }),
  })
);

const CustomPickersDay = styled(PickersDay)<CustomPickerDayViewProps>(
  ({
    theme,
    isRangeLimitPoint,
    isInBetweenPoint,
    isStartOfMonth,
    isEndOfMonth,
    isFirstDayOfWeek,
    isLastDayOfWeek,
  }) => ({
    transition: "none !important",
    borderRadius: 0,
    backgroundColor: "transparent",
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: "14px",
    color: "#483375",
    ...(isInBetweenPoint && {
      backgroundColor: "#EEECFF80",
    }),
    ...((isFirstDayOfWeek || isStartOfMonth) &&
      isInBetweenPoint && {
        borderTopLeftRadius: "25%",
        borderBottomLeftRadius: "25%",
      }),
    ...((isLastDayOfWeek || isEndOfMonth) &&
      isInBetweenPoint && {
        borderTopRightRadius: "25%",
        borderBottomRightRadius: "25%",
      }),
    ...(isRangeLimitPoint && {
      fontWeight: theme.typography.fontWeightBold,
      backgroundColor: "#6160B0",
      color: theme.palette.primary.contrastText,
      borderRadius: "50%",
      "&:hover, &:focus": {
        backgroundColor: "#6160B0",
        borderRadius: "50%",
      },
    }),
  })
) as React.ComponentType<CustomPickerDayViewProps>;
