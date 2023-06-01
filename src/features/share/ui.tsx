import { Box, List, ListItem, Stack, Drawer, ListItemIcon, ListItemText } from '@mui/material'
import { useIntl } from 'react-intl'
import { copy } from 'shared/lib/helpers'
import { ContentCopy, Email, Facebook, SMS, Telegram, Twitter, VK } from 'shared/ui/icons'
import { useSnackbar } from 'shared/ui/snackbar'
import { clickHandler } from './lib'

interface ShareProps {
  href: string
  title: string
  onClose: () => void
}

function Share({ href, title, onClose }: ShareProps) {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const shareItems = getShareItems()
  const copiedText = formatMessage({ id: 'common.copied' })
  const error = formatMessage({ id: 'common.error' })
  const shareText = formatMessage({ id: 'component.share.share' })
  const sendText = formatMessage({ id: 'component.share.send' })
  const copyText = formatMessage({ id: 'component.share.copy' })

  function getShareItems() {
    const url = process.env.NEXT_PUBLIC_APP_URL + href

    return [
      {
        text: `${shareText} Facebook`,
        ItemIcon: Facebook,
        onClick: () => clickHandler('facebook', title, url),
      },
      {
        text: `${shareText} Twitter`,
        ItemIcon: Twitter,
        onClick: () => clickHandler('twitter', title, url),
      },
      {
        text: `${shareText} VK`,
        ItemIcon: VK,
        onClick: () => clickHandler('vk', title, url),
      },
      {
        text: `${shareText} Telegram`,
        ItemIcon: Telegram,
        onClick: () => clickHandler('telegram', title, url),
      },
      {
        text: `${sendText} Email`,
        ItemIcon: Email,
        onClick: () => clickHandler('email', title, url),
      },
      {
        text: `${sendText} SMS`,
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
    <Drawer open anchor="bottom" onClose={onClose}>
      <Box role="presentation" onClick={onClose}>
        <List>
          {shareItems.map(({ text, ItemIcon, onClick }) => (
            <ListItem button sx={{ height: 64 }} key={text} onClick={onClick}>
              <Stack direction="row" alignItems="center" sx={{ marginInline: 'auto' }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <ItemIcon sx={{ color: 'primary.dark' }} />
                </ListItemIcon>
                <ListItemText sx={{ minWidth: 180 }} primary={text} />
              </Stack>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default Share
