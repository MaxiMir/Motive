import { FC } from 'react'
import { Box, Button, ButtonProps, useTheme } from '@mui/material'

type AppGradientButtonProps = Omit<ButtonProps, 'variant' | 'color' | 'className'>

const AppGradientButton: FC<AppGradientButtonProps> = (props) => {
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

export default AppGradientButton
