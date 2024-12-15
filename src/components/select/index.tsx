import { FC, HTMLAttributes, useState } from "react";

import { combinedTheme, ThemeType } from "./theme";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  Select as MuiSelect,
  SelectChangeEvent,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Badge } from "../badge";
import AngleDownIcon from "@mui/icons-material/ArrowDropDown";

import { MenuListWithScrollbar } from "./customSelect";

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

  const handleDelete = (itemId: string | number) => {
    if (type !== "filter") return;
    const values = selectedOptions.filter((id) => id !== itemId);
    onItemsChange(values);
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
          <MuiSelect
            displayEmpty
            // multiple={multiple}
            value={
              multiple ? selectedOptions : selectedOptions?.[0] || ("" as any)
            }
            onChange={handleChange}
            sx={{
              borderRadius: "34px",

              "& .MuiSelect-icon": {
                right: "20px",
                transition: "transform 0.15s",

                "&.MuiSelect-iconOpen": {
                  transform: "rotateX(180deg)",
                },
              },

              '& .MuiSelect-nativeInput:not([value=""]) + svg': {},

              ".MuiSelect-select": {
                boxSizing: "border-box",
                minHeight: theme.spacing(5),
                pl: "20px",
                pr: "52px !important",
                display: "flex",
                alignItems: "center",
                fontWeight: 400,
              },

              "& .MuiOutlinedInput-notchedOutline": {
                transition: "all 0.15s",
              },

              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "lightgrey !important",
              },
            }}
            IconComponent={AngleDownIcon}
            MenuProps={{
              MenuListProps: {
                component: MenuListWithScrollbar,
                sx: {
                  py: 0,
                },
              },
              slotProps: {
                paper: {
                  sx: {
                    borderRadius: "16px",
                    my: 1,
                  },
                },
              },
            }}
            input={<OutlinedInput notched />}
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
                    sx={{
                      height: "40px",
                      width: "40px",
                      span: { color: theme.palette.primary.main },
                    }}
                  />

                  <ListItemText
                    primary={name}
                    sx={{
                      span: {
                        fontSize: "14px",
                        color: theme.palette.primary.main,
                      },
                    }}
                  />
                </MenuItem>
              ))}
          </MuiSelect>
        </FormControl>

        {type === "filter" && !!selectedOptions.length && (
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mt: -0.5 }}>
            {selectedOptions.map((itemId) => {
              const itemLabel = options.find(({ id }) => id === itemId)?.name;

              return itemLabel ? (
                <Badge
                  onClick={() => handleDelete(itemId)}
                  label={itemLabel}
                  color={theme.palette.primary.main}
                  key={`chip-${itemId}`}
                  endIcon={
                    <CloseRoundedIcon
                      fontSize="small"
                      sx={{
                        width: "10px",
                        height: "10px",
                      }}
                    />
                  }
                />
              ) : null;
            })}
          </Stack>
        )}
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
