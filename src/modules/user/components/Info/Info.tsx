import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Button } from '@mui/material'
import { UserDetailDto } from '@dto'
import AppIcon from '@ui/AppIcon'

const ModalInfo = dynamic(() => import('./components/ModalInfo'))

interface InfoProps {
  user: UserDetailDto
}

export default function Info({ user }: InfoProps) {
  const { formatMessage } = useIntl()
  const [open, setOpen] = useState(false)
  const learnMoreText = formatMessage({ id: 'common.info' })

  const toggle = () => setOpen(!open)

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        startIcon={<AppIcon name="info" />}
        sx={{
          flex: 1,
          maxWidth: {
            md: 200,
          },
          textTransform: 'none',
        }}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={toggle}
      >
        {learnMoreText}
      </Button>
      {open && <ModalInfo user={user} onClose={toggle} />}
    </>
  )
}
