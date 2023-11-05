import { ListItem, Stack, ListItemIcon, ListItemText, Box } from '@mui/material'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useDeviceContext } from 'entities/device'
import { copy } from 'shared/lib/helpers'
import { ContentCopy, Email, Facebook, SMS, Telegram, Twitter, VK } from 'shared/ui/icons'
import { useSnackbar } from 'shared/ui/snackbar'
import { clickHandler } from './lib'

const Modal = dynamic(() => import('shared/ui/modal'))
const Drawer = dynamic(() => import('shared/ui/drawer'))

interface ShareProps {
  href: string
  title: string
  onClose: () => void
}

function Share({ href, title, onClose }: ShareProps) {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useDeviceContext()
  const shareItems = getShareItems()
  const copiedText = formatMessage({ id: 'common.copied' })
  const shareTitle = formatMessage({ id: 'common.share' })
  const ModalComponent = isMobile ? Drawer : Modal

  function getShareItems() {
    const url = process.env.NEXT_PUBLIC_APP_URL + href
    const copyText = formatMessage({ id: 'common.copy' })
    const error = formatMessage({ id: 'common.error' })

    return [
      {
        text: 'Facebook',
        ItemIcon: Facebook,
        onClick: () => clickHandler('facebook', title, url),
      },
      {
        text: 'Twitter',
        ItemIcon: Twitter,
        onClick: () => clickHandler('twitter', title, url),
      },
      {
        text: 'VK',
        ItemIcon: VK,
        onClick: () => clickHandler('vk', title, url),
      },
      {
        text: 'Telegram',
        ItemIcon: Telegram,
        onClick: () => clickHandler('telegram', title, url),
      },
      {
        text: 'Email',
        ItemIcon: Email,
        onClick: () => clickHandler('email', title, url),
      },
      {
        text: 'SMS',
        ItemIcon: SMS,
        onClick: () => clickHandler('sms', title, url),
      },
      {
        text: copyText,
        ItemIcon: ContentCopy,
        onClick: () =>
          copy(url)
            .then(() => enqueueSnackbar(copiedText, { severity: 'success', icon: '⌨️' }))
            .catch(() => enqueueSnackbar(error, { severity: 'error', icon: '☠️' })),
      },
    ]
  }

  return (
    <ModalComponent title={shareTitle} onClose={onClose}>
      <Box display="flex" flexWrap="wrap" onClick={onClose}>
        {shareItems.map(({ text, ItemIcon, onClick }) => (
          <ListItem button key={text} sx={{ flex: 1 }} onClick={onClick}>
            <Stack direction="row" alignItems="center" sx={{ marginInline: 'auto' }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <ItemIcon sx={{ color: 'primary.dark' }} />
              </ListItemIcon>
              <ListItemText sx={{ minWidth: 70 }} primary={text} />
            </Stack>
          </ListItem>
        ))}
      </Box>
    </ModalComponent>
  )
}

export default Share
