import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { OnlineScoreName, ConfirmationDto, UserCharacteristicDto } from 'shared/api'
import { useFormatNumber } from 'shared/lib/hooks'
import { useWordDeclination } from './lib'

const SubscriptionModal = dynamic(() => import('./subscriptionModal'))
const NoCompletedModal = dynamic(() => import('./noCompletedModal'))
const AbandonedModal = dynamic(() => import('./abandonedModal'))

interface OnlineScoreProps {
  name: OnlineScoreName
  value: number
  userId: number
  characteristic: UserCharacteristicDto
  confirmations: ConfirmationDto[]
}

function OnlineScore({ name, value, userId, characteristic, confirmations }: OnlineScoreProps) {
  const wordDeclination = useWordDeclination(name, value)
  const formatNumber = useFormatNumber()
  const [modal, setModal] = useState<OnlineScoreName>()
  const formattedValue = formatNumber(value)
  const buttonText = wordDeclination.toLowerCase()

  const onClick = async () => {
    const openStories = name === 'completed' && confirmations.length

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
        <Box
          display="flex"
          alignItems={{
            xs: 'center',
            md: 'baseline',
          }}
          flexDirection={{
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
          <Typography fontSize={13}>{buttonText}</Typography>
        </Box>
      </Button>
      {modal === 'completed' && <NoCompletedModal onClose={onClose} />}
      {modal === 'abandoned' && (
        <AbandonedModal characteristic={characteristic} onClose={onClose} />
      )}
      {(modal === 'followers' || modal === 'following') && (
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

export default OnlineScore
