import { useIntl } from 'react-intl'
import { Box, Typography } from '@mui/material'
import { MainCharacteristicName } from '@dto'
import AppModal from '@ui/AppModal'
import Progress from './components/Progress'
import ListItem from './components/ListItem'

interface ModalCharacteristicProps {
  name: MainCharacteristicName
  value: number
  onClose: () => void
}

export default function ModalCharacteristic({ name, value, onClose }: ModalCharacteristicProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: `common.${name}` })
  const header = formatMessage({ id: `page.user.modal-characteristic.${name}.header` })
  const points = formatMessage({ id: `page.user.modal-characteristic.${name}.points` })
  const goalPoints = name === MainCharacteristicName.Motivation && formatMessage({ id: 'common.goal-completion' })
  const list = [...(!goalPoints ? [] : [goalPoints]), points]

  return (
    <AppModal
      title={
        <Box component="span" sx={{ color: `${name}.main` }}>
          {title}
        </Box>
      }
      maxWidth="xs"
      onClose={onClose}
    >
      <Progress characteristic={name} value={value} />
      <Box mt={2}>
        <Typography variant="h6" component="h3" sx={{ color: `${name}.light`, mb: 1 }}>
          {header}:
        </Typography>
        {list.map((element) => (
          <ListItem name={element} key={element} />
        ))}
      </Box>
    </AppModal>
  )
}
