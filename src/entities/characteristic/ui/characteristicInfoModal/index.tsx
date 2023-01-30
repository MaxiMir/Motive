import { Box, Typography } from '@mui/material'
import { MainCharacteristicName } from 'shared/api'
import Modal from 'shared/ui/Modal'
import { useMessages } from './lib'
import { Progress } from './progress'
import { Row } from './row'

interface CharacteristicInfoModalProps {
  name: MainCharacteristicName
  value: number
  onClose: () => void
}

export function CharacteristicInfoModal({ name, value, onClose }: CharacteristicInfoModalProps) {
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
        <Row text={text} key={text} />
      ))}
    </Modal>
  )
}
