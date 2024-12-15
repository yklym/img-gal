import { FC, HTMLAttributes, useState } from "react";

import { combinedTheme, ThemeType } from "./theme";
import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  Select as MuiSelect,
  Snackbar,
  Stack,
  Typography,
  InputLabel,
} from "@mui/material";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import AngleDownIcon from "@mui/icons-material/ArrowDropDown";

import { MenuListWithScrollbar } from "./customSelect";
import { SelectChangeEvent } from "@mui/material/Select";

export interface SelectOption {
  id: string;
  name: string;
  hidden?: boolean;
}

interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  options: SelectOption[];
  selectedOptions: string[];
  placeholder?: string;
  type?: ThemeType;
  radio?: boolean;
  multiple?: boolean;
  // render as input value, only visual effect
  displayValue?: string | null;
  onItemsChange: (items: string[]) => void;
  maxHeight?: string;
  label?: string;
}

const Select: FC<SelectProps> = ({
  options,
  selectedOptions = [],
  placeholder,
  type = "datePicker",
  radio,
  displayValue = null,
  multiple = true,
  onItemsChange,
  color = {},
  label,
}) => {
  const theme = useTheme();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const Component = radio ? Radio : (props: any) => <Checkbox {...props} />;

  const handleSetItems = (values: string[]) => {
    if (
      type === "datePicker" &&
      values.length === 0 &&
      selectedOptions.length === 1
    ) {
      setOpenSnackbar(true);
      return;
    }
    onItemsChange(values);

    return values;
  };

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const newValue = typeof value === "string" ? value.split(",") : value;

    const newItems = handleSetItems(newValue);
    onItemsChange?.(newItems ?? []);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={combinedTheme(theme, !!selectedOptions.length, type)}>
      <Stack sx={{ gap: 1.5 }}>
        {label && (
          <Typography
            sx={{
              fontSize: "12px",
              lineHeight: "100%",
              cursor: "default",
            }}
          >
            {label}
          </Typography>
        )}

        <FormControl size="small" sx={{ width: "auto" }}>
          <InputLabel id="Date-select">Date</InputLabel>

          <MuiSelect
            id="Date-select"
            displayEmpty
            // multiple={multiple}
            value={
              multiple ? selectedOptions : selectedOptions?.[0] || ("" as any)
            }
            onChange={handleChange}
            sx={{
              borderRadius: "5px",
            }}
            IconComponent={AngleDownIcon}
            input={<OutlinedInput label="Date" notched />}
            renderValue={(selected) => {
              if (typeof displayValue === "string") {
                return displayValue;
              }

              if ((selected.length === 0 && placeholder) || type === "filter") {
                return (
                  <Typography
                    sx={{
                      fontSize: "inherit",
                    }}
                  >
                    {placeholder}
                  </Typography>
                );
              }

              if (multiple) {
                return options
                  .filter(({ id }) => selected.indexOf(id) > -1)
                  .map(({ name }) => name)
                  .join(", ");
              }

              return options.find(({ id }) => selected.toString() === id)?.name;
            }}
          >
            {options
              .filter((o) => !o.hidden)
              .map(({ id, name }) => (
                <MenuItem
                  key={`menuitem-${id}`}
                  sx={{
                    py: 0,
                    whiteSpace: "normal",
                    // FIXME: do we need it?
                    // width: options.length > 20 ? '50%' : 'auto',
                    // maxWidth: options.length > 20 ? '100px' : 'auto',
                    // borderRadius: options.length > 20 ? '8px' : 0,
                  }}
                  value={id}
                >
                  <Component
                    checked={selectedOptions.indexOf(id) > -1}
                    disableRipple
                  />

                  <ListItemText
                    primary={name}
                    sx={{
                      span: {
                        fontSize: "14px",
                      },
                    }}
                  />
                </MenuItem>
              ))}
          </MuiSelect>
        </FormControl>
      </Stack>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="You must select at least one option."
      />
    </ThemeProvider>
  );
};

export default Select;
