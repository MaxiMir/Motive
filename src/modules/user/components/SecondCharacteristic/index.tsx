import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Box, Button, Typography } from '@mui/material'
import { SecondCharacteristicName, UserDetailDto } from '@dto'
import { getWordDeclination, numberToShort } from '@helpers/prepare'

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
  const singleText = formatMessage({ id: `common.${name}-single` })
  const doubleText = formatMessage({ id: `common.${name}-double` })
  const multipleGenitiveText = formatMessage({ id: `common.${name}-genitive` })
  const shortValue = numberToShort(value)
  const wordDeclination = getWordDeclination(value, [singleText, doubleText, multipleGenitiveText])
  const buttonText = wordDeclination.toLowerCase()

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
          <Typography variant="h5" component="b">
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
