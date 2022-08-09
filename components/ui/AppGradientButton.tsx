import { Box, Button, ButtonProps, useTheme } from '@mui/material'

type AppGradientButtonProps = Omit<ButtonProps, 'variant' | 'color' | 'sx' | 'className'>

export default function AppGradientButton({ disabled, ...props }: AppGradientButtonProps) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        padding: '1px',
        background: `linear-gradient(to top left, ${theme.palette.creativity.dark}, ${theme.palette.support.dark})`,
        borderRadius: '5px',
        opacity: disabled ? 0.7 : undefined,
      }}
    >
      <Button
        variant="text"
        color="primary"
        size="small"
        disabled={disabled}
        sx={{
          minWidth: '120px',
          textTransform: 'none',
          background: theme.palette.background.default,
        }}
        {...props}
      />
    </Box>
  )
}
