import { Button } from "@mui/material";
import { DateRangePickerFooterProps } from "./types";
import { formatDate } from "./utils";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const DateRangePickerFooter = ({
  startDate,
  endDate,
  onDismiss,
  onApply,
}: DateRangePickerFooterProps) => {
  const rangeText =
    !startDate || !endDate
      ? ""
      : `${formatDate(startDate)} - ${formatDate(endDate)}`;

  return (
    <Stack direction="row" justifyContent="end" alignItems="center" spacing={1}>
      <RangeText>{rangeText}</RangeText>
      <Button onClick={onDismiss} variant="outlined" sx={{ height: "36px" }}>
        Cancel
      </Button>

      <Button
        onClick={() => onApply(startDate, endDate)}
        sx={{ height: "36px" }}
      >
        Apply
      </Button>
    </Stack>
  );
};

const RangeText = styled(Typography)(({ theme }) => ({
  color: "#8C80A9",
  fontSize: "12.5px",
  fontWeight: theme.typography.fontWeightMedium,
  padding: "0 8px",
}));
