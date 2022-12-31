import dynamic from 'next/dynamic'
import useSnackbar from '@hooks/useSnackbar'
import { useMessages } from './hooks/useMessages'
import { useMenu } from './hooks/useMenu'

const Menu = dynamic(() => import('./components/Menu'))

interface ShareProps {
  title: string
  href: string
  onClose: () => void
}

function Share({ title, href, onClose }: ShareProps) {
  const messages = useMessages()
  const [enqueueSnackbar] = useSnackbar()
  const [open, onCloseMenu] = useMenu(title, href, onClose)
  const url = process.env.NEXT_PUBLIC_APP_URL + href

  const onCopyEnd = () => {
    enqueueSnackbar({ message: messages.copyText, severity: 'success', icon: 'keyboard' })
  }

  const onCopyError = () => {
    enqueueSnackbar({ message: messages.error, severity: 'error' })
  }

  return (
    <>
      {open && (
        <Menu
          title={title}
          url={url}
          onCopyEnd={onCopyEnd}
          onCopyError={onCopyError}
          onClose={onCloseMenu}
        />
      )}
    </>
  )
}

export default Share
