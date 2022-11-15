import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Box, Button, Typography } from '@mui/material'
import { SecondCharacteristicName, UserDetailDto } from '@dto'
import { numberToShort } from '@helpers/prepare'

const ModalSubscription = dynamic(() => import('./components/ModalSubscription'))
const ModalCompleted = dynamic(() => import('./components/ModalCompleted'))
const ModalAbandoned = dynamic(() => import('./components/ModalAbandoned'))

const { Completed, Abandoned, Followers, Following } = SecondCharacteristicName

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

  const onClick = () => setModal(name)

  const onClose = () => setModal(undefined)

  return (
    <>
      <Button size="small" sx={{ flex: 1 }} onClick={onClick}>
        <Box
          display="flex"
          sx={{
            color: 'white',
            gap: {
              md: 0.5,
            },
            alignItems: {
              xs: 'center',
              md: 'baseline',
            },
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
        >
          <Typography variant="h6" component="b">
            {shortValue}
          </Typography>
          <Typography
            sx={{
              textTransform: 'none',
              fontSize: {
                xs: '0.75rem',
                md: '0.8125rem',
              },
            }}
          >
            {buttonText}
          </Typography>
        </Box>
      </Button>
      {modal === Completed && <ModalCompleted user={user} onClose={onClose} />}
      {modal === Abandoned && <ModalAbandoned user={user} onClose={onClose} />}
      {modal === Followers && <ModalSubscription user={user} name={Followers} onClose={onClose} />}
      {modal === Following && <ModalSubscription user={user} name={Following} onClose={onClose} />}
    </>
  )
}
