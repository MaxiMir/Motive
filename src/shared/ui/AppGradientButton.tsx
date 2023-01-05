import { Box, Button, ButtonProps } from '@mui/material'

type AppGradientButtonProps = Omit<ButtonProps, 'variant' | 'color' | 'sx' | 'className'>

function AppGradientButton({ disabled, ...props }: AppGradientButtonProps) {
  return (
    <Box
      sx={({ palette }) => ({
        padding: '1px',
        background: `linear-gradient(to top left, ${palette.creativity.dark}, ${palette.support.dark})`,
        borderRadius: '5px',
        opacity: disabled ? 0.7 : undefined,
      })}
    >
      <Button
        variant="text"
        color="primary"
        disabled={disabled}
        sx={({ palette }) => ({
          minWidth: '120px',
          background: palette.background.default,
        })}
        {...props}
      />
    </Box>
  )
}

export default AppGradientButton
