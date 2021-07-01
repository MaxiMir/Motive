import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const ShareMenu = dynamic(() => import('./ShareMenu'))
const AppSnackbar = dynamic(() => import('components/UI/AppSnackbar'))

interface ShareProps {
  open: boolean
  title: string
  href: string
  onClose: () => void
}

type Message = 'success' | 'error'

export default function Share({ open, title, href, onClose }: ShareProps): JSX.Element {
  const [withMenu, setWithMenu] = useState(false)
  const [message, setMessage] = useState<Message | null>(null)
  const url = process.env.NEXT_PUBLIC_SERVER_BASE_URL + href

  const onCloseMenu = () => {
    setWithMenu(false)
    onClose()
  }

  useEffect(() => {
    if (!open) {
      return
    }

    if (!navigator.share) {
      setWithMenu(true)
      return
    }

    navigator.share({ title, url }).catch(onClose)
  }, [onClose, open, title, url])

  return (
    <>
      {withMenu && (
        <ShareMenu
          title={title}
          url={url}
          onCopyEnd={() => setMessage('success')}
          onCopyError={() => setMessage('error')}
          onClose={onCloseMenu}
        />
      )}
      {message && (
        <AppSnackbar severity={message} autoHideDuration={3000} onClose={() => setMessage(null)}>
          {message === 'success' ? 'Copied' : 'Something went wrong'}
        </AppSnackbar>
      )}
    </>
  )
}

// TODO https://shivamethical.medium.com/creating-web-page-preview-while-sharing-url-via-social-applications-like-whats-app-fb-cd2e19b11bf2
