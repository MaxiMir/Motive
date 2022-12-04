import { Box, Button, ButtonProps } from '@mui/material'

type AppGradientButtonProps = Omit<ButtonProps, 'variant' | 'color' | 'sx' | 'className'>

function AppGradientButton({ disabled, ...props }: AppGradientButtonProps) {
  return (
    <Box
      sx={(theme) => ({
        padding: '0.063rem',
        background: `linear-gradient(to top left, ${theme.palette.creativity.dark}, ${theme.palette.support.dark})`,
        borderRadius: '0.313rem',
        opacity: disabled ? 0.7 : undefined,
      })}
    >
      <Button
        variant="text"
        color="primary"
        size="small"
        disabled={disabled}
        sx={(theme) => ({
          minWidth: '7.5rem',
          textTransform: 'none',
          background: theme.palette.background.default,
        })}
        {...props}
      />
    </Box>
  )
}

export default AppGradientButton
