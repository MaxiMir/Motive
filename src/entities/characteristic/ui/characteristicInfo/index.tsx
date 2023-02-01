import { Box, Typography } from '@mui/material'
import { MainCharacteristicName } from 'shared/api'
import Modal from 'shared/ui/Modal'
import { useMessages } from './lib'
import { Progress } from './progress'

interface CharacteristicInfoProps {
  name: MainCharacteristicName
  value: number
  onClose: () => void
}

export function CharacteristicInfo({ name, value, onClose }: CharacteristicInfoProps) {
  const messages = useMessages(name)
  const texts = [...(!messages.completion ? [] : [messages.completion]), messages.points]

  return (
    <Modal
      title={
        <Box component="span" color={`${name}.main`}>
          {messages.title}
        </Box>
      }
      maxWidth="xs"
      onClose={onClose}
    >
      <Progress characteristic={name} value={value} mb={2} />
      <Typography variant="h6" component="h3" sx={{ color: `${name}.light` }}>
        {messages.header}:
      </Typography>
      {texts.map((text) => (
        <Box paddingY="4px" key={text}>
          <Typography>💈 {text}</Typography>
        </Box>
      ))}
    </Modal>
  )
}
