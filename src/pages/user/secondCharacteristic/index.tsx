import { Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { SecondCharacteristicName, ConfirmationDto, UserCharacteristicDto } from 'shared/api'
import { getWordDeclination } from 'shared/lib/helpers'
import { useFormatNumber } from 'shared/lib/hooks'
import { useMessages } from './lib'

const SubscriptionModal = dynamic(() => import('./subscriptionModal'))
const NoCompletedModal = dynamic(() => import('./noCompletedModal'))
const AbandonedModal = dynamic(() => import('./abandonedModal'))

interface CharacteristicProps {
  userId: number
  characteristic: UserCharacteristicDto
  confirmations: ConfirmationDto[]
  name: SecondCharacteristicName
  value: number
}

function SecondCharacteristic({
  name,
  value,
  userId,
  characteristic,
  confirmations,
}: CharacteristicProps) {
  const messages = useMessages(name)
  const formatNumber = useFormatNumber()
  const [modal, setModal] = useState<SecondCharacteristicName>()
  const formattedValue = formatNumber(value)
  const wordDeclination = getWordDeclination(value, [
    messages.singleText,
    messages.doubleText,
    messages.multipleGenitiveText,
  ])
  const buttonText = wordDeclination.toLowerCase()

  const onClick = async () => {
    const openStories = name === SecondCharacteristicName.Completed && confirmations.length

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
        color="inherit"
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
          gap={{
            md: 0.5,
          }}
        >
          <Typography variant="h5" component="b">
            {formattedValue}
          </Typography>
          <Typography sx={{ fontSize: 13 }}>{buttonText}</Typography>
        </Stack>
      </Button>
      {modal === SecondCharacteristicName.Completed && <NoCompletedModal onClose={onClose} />}
      {modal === SecondCharacteristicName.Abandoned && (
        <AbandonedModal characteristic={characteristic} onClose={onClose} />
      )}
      {(modal === SecondCharacteristicName.Followers ||
        modal === SecondCharacteristicName.Following) && (
        <SubscriptionModal
          userId={userId}
          count={characteristic[modal]}
          type={modal}
          onClose={onClose}
        />
      )}
    </>
  )
}

export default SecondCharacteristic
