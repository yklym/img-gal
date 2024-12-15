import React from "react";

import {
  Box,
  Checkbox,
  Input,
  MenuItem,
  MenuItemProps,
  MenuList,
  MenuListProps,
  Select,
  SelectProps,
} from "@mui/material";

import AngleDownIcon from "@mui/icons-material/ArrowDropDown";

type OptionType = { value: string | number; label: string; disabled?: boolean };

interface CustomSelectProps<T>
  extends Omit<SelectProps<T>, "variant" | "inputProps"> {
  label?: string;
  options: OptionType[];
  errorMessage?: string;
  optionSx?: MenuItemProps["sx"];
  includeEmptyOption?: boolean;
  placeholder?: string;
  emptyPlaceholder?: string;
  variant?: "filled" | "outlined" | "standard";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const MenuListWithScrollbar = React.forwardRef<
  HTMLUListElement,
  MenuListProps
>(function MenuListWithScrollbar(props, ref) {
  return <MenuList {...props} ref={ref} />;
});

function CustomSelectComponent<T>(
  props: CustomSelectProps<T>,
  ref: React.Ref<unknown>
) {
  const {
    label,
    options,
    errorMessage,
    sx,
    optionSx,
    includeEmptyOption,
    placeholder,
    multiple,
    value,
    onChange,
    disabled,
    emptyPlaceholder,
    id,
    fullWidth = true,
    variant = "standard",
    ...restProps
  } = props;

  const isMultiple = multiple || false;

  const renderValue = (selected: unknown) => {
    if (
      (selected !== 0 && !selected) ||
      (Array.isArray(selected) && selected.length === 0)
    ) {
      return (
        <Box component="span" sx={{ opacity: 0.4 }}>
          {placeholder || ""}
        </Box>
      );
    }

    if (Array.isArray(selected)) {
      const selectedOptions = options?.filter((option) =>
        selected.includes(option.value)
      );
      return selectedOptions?.map((option) => option.label).join(", ");
    }

    const selectedOption = options?.find((option) => option.value === selected);
    return selectedOption ? selectedOption.label : "";
  };

  const menuItemStyles = {
    px: 2,
    fontSize: "14px",
    transition: "all 0.15s",
    fontWeight: 500,
    color: "primary.main_dark_80",

    "&:hover, &.Mui-focusVisible, &.Mui-selected:hover": {
      backgroundColor: "primary.soft_lavender",
    },

    "&.Mui-selected.Mui-focusVisible": {
      backgroundColor: "violet.light",
    },

    ...optionSx,
  };

  return (
    <Select
      variant={variant}
      input={
        <Input
          placeholder={label}
          error={!!errorMessage}
          fullWidth={fullWidth}
        />
      }
      displayEmpty
      sx={{
        "& .MuiSelect-select": {
          boxSizing: "border-box",
          padding: "10px 20px",
          paddingRight: "35px !important",
          lineHeight: "20px",

          "&:focus": {
            backgroundColor: "primary.white",
          },
        },
        "& .MuiPaper-root": {
          padding: "10px",
        },
        "& .MuiMenu-paper": {
          padding: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
        },
        "& .MuiSelect-icon": {
          right: "20px",
          transition: "transform 0.15s",

          "&.MuiSelect-iconOpen": {
            transform: "rotateX(180deg)",
          },
        },
        ...sx,
      }}
      IconComponent={AngleDownIcon}
      MenuProps={{
        MenuListProps: {
          component: MenuListWithScrollbar,
          sx: {
            py: 0,
          },
        },
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
        transformOrigin: { vertical: "top", horizontal: "center" },
        slotProps: {
          paper: {
            sx: {
              my: 1,
              borderRadius: "16px",
              border: "1px solid",
              backgroundColor: "#ffffff",
              borderColor: "primary.border_color",
              boxShadow: "0px 16px 32px rgba(129, 129, 129, 0.2)",
              backdropFilter: "blur(8px)",

              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",

              "& ul": {
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              },

              "& ul li:not(:last-child):after": {
                content: '""',
                display: "block",
                height: "1px",
                backgroundColor: "primary.border_color",
                width: "100%",
                position: "absolute",
                bottom: "-8.5px",
                left: 0,
                pointerEvents: "none",
              },
            },
          },
        },
      }}
      multiple={multiple}
      value={value}
      onChange={onChange}
      disabled={disabled}
      id={id}
      ref={ref}
      renderValue={renderValue}
      {...restProps}
    >
      {includeEmptyOption && (
        <MenuItem
          value=""
          sx={{
            ...menuItemStyles,
            "&.Mui-selected": {
              backgroundColor: "transparent",
            },
          }}
        >
          {emptyPlaceholder || placeholder || "-"}
        </MenuItem>
      )}

      {options?.map((option) => {
        const isChecked =
          isMultiple && Array.isArray(value)
            ? value.includes(option.value)
            : false;

        return (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            sx={{
              whiteSpace: "normal",
              ...menuItemStyles,
              "&.Mui-selected": {
                backgroundColor: "violet.light",
              },
            }}
          >
            {isMultiple ? (
              <>
                <Checkbox checked={isChecked} sx={{ mr: 1 }} />
                {option.label}
              </>
            ) : (
              option.label
            )}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default React.forwardRef(CustomSelectComponent) as <T>(
  p: React.PropsWithChildren<CustomSelectProps<T>> & {
    ref?: React.Ref<unknown>;
  }
) => React.ReactElement;
