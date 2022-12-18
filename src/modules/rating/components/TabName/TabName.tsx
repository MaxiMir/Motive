import { Box, Typography } from '@mui/material'
import { MainCharacteristicName } from '@features/characteristic'
import AppEmoji, { AppEmojiName } from '@ui/AppEmoji'
import { useMessages } from './hooks/useMessages'

interface TabNameProps {
  name: MainCharacteristicName
  emoji: AppEmojiName
}

function TabName({ name, emoji }: TabNameProps) {
  const messages = useMessages(name)

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <AppEmoji name={emoji} variant="h6" />
      <Typography
        sx={(theme) => ({
          textTransform: 'none',
          [theme.breakpoints.only('xs')]: {
            fontSize: '0.75rem',
          },
        })}
      >
        {messages.tabText}
      </Typography>
    </Box>
  )
}

export default TabName
