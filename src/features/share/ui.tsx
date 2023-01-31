import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material'
import { copyText } from 'shared/lib/helpers'
import { ContentCopy, Email, Facebook, SMS, Telegram, Twitter, VK } from 'shared/ui/icons'
import { useSnackbar } from 'shared/ui/snackbar'
import { clickHandler, useMessages } from './lib'

interface ShareProps {
  href: string
  title: string
  onClose: () => void
}

function Share({ href, title, onClose }: ShareProps) {
  const messages = useMessages()
  const { enqueueSnackbar } = useSnackbar()
  const shareItems = getShareItems()

  function getShareItems() {
    const url = process.env.NEXT_PUBLIC_APP_URL + href

    return [
      {
        text: `${messages.shareText} Facebook`,
        Icon: Facebook,
        onClick: () => clickHandler('facebook', title, url),
      },
      {
        text: `${messages.shareText} Twitter`,
        Icon: Twitter,
        onClick: () => clickHandler('twitter', title, url),
      },
      {
        text: `${messages.shareText} VK`,
        Icon: VK,
        onClick: () => clickHandler('vk', title, url),
      },
      {
        text: `${messages.shareText} Telegram`,
        Icon: Telegram,
        onClick: () => clickHandler('telegram', title, url),
      },
      {
        text: `${messages.sendText} Email`,
        Icon: Email,
        onClick: () => clickHandler('email', title, url),
      },
      {
        text: `${messages.sendText} SMS`,
        Icon: SMS,
        onClick: () => clickHandler('sms', title, url),
      },
      {
        text: messages.copyText,
        Icon: ContentCopy,
        onClick: () =>
          copyText(url)
            .then(() =>
              enqueueSnackbar({
                message: messages.copiedText,
                severity: 'success',
                icon: '⌨️',
              }),
            )
            .catch(() =>
              enqueueSnackbar({ message: messages.error, severity: 'error', icon: '👺' }),
            ),
      },
    ]
  }

  return (
    <Drawer open anchor="bottom" sx={{ zIndex: 1450 }} onClose={onClose}>
      <Box role="presentation" onClick={onClose}>
        <List>
          {shareItems.map(({ text, Icon, onClick }) => (
            <ListItem button sx={{ height: 65 }} key={text} onClick={onClick}>
              <Stack direction="row" alignItems="center" width={240} sx={{ marginInline: 'auto' }}>
                <ListItemIcon>
                  <Icon sx={{ color: 'primary.dark' }} />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: 'creativity.light' }} />
              </Stack>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default Share
