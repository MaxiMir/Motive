import { FC } from 'react'
import { Button, ButtonProps, useTheme } from '@mui/material'
import AppBox from './AppBox'

type AppGradientButtonProps = Omit<ButtonProps, 'variant' | 'color' | 'className'>

const AppGradientButton: FC<AppGradientButtonProps> = (props) => {
  const theme = useTheme()

  return (
    <AppBox
      display={undefined}
      sx={{
        padding: '1px',
        background: `linear-gradient(to top left, ${theme.characteristic.creativity.dark}, ${theme.characteristic.support.dark})`,
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
    </AppBox>
  )
}

export default AppGradientButton
