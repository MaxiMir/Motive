import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import AppIcon from '@ui/AppIcon'
import { Button } from '@mui/material'

const Share = dynamic(() => import('@components/Share'))

interface ShareUserProps {
  title: string
  href: string
}

export default function ShareUser({ title, href }: ShareUserProps) {
  const { formatMessage } = useIntl()
  const shareText = formatMessage({ id: 'common.share' })
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(!open)

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        startIcon={<AppIcon name="share" />}
        sx={{ textTransform: 'none' }}
        onClick={toggle}
      >
        {shareText}
      </Button>
      {open && <Share title={title} href={href} onClose={toggle} />}
    </>
  )
}
