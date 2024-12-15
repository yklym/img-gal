import { useCallback } from "react";

import { CustomPickersCalendarHeaderProps } from "./types";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const DateCalendarHeader = ({
  currentMonth,
  onMonthChange,
  onMonthHasBeenChanged,
  calendarLocation,
}: CustomPickersCalendarHeaderProps) => {
  const onPrevMonth = useCallback(() => {
    const nextValue = currentMonth.subtract(1, "month");
    onMonthChange(nextValue, "left");
    onMonthHasBeenChanged(nextValue, calendarLocation);
  }, [onMonthChange]);

  const onNextMonth = useCallback(() => {
    const nextValue = currentMonth.add(1, "month");
    onMonthChange(nextValue, "right");
    onMonthHasBeenChanged(nextValue, calendarLocation);
  }, [onMonthChange]);

  return (
    <Stack direction="column">
      <CustomCalendarHeaderRoot>
        <IconButton onClick={onPrevMonth}>
          <ChevronLeft />
        </IconButton>

        <StyledTitle>{currentMonth.format("MMMM YYYY")}</StyledTitle>

        <IconButton onClick={onNextMonth}>
          <ChevronRight />
        </IconButton>
      </CustomCalendarHeaderRoot>
      <StyledDivider sx={{ borderColor: "primary.border_color" }} />
    </Stack>
  );
};

const CustomCalendarHeaderRoot = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 16px",
  alignItems: "center",
});

const StyledDivider = styled(Divider)({
  margin: "-1px 32px 0",
});

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.primary.main,
  lineHeight: 1.5,
}));
