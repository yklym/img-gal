import { FC, ReactNode } from 'react';

import { alpha, Stack, StackProps, Typography } from '@mui/material';

interface BadgeLabelProps {
  label: string;
  endIcon?: ReactNode;
  color: string;
  sx?: StackProps['sx'];
  bgColor?: string;
  onClick?: () => void;
}

// TODO: if needed rewrite to variants with predefined colors
export const Badge: FC<BadgeLabelProps> = ({ label, color, sx, bgColor, onClick, endIcon }) => (
  <Stack
    direction="row"
    onClick={onClick}
    sx={{
      gap: 0.5,
      minHeight: '26px',
      p: '5px 10px',
      borderRadius: '35px',
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: bgColor || alpha(color, 0.1),
      maxWidth: 'max-content',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.15s',

      // making bg on hover alpha 0.2 if onClick is defined,
      '&:hover': onClick
        ? {
            backgroundColor: alpha(color, 0.15)
          }
        : {},

      ...sx
    }}
    data-testid="status-badge"
    data-test-patient-status={label}
  >
    <Typography
      sx={{
        fontWeight: 500,
        whiteSpace: 'nowrap',
        fontSize: '0.75rem',
        lineHeight: 1,
        color
      }}
    >
      {label}
    </Typography>

    {endIcon}
  </Stack>
);
