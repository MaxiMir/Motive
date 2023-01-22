import { Box, Typography } from '@mui/material'
import { MainCharacteristicName } from '@features/characteristic'
import Modal from '@ui/Modal'
import { useMessages } from './hooks/useMessages'
import Progress from './components/Progress'
import ListItem from './components/ListItem'

interface CharacteristicModalProps {
  name: MainCharacteristicName
  value: number
  onClose: () => void
}

function CharacteristicModal({ name, value, onClose }: CharacteristicModalProps) {
  const messages = useMessages(name)
  const list = [...(!messages.completion ? [] : [messages.completion]), messages.points]

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
      {list.map((element) => (
        <ListItem name={element} key={element} />
      ))}
    </Modal>
  )
}

export default CharacteristicModal
