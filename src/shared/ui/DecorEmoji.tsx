import { Button } from '@mui/material'
import Emoji, { EmojiName } from './Emoji'

interface DecorEmojiProps {
  name: EmojiName
}

function DecorEmoji({ name }: DecorEmojiProps) {
  return (
    <Button
      sx={{
        width: 24,
        height: 24,
        minWidth: 'initial',
      }}
    >
      <Emoji name={name} onlyEmoji />
    </Button>
  )
}

export default DecorEmoji
