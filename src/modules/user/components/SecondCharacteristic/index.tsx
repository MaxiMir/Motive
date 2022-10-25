import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Box, Button, Typography } from '@mui/material'
import { SecondCharacteristicName, UserDetailDto } from 'src/common/dto'
import { numberToShort } from 'src/common/helpers/prepare'

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
  const buttonText = formatMessage({ id: `common.${name}` }).toUpperCase()
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
      <Button
        sx={{
          color: 'white',
          textTransform: 'none',
          justifyContent: 'center',
          padding: 1,
        }}
        onClick={onClick}
      >
        <Box display="flex" justifyContent="flex-start" flexDirection="column">
          <Typography variant="h5" component="p" sx={{ fontWeight: 'bold' }}>
            {shortValue}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.625rem',
            }}
          >
            {buttonText}
          </Typography>
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
