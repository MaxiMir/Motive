import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import useSnackbar from 'hooks/useSnackbar'

const Menu = dynamic(() => import('./components/Menu'))

interface ShareProps {
  open: boolean
  title: string
  href: string
  onClose: () => void
}

export default function Share({ open, title, href, onClose }: ShareProps): JSX.Element {
  const withNavigatorShare = useRef(false)
  const [enqueueSnackbar, closeSnackbar] = useSnackbar()
  const [withMenu, setWithMenu] = useState(false)
  const url = process.env.NEXT_PUBLIC_CLIENT_BASE_URL + href

  const onCopyEnd = () => enqueueSnackbar({ message: 'Copied', severity: 'success', icon: 'keyboard' })

  const onCopyError = () => enqueueSnackbar({ message: 'Something went wrong...', severity: 'error' })

  const onCloseMenu = () => {
    setWithMenu(false)
    onClose()
  }

  useEffect(() => {
    if (!open) {
      withNavigatorShare.current = !!navigator.share
      return
    }

    if (!withNavigatorShare.current) {
      setWithMenu(true)
      return
    }

    navigator.share({ title, url }).catch(onClose)
  }, [onClose, open, title, url])

  useEffect(() => {
    withMenu && closeSnackbar()
  }, [closeSnackbar, withMenu])

  return (
    <>
      {withMenu && (
        <Menu title={title} url={url} onCopyEnd={onCopyEnd} onCopyError={onCopyError} onClose={onCloseMenu} />
      )}
    </>
  )
}

// TODO https://shivamethical.medium.com/creating-web-page-preview-while-sharing-url-via-social-applications-like-whats-app-fb-cd2e19b11bf2
