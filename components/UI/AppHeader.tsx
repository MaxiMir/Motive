import { FC } from 'react'
import { Typography } from '@material-ui/core'
import AppEmoji, { AppEmojiName } from 'components/UI/AppEmoji'
import AppBox from './AppBox'

interface AppHeaderProps {
  name: AppEmojiName
  mb?: number
}

const AppHeader: FC<AppHeaderProps> = ({ name, mb, children }) => (
  <AppBox alignItems="center" spacing={1} mb={mb}>
    <AppEmoji name={name} variant="h4" />
    <Typography variant="h4" component="h1">
      {children}
    </Typography>
  </AppBox>
)

export default AppHeader
