import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Button, Typography } from '@mui/material'
import { SecondCharacteristicName, UserDetailDto } from '@dto'
import { formatNumber } from '@helpers/intl'
import { getWordDeclination } from '@helpers/string'
import useMessages from './hooks/useMessages'

const ModalSubscription = dynamic(() => import('./components/ModalSubscription'))
const ModalNoCompleted = dynamic(() => import('./components/ModalNoCompleted'))
const ModalAbandoned = dynamic(() => import('./components/ModalAbandoned/ModalAbandoned'))

const { Completed, Abandoned, Followers, Following } = SecondCharacteristicName

interface CharacteristicProps {
  user: UserDetailDto
  name: SecondCharacteristicName
  value: number
}

function SecondCharacteristic({ user, name, value }: CharacteristicProps) {
  const messages = useMessages(name)
  const [modal, setModal] = useState<SecondCharacteristicName>()
  const formattedValue = formatNumber(value)
  const wordDeclination = getWordDeclination(value, [
    messages.singleText,
    messages.doubleText,
    messages.multipleGenitiveText,
  ])
  const buttonText = wordDeclination.toLowerCase()

  const onClick = async () => {
    const openStories = name === Completed && user.confirmations.length

    if (!openStories) {
      setModal(name)
      return
    }

    const [{ id }] = user.confirmations
    const { clickOnElem } = await import('@helpers/window')
    clickOnElem(`confirmation-${id}`)
  }

  const onClose = () => setModal(undefined)

  return (
    <>
      <Button
        size="small"
        sx={{ flex: 1 }}
        aria-expanded={modal ? 'true' : undefined}
        aria-haspopup="true"
        onClick={onClick}
      >
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
            {formattedValue}
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
      {modal === Completed && <ModalNoCompleted onClose={onClose} />}
      {modal === Abandoned && <ModalAbandoned user={user} onClose={onClose} />}
      {modal === Followers && <ModalSubscription user={user} name={Followers} onClose={onClose} />}
      {modal === Following && <ModalSubscription user={user} name={Following} onClose={onClose} />}
    </>
  )
}

export default SecondCharacteristic
