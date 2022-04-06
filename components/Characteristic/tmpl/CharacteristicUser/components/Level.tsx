import { useTheme } from '@mui/material'
import AppBox from 'components/UI/AppBox'

export default function Level(): JSX.Element {
  const theme = useTheme()

  return (
    <AppBox
      component="sup"
      display={undefined}
      sx={{ marginLeft: '2px', fontSize: '0.625rem', color: theme.palette.text.disabled }}
    >
      lvl
    </AppBox>
  )
}
