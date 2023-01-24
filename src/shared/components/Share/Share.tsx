import dynamic from 'next/dynamic'
import { useSnackbar } from '@entities/snackbar'
import { useMessages } from './hooks/useMessages'

const Menu = dynamic(() => import('./components/Menu'))

interface ShareProps {
  href: string
  title: string
  onClose: () => void
}

function Share({ href, title, onClose }: ShareProps) {
  const messages = useMessages()
  const { enqueueSnackbar } = useSnackbar()
  const url = process.env.NEXT_PUBLIC_APP_URL + href

  const onCopyEnd = () => {
    enqueueSnackbar({ message: messages.copyText, severity: 'success', icon: 'keyboard' })
  }

  const onCopyError = () => {
    enqueueSnackbar({ message: messages.error, severity: 'error', icon: 'error' })
  }

  return (
    <Menu
      title={title}
      url={url}
      onCopyEnd={onCopyEnd}
      onCopyError={onCopyError}
      onClose={onClose}
    />
  )
}

export default Share
