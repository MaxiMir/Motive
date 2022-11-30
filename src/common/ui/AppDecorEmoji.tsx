import { Button } from '@mui/material'
import AppEmoji, { AppEmojiName } from './AppEmoji'

interface AppDecorEmojiProps {
  name: AppEmojiName
}

function AppDecorEmoji({ name }: AppDecorEmojiProps) {
  return (
    <Button sx={{ width: 24, height: 24, minWidth: 'initial' }}>
      <AppEmoji name={name} onlyEmoji />
    </Button>
  )
}

export default AppDecorEmoji
