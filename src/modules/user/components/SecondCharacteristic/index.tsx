import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Box, Button, Typography } from '@mui/material'
import { SecondCharacteristicName, UserDetailDto } from '@dto'
import { numberToShort } from '@helpers/prepare'

const ModalSubscription = dynamic(() => import('./components/ModalSubscription'))
const ModalCompleted = dynamic(() => import('./components/ModalCompleted'))
const ModalAbandoned = dynamic(() => import('./components/ModalAbandoned'))

interface CharacteristicProps {
  user: UserDetailDto
  name: SecondCharacteristicName
  value: number
}

export default function SecondCharacteristic({ user, name, value }: CharacteristicProps) {
  const { formatMessage } = useIntl()
  const [modal, setModal] = useState<SecondCharacteristicName>()
  const buttonText = formatMessage({ id: `common.${name}-accusative` }).toLowerCase()
  const shortValue = numberToShort(value)

  const onClick = () => {
    switch (name) {
      case 'followers':
      case 'following':
      case 'completed':
      case 'abandoned':
        setModal(name)
    }
  }

  const onClose = () => setModal(undefined)

  return (
    <>
      <Button size="small" sx={{ color: 'white' }} onClick={onClick}>
        <Box display="flex" alignItems="baseline" gap={0.5}>
          <Typography>
            <b>{shortValue}</b>
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', textTransform: 'none' }}>{buttonText}</Typography>
        </Box>
      </Button>
      {modal === SecondCharacteristicName.Completed && <ModalCompleted user={user} onClose={onClose} />}
      {modal === SecondCharacteristicName.Abandoned && <ModalAbandoned user={user} onClose={onClose} />}
      {modal === SecondCharacteristicName.Followers && (
        <ModalSubscription user={user} name={SecondCharacteristicName.Followers} onClose={onClose} />
      )}
      {modal === SecondCharacteristicName.Following && (
        <ModalSubscription user={user} name={SecondCharacteristicName.Following} onClose={onClose} />
      )}
    </>
  )
}
