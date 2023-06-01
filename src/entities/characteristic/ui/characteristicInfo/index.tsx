import { Box, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { MainCharacteristicName } from 'shared/api'
import Modal from 'shared/ui/Modal'
import { Progress } from './progress'

interface CharacteristicInfoProps {
  name: MainCharacteristicName
  value: number
  onClose: () => void
}

export function CharacteristicInfo({ name, value, onClose }: CharacteristicInfoProps) {
  const { formatMessage } = useIntl()
  const isMotivation = name === MainCharacteristicName.Motivation
  const title = formatMessage({ id: `common.${name}` })
  const header = formatMessage({ id: `page.user.modal-characteristic.${name}.header` })
  const points = formatMessage({ id: `page.user.modal-characteristic.${name}.points` })
  const completion = isMotivation && formatMessage({ id: 'common.goal-completion' })
  const texts = [...(!completion ? [] : [completion]), points]

  return (
    <Modal title={title} maxWidth="xs" onClose={onClose}>
      <Progress characteristic={name} value={value} mb={2} />
      <Typography variant="h6" component="h3" sx={{ color: `${name}.light` }}>
        {header}:
      </Typography>
      {texts.map((text) => (
        <Box paddingY="4px" key={text}>
          <Typography>💈 {text}</Typography>
        </Box>
      ))}
    </Modal>
  )
}
