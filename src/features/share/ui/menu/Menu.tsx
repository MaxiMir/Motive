import { Box, List, ListItem, Stack, Drawer, ListItemIcon, ListItemText } from '@mui/material'
import { copyText } from 'shared/lib/helpers'
import { ContentCopy, Email, Facebook, SMS, Telegram, Twitter, VK } from 'shared/ui/icons'
import { clickHandler } from './lib/helpers/handler'
import { useMessages } from './lib/hooks/useMessages'

interface MenuProps {
  title: string
  url: string
  onCopyEnd: () => void
  onCopyError: () => void
  onClose: () => void
}

function Menu({ title, url, onCopyEnd, onCopyError, onClose }: MenuProps) {
  const messages = useMessages()
  const shareItems = getShareItems()

  function getShareItems() {
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
        onClick: () => copyText(url).then(onCopyEnd).catch(onCopyError),
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

export default Menu
