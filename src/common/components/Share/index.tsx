import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import useSnackbar from 'src/common/hooks/useSnackbar'

const Menu = dynamic(() => import('./components/Menu'))

interface ShareProps {
  title: string
  href: string
  onClose: () => void
}

export default function Share({ title, href, onClose }: ShareProps) {
  const { formatMessage } = useIntl()
  const [enqueueSnackbar, closeSnackbar] = useSnackbar()
  const [withMenu, setWithMenu] = useState(false)
  const url = process.env.NEXT_PUBLIC_APP_URL + href
  const copyText = formatMessage({ id: 'common.copied' })
  const error = formatMessage({ id: 'common.error' })

  const onCopyEnd = () => enqueueSnackbar({ message: copyText, severity: 'success', icon: 'keyboard' })

  const onCopyError = () => enqueueSnackbar({ message: error, severity: 'error' })

  const onCloseMenu = () => {
    setWithMenu(false)
    onClose()
  }

  useEffect(() => {
    if (!navigator.share) {
      setWithMenu(true)
      return
    }

    navigator.share({ title, url }).catch(onClose)
  }, [onClose, title, url])

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
