import AddRoundedIcon from "@mui/icons-material/AddRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { createTheme, Theme } from "@mui/material";

export type ThemeType = "filter" | "datePicker";

export const combinedTheme = (
  theme: Theme,
  isSelected: boolean,
  type: ThemeType
) =>
  createTheme({
    components: {
      MuiSelect: {
        defaultProps: {
          IconComponent: (props) =>
            type === "filter" ? (
              <AddRoundedIcon
                sx={{
                  // fill: theme.palette.primary.main_dark_100,
                  width: "1rem",
                  transition: "transform 0.3s",
                }}
                {...props}
              />
            ) : (
              <KeyboardArrowDownRoundedIcon
                sx={{
                  // fill: theme.palette.primary.main_dark_50,
                  width: "2rem",
                  transition: "transform 0.3s",
                }}
                {...props}
              />
            ),
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "Pangram",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {},
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "lightgrey",
            },
          },
          input: {
            paddingRight: "40px !important",
          },
          notchedOutline: {
            border: "1px solid lightgrey",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontFamily: "Pangram",
            // '&:hover': {
            //   backgroundColor: 'white'
            // },
            "&.Mui-selected": {
              backgroundColor: "white",
              // '&:hover': {
              //   backgroundColor: 'white'
              // }
            },
            "&.Mui-selected.defaultSelected": {
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            margin: "8px 8px 0 0 !important",
            "&:focus, &:hover": {},
          },
          label: {
            fontFamily: "Pangram",
            fontSize: "11px",
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            margin: "0 !important",
          },
        },
      },
    },
  });
