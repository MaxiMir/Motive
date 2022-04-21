import { Box, Button, ButtonProps, useTheme } from '@mui/material'

type AppGradientButtonProps = Omit<ButtonProps, 'variant' | 'color' | 'className'>

export default function AppGradientButton(props: AppGradientButtonProps) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        padding: '1px',
        background: `linear-gradient(to top left, ${theme.palette.creativity.dark}, ${theme.palette.support.dark})`,
        borderRadius: '5px',
      }}
    >
      <Button
        variant="text"
        color="primary"
        size="small"
        sx={{
          minWidth: '120px',
          textTransform: 'none',
          background: theme.palette.background.default,
          '&:disabled': {
            color: theme.palette.secondary.dark,
          },
        }}
        {...props}
      />
    </Box>
  )
}
