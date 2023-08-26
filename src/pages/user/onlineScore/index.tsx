import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { OnlineScoreDto, ConfirmationDto, UserCharacteristicDto } from 'shared/api'
import { useFormatNumber, useWordDeclination } from 'shared/lib/hooks'

const SubscriptionModal = dynamic(() => import('./subscriptionModal'))
const NoCompletedModal = dynamic(() => import('./noCompletedModal'))
const AbandonedModal = dynamic(() => import('./abandonedModal'))

interface OnlineScoreProps {
  score: OnlineScoreDto
  value: number
  userId: number
  characteristic: UserCharacteristicDto
  confirmations: ConfirmationDto[]
}

function OnlineScore({ score, value, userId, characteristic, confirmations }: OnlineScoreProps) {
  const { locale } = useIntl()
  const wordDeclination = useWordDeclination(score, value)
  const formatNumber = useFormatNumber()
  const [modal, setModal] = useState<OnlineScoreDto>()
  const formattedValue = formatNumber(value)
  const buttonText = wordDeclination.toLowerCase()

  const onClick = async () => {
    const openStories = score === 'completed' && confirmations.length

    if (!openStories) {
      setModal(score)
      return
    }

    const [confirmation] = confirmations
    document.getElementById(`confirmation-${confirmation.id}`)?.click()
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
          flexDirection={{
            xs: 'column',
            md: 'row',
          }}
          alignItems={{
            xs: 'center',
            md: 'baseline',
          }}
          gap={{
            md: 0.5,
          }}
        >
          <Typography variant="h5" component="b">
            {formattedValue}
          </Typography>
          <Typography
            fontSize={{
              xs: locale === 'ru' ? 10.5 : 13,
              sm: 13,
            }}
          >
            {buttonText}
          </Typography>
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
