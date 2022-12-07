import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import useSnackbar from '@hooks/useSnackbar'
import { useMenu } from './hooks/useMenu'

const Menu = dynamic(() => import('./components/Menu'))

interface ShareProps {
  title: string
  href: string
  onClose: () => void
}

function Share({ title, href, onClose }: ShareProps) {
  const { formatMessage } = useIntl()
  const [enqueueSnackbar] = useSnackbar()
  const [open, onCloseMenu] = useMenu(title, href, onClose)
  const url = process.env.NEXT_PUBLIC_APP_URL + href
  const copyText = formatMessage({ id: 'common.copied' })
  const error = formatMessage({ id: 'common.error' })

  const onCopyEnd = () => enqueueSnackbar({ message: copyText, severity: 'success', icon: 'keyboard' })

  const onCopyError = () => enqueueSnackbar({ message: error, severity: 'error' })

  return (
    <>
      {open && <Menu title={title} url={url} onCopyEnd={onCopyEnd} onCopyError={onCopyError} onClose={onCloseMenu} />}
    </>
  )
}

export default Share
