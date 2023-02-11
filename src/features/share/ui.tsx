import {
  Box,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Stack,
  Drawer,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { copyText } from 'shared/lib/helpers'
import Icon from 'shared/ui/Icon'
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
        ItemIcon: Facebook,
        onClick: () => clickHandler('facebook', title, url),
      },
      {
        text: `${messages.shareText} Twitter`,
        ItemIcon: Twitter,
        onClick: () => clickHandler('twitter', title, url),
      },
      {
        text: `${messages.shareText} VK`,
        ItemIcon: VK,
        onClick: () => clickHandler('vk', title, url),
      },
      {
        text: `${messages.shareText} Telegram`,
        ItemIcon: Telegram,
        onClick: () => clickHandler('telegram', title, url),
      },
      {
        text: `${messages.sendText} Email`,
        ItemIcon: Email,
        onClick: () => clickHandler('email', title, url),
      },
      {
        text: `${messages.sendText} SMS`,
        ItemIcon: SMS,
        onClick: () => clickHandler('sms', title, url),
      },
      {
        text: messages.copyText,
        ItemIcon: ContentCopy,
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
    <Drawer open anchor="bottom" onClose={onClose}>
      <DialogTitle
        sx={({ spacing }) => ({
          padding: spacing(2, 3, 1),
          marginX: 6,
          textAlign: 'center',
          textTransform: 'uppercase',
        })}
      >
        {messages.shareTitle}
      </DialogTitle>
      <IconButton
        aria-label={messages.closeText}
        edge="start"
        sx={{
          position: 'absolute',
          top: 10,
          right: 13,
          color: 'zen.silent',
        }}
        onClick={onClose}
      >
        <Icon name="close" />
      </IconButton>
      <Box role="presentation" onClick={onClose}>
        <List>
          {shareItems.map(({ text, ItemIcon, onClick }) => (
            <ListItem button sx={{ height: 64 }} key={text} onClick={onClick}>
              <Stack direction="row" alignItems="center" sx={{ marginInline: 'auto' }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <ItemIcon sx={{ color: 'primary.dark' }} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </Stack>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default Share
