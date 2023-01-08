import { Box, Typography } from '@mui/material'
import { MainCharacteristicName } from '@features/characteristic'
import AppModal from '@ui/AppModal'
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
    <AppModal
      title={
        <Box component="span" sx={{ color: `${name}.main` }}>
          {messages.title}
        </Box>
      }
      maxWidth="xs"
      onClose={onClose}
    >
      <Progress characteristic={name} value={value} />
      <Box mt={2}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            color: `${name}.light`,
            mb: 1,
          }}
        >
          {messages.header}:
        </Typography>
        {list.map((element) => (
          <ListItem name={element} key={element} />
        ))}
      </Box>
    </AppModal>
  )
}

export default CharacteristicModal