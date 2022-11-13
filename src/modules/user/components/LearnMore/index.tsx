import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Button } from '@mui/material'
import { UserDetailDto } from '@dto'
import AppIcon from '@ui/AppIcon'

const ModalLearnMore = dynamic(() => import('./components/ModalLearnMore'))

interface LearnMoreProps {
  user: UserDetailDto
}

export default function LearnMore({ user }: LearnMoreProps) {
  const { formatMessage } = useIntl()
  const [open, setOpen] = useState(false)
  const learnMoreText = formatMessage({ id: 'common.learn-more' })

  const toggle = () => setOpen(!open)

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        startIcon={<AppIcon name="info" />}
        sx={{ textTransform: 'none' }}
        onClick={toggle}
      >
        {learnMoreText}
      </Button>
      {open && <ModalLearnMore user={user} onClose={toggle} />}
    </>
  )
}
