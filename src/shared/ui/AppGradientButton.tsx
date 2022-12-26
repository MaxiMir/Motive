import { Box, Button, ButtonProps } from '@mui/material'

type AppGradientButtonProps = Omit<ButtonProps, 'variant' | 'color' | 'sx' | 'className'>

function AppGradientButton({ disabled, ...props }: AppGradientButtonProps) {
  return (
    <Box
      sx={(theme) => ({
        padding: '1px',
        background: `linear-gradient(to top left, ${theme.palette.creativity.dark}, ${theme.palette.support.dark})`,
        borderRadius: '5px',
        opacity: disabled ? 0.7 : undefined,
      })}
    >
      <Button
        variant="text"
        color="primary"
        disabled={disabled}
        sx={(theme) => ({
          minWidth: '120px',
          textTransform: 'none',
          background: theme.palette.background.default,
        })}
        {...props}
      />
    </Box>
  )
}

export default AppGradientButton
