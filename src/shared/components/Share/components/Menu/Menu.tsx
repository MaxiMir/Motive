import { Box, List, ListItem, Drawer, ListItemIcon, ListItemText } from '@mui/material'
import { copyText } from '@helpers/navigator'
import ContentCopy from '@ui/icons/ContentCopy'
import Email from '@ui/icons/Email'
import SMS from '@ui/icons/SMS'
import Facebook from '@ui/icons/Facebook'
import Telegram from '@ui/icons/Telegram'
import Twitter from '@ui/icons/Twitter'
import VK from '@ui/icons/VK'
import { useMessages } from './hooks/useMessages'
import { clickHandler } from './helper'

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
    <Drawer open anchor="bottom" onClose={onClose}>
      <Box role="presentation" onClick={onClose}>
        <List>
          {shareItems.map(({ text, Icon, onClick }) => (
            <ListItem button sx={{ height: 65 }} key={text} onClick={onClick}>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  width: 240,
                  marginInline: 'auto',
                }}
              >
                <ListItemIcon>
                  <Icon sx={{ color: 'primary.dark' }} />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ color: 'creativity.light' }} />
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default Menu
