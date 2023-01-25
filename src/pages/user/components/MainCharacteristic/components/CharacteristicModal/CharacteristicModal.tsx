import { Box, Typography } from '@mui/material'
import { MainCharacteristicName } from '@shared/api/characteristic'
import Modal from '@shared/ui/Modal'
import ListItem from './components/ListItem'
import Progress from './components/Progress'
import { useMessages } from './hooks/useMessages'

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