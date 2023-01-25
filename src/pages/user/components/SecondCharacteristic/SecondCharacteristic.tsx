import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button, Stack, Typography } from '@mui/material'
import { ConfirmationDto } from '@shared/api/confirmation'
import { SecondCharacteristicName } from '@shared/api/characteristic'
import { getWordDeclination } from '@shared/lib/helpers/string'
import useFormatNumber from '@shared/lib/hooks/useFormatNumber'
import { useMessages } from './hooks/useMessages'

const SubscriptionModal = dynamic(() => import('./components/SubscriptionModal'))
const NoCompletedModal = dynamic(() => import('./components/NoCompletedModal'))
const AbandonedModal = dynamic(() => import('./components/AbandonedModal'))

const { Completed, Abandoned, Followers, Following } = SecondCharacteristicName

interface CharacteristicProps {
  confirmations: ConfirmationDto[]
  name: SecondCharacteristicName
  value: number
}

function SecondCharacteristic({ confirmations, name, value }: CharacteristicProps) {
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
    const openStories = name === Completed && confirmations.length

    if (!openStories) {
      setModal(name)
      return
    }

    const [{ id }] = confirmations
    const { clickOnElem } = await import('@shared/lib/helpers/document')
    clickOnElem(`confirmation-${id}`)
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
      {modal === Followers && <SubscriptionModal name={Followers} onClose={onClose} />}
      {modal === Following && <SubscriptionModal name={Following} onClose={onClose} />}
    </>
  )
}

export default SecondCharacteristic
