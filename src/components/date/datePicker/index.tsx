import { FC, forwardRef } from "react";

import { Dayjs } from "dayjs";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  IconButton,
  IconButtonProps,
  Stack,
  styled,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
  DateValidationError,
  DateView,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ReactComponent as CalendarIcon } from "@/assets/icons/calendar.svg";
import { DATE_FORMATS } from "../../selectRangeDatePicker/common";
import { dayOfWeekFormatter } from "../utils";
import { DateCalendarHeader } from "../components/dateCalendarHeader";

interface DatePickerProps {
  value?: Dayjs | null;
  defaultValue?: Dayjs;
  disablePast?: boolean;
  onChange: (
    value: Dayjs,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => void;
  label?: string;
  disableHighlightToday?: boolean;
  errorMsg?: string;
  headerWithDropdown?: boolean;
  labelSx?: TypographyProps["sx"];
  onBlur?: () => void;
  error?: boolean;
  views?: DateView[];
  format?: (typeof DATE_FORMATS)[keyof typeof DATE_FORMATS];
  sx?: MuiDatePickerProps<Dayjs>["sx"];
  minDate?: Dayjs;
  placeholder?: string;
}

const OpenPickerIcon: FC<IconButtonProps> = (props) => (
  <IconButton {...props}>
    <CalendarIcon />
  </IconButton>
);

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      defaultValue,
      disablePast,
      onChange,
      label,
      disableHighlightToday,
      errorMsg,
      headerWithDropdown,
      labelSx,
      error,
      views,
      format = DATE_FORMATS.MONTH_DAY_YEAR_SLASH,
      sx,
      minDate,
      placeholder,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    const weekLabelStyles = {
      ".MuiDayCalendar-weekDayLabel": {
        fontWeight: 800,
        fontSize: "12px",
        color: theme.palette.primary.main,
      },
    };

    return (
      <Stack sx={{ gap: 1.5 }}>
        {label && (
          <Typography
            sx={{
              fontSize: "12px",
              lineHeight: "100%",
              color: "primary.darkest",
              cursor: "default",
              ...labelSx,
            }}
          >
            {label}
          </Typography>
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledDatePicker
            ref={ref}
            className="DatePicker"
            disablePast={disablePast}
            defaultValue={defaultValue}
            minDate={minDate}
            onChange={onChange as any}
            format={format}
            disableHighlightToday={disableHighlightToday}
            dayOfWeekFormatter={dayOfWeekFormatter}
            views={views}
            sx={{
              "& .MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
                borderColor: error
                  ? theme.palette.error.main
                  : "rgba(0, 0, 0, 0.23)",
              },
              "&:hover .MuiInputBase-root:not(.Mui-focused) .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: error
                    ? theme.palette.error.main
                    : "rgba(0, 0, 0, 0.74) !important",
                },
              ...sx,
            }}
            slots={{
              openPickerButton: OpenPickerIcon,
              calendarHeader: !headerWithDropdown
                ? (DateCalendarHeader as any)
                : undefined,
              switchViewIcon: KeyboardArrowDown,
            }}
            slotProps={{
              popper: { placement: "bottom-end" },
              textField: {
                onBlur: () => props.onBlur?.(),
                placeholder,
              },
              desktopPaper: {
                sx: {
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: "10px",
                  boxShadow: "0px 16px 24px rgba(55, 55, 55, 0.08)",
                  marginTop: "4px",
                  transformOrigin: "top right",
                  ...weekLabelStyles,
                },
              },
              mobilePaper: {
                sx: {
                  ".MuiPickersToolbar-root": {
                    display: "none",
                  },
                  ...weekLabelStyles,
                },
              },
              day: {
                sx: {
                  "&": { fontSize: "14px" },
                  "&.Mui-selected": {
                    backgroundColor: `${theme.palette.primary.main} !important`,
                  },
                  "&.MuiPickersDay-today": {
                    borderColor: `${theme.palette.primary.main} !important`,
                  },
                  "&:hover:not(.Mui-selected), &:focus:not(.Mui-selected)": {
                    backgroundColor: `${theme.palette.primary.light} !important`,
                  },
                },
              },
              yearButton: {
                sx: {
                  borderRadius: "10px",
                  fontSize: "14px",
                  m: "4px 0",

                  "&.Mui-selected": {
                    backgroundColor: `${theme.palette.primary.dark} !important`,
                    color: theme.palette.common.white,
                  },
                  "&:hover:not(.Mui-selected), &:focus:not(.Mui-selected)": {
                    backgroundColor: `${theme.palette.primary.light} !important`,
                  },
                },
              },
              monthButton: {
                sx: {
                  borderRadius: "10px",
                  fontSize: "14px",
                  m: "4px 0",

                  "&.Mui-selected": {
                    backgroundColor: `${theme.palette.primary.dark} !important`,
                    color: theme.palette.common.white,
                  },
                  "&:hover:not(.Mui-selected), &:focus:not(.Mui-selected)": {
                    backgroundColor: `${theme.palette.primary.light} !important`,
                  },
                },
              },
              calendarHeader: {
                sx: {
                  m: 0,
                  maxHeight: "56px",
                  minHeight: "56px",
                  position: "relative",
                  py: 1,

                  "&:after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 24,
                    right: 24,
                    height: "1px",
                    backgroundColor: theme.palette.primary.main,
                  },

                  "& .MuiPickersCalendarHeader-labelContainer": {
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                  },
                },
              },
            }}
            {...props}
          />
        </LocalizationProvider>

        {errorMsg && (
          <Typography
            sx={{ lineHeight: 1.66 }}
            mt={0.5}
            fontSize={12}
            pl={1.75}
            color={theme.palette.error.main}
          >
            {errorMsg}
          </Typography>
        )}
      </Stack>
    );
  }
);

DatePicker.displayName = "DatePicker";

const StyledDatePicker = styled(MuiDatePicker)(({ theme }) => ({
  ".MuiInputBase-root": {
    borderRadius: "10px",
    padding: 0,
    width: "100%",
  },
  ".MuiInputBase-input": {
    height: "44px",
    boxSizing: "border-box",
    padding: "10px 20px 10px 20px",
    fontSize: "14px",
  },
  ".MuiInputAdornment-root .MuiButtonBase-root": {
    marginRight: 12,
  },
  ".Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: `gray !important`,
  },
}));
