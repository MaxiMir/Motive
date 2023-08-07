import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { OnlineIndexName, ConfirmationDto, UserCharacteristicDto } from 'shared/api'
import { useFormatNumber } from 'shared/lib/hooks'
import { useWordDeclination } from './lib'

const SubscriptionModal = dynamic(() => import('./subscriptionModal'))
const NoCompletedModal = dynamic(() => import('./noCompletedModal'))
const AbandonedModal = dynamic(() => import('./abandonedModal'))

interface OnlineIndexProps {
  name: OnlineIndexName | 'level'
  value: number
  userId: number
  characteristic: UserCharacteristicDto
  confirmations: ConfirmationDto[]
  order: number
}

function OnlineIndex({
  name,
  value,
  userId,
  characteristic,
  confirmations,
  order,
}: OnlineIndexProps) {
  const wordDeclination = useWordDeclination(name, value)
  const formatNumber = useFormatNumber()
  const [modal, setModal] = useState<OnlineIndexName>()
  const formattedValue = formatNumber(value)
  const buttonText = wordDeclination.toLowerCase()

  const onClick = async () => {
    const openStories = name === 'completed' && confirmations.length

    if (name === 'level') return

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
        sx={{
          padding: '4px',
          justifyContent: {
            xs: 'center',
            md: 'flex-start',
          },
          flex: {
            xs: order > 3 ? '45%' : 1,
            md: 'initial',
          },
        }}
        onClick={onClick}
      >
        <Box display="flex" alignItems="baseline" gap={1}>
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

export default OnlineIndex
