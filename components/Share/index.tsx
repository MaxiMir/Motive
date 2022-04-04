import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import i18n from 'constants/i18n'
import useSnackbar from 'hooks/useSnackbar'
import { Locale } from 'hooks/useLocale'

const Menu = dynamic(() => import('./components/Menu'))

interface ShareProps {
  open: boolean
  title: string
  href: string
  locale: Locale
  onClose: () => void
}

export default function Share({ open, title, href, locale, onClose }: ShareProps): JSX.Element {
  const withNavigatorShare = useRef(false)
  const [enqueueSnackbar, closeSnackbar] = useSnackbar()
  const [withMenu, setWithMenu] = useState(false)
  const url = process.env.NEXT_PUBLIC_APP_URL + href
  const { copy, error } = i18n[locale]

  const onCopyEnd = () => enqueueSnackbar({ message: copy, severity: 'success', icon: 'keyboard' })

  const onCopyError = () => enqueueSnackbar({ message: error, severity: 'error' })

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
        <Menu
          title={title}
          url={url}
          locale={locale}
          onCopyEnd={onCopyEnd}
          onCopyError={onCopyError}
          onClose={onCloseMenu}
        />
      )}
    </>
  )
}

// TODO https://shivamethical.medium.com/creating-web-page-preview-while-sharing-url-via-social-applications-like-whats-app-fb-cd2e19b11bf2
