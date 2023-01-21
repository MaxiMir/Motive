import { Box, Button, ButtonProps } from '@mui/material'

type AppGradientButtonProps = Omit<ButtonProps, 'variant' | 'color' | 'sx' | 'className'>

function AppGradientButton({ disabled, ...props }: AppGradientButtonProps) {
  return (
    <Box
      padding="1px"
      borderRadius="5px"
      sx={({ palette }) => ({
        background: `linear-gradient(to top left, ${palette.creativity.dark}, ${palette.support.dark})`,
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
