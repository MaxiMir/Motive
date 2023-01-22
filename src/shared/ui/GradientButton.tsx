import { Box, Button, ButtonProps } from '@mui/material'

type GradientButtonProps = Omit<ButtonProps, 'variant' | 'color' | 'sx' | 'className'>

function GradientButton({ disabled, ...props }: GradientButtonProps) {
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

export default GradientButton
