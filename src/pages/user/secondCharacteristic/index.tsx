import { Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useUserContext } from 'entities/user'
import { SecondCharacteristicName, ConfirmationDto } from 'shared/api'
import { getWordDeclination } from 'shared/lib/helpers'
import { useFormatNumber } from 'shared/lib/hooks'
import { useMessages } from './lib'

const SubscriptionModal = dynamic(() => import('./subscriptionModal'))
const NoCompletedModal = dynamic(() => import('./noCompletedModal'))
const AbandonedModal = dynamic(() => import('./abandonedModal'))

const { Completed, Abandoned, Followers, Following } = SecondCharacteristicName

interface CharacteristicProps {
  confirmations: ConfirmationDto[]
  name: SecondCharacteristicName
  value: number
}

function SecondCharacteristic({ confirmations, name, value }: CharacteristicProps) {
  const messages = useMessages(name)
  const formatNumber = useFormatNumber()
  const { id, characteristic } = useUserContext()
  const [modal, setModal] = useState<SecondCharacteristicName>()
  const formattedValue = formatNumber(value)
  const wordDeclination = getWordDeclination(value, [
    messages.singleText,
    messages.doubleText,
    messages.multipleGenitiveText,
  ])
  const buttonText = wordDeclination.toLowerCase()

  const onClick = async () => {
    const openStories = name === Completed && confirmations.length

    if (!openStories) {
      setModal(name)
      return
    }

    const [confirmation] = confirmations
    const { clickOnElem } = await import('shared/lib/helpers')
    clickOnElem(`confirmation-${confirmation.id}`)
  }

  const onClose = () => setModal(undefined)

  return (
    <>
      <Button
        size="small"
        aria-haspopup="true"
        aria-expanded={modal ? 'true' : undefined}
        sx={{ padding: '4px' }}
        onClick={onClick}
      >
        <Stack
          alignItems={{
            xs: 'center',
            md: 'baseline',
          }}
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={{
            md: 0.5,
          }}
          color="common.white"
        >
          <Typography variant="h5" component="b">
            {formattedValue}
          </Typography>
          <Typography sx={{ fontSize: 13 }}>{buttonText}</Typography>
        </Stack>
      </Button>
      {modal === Completed && <NoCompletedModal onClose={onClose} />}
      {modal === Abandoned && <AbandonedModal onClose={onClose} />}
      {(modal === Followers || modal === Following) && (
        <SubscriptionModal
          userId={id}
          count={characteristic[modal]}
          type={modal}
          onClose={onClose}
        />
      )}
    </>
  )
}

export default SecondCharacteristic
