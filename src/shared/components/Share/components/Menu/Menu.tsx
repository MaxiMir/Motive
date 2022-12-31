import { KeyboardEvent } from 'react'
import { Box, List, ListItem, Drawer, ListItemIcon, ListItemText } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import SMS from '@mui/icons-material/Textsms'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { copyText } from '@helpers/navigator'
import FacebookIcon from '@ui/icons/FacebookIcon'
import TelegramIcon from '@ui/icons/TelegramIcon'
import TwitterIcon from '@ui/icons/TwitterIcon'
import VKIcon from '@ui/icons/VKIcon'
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

  const onKeyDown = (event: KeyboardEvent) => {
    if (['Tab', 'Shift'].includes(event.key)) return

    onClose()
  }

  function getShareItems() {
    return [
      {
        text: `${messages.shareText} Facebook`,
        Icon: FacebookIcon,
        onClick: () => clickHandler('facebook', title, url),
      },
      {
        text: `${messages.shareText} Twitter`,
        Icon: TwitterIcon,
        onClick: () => clickHandler('twitter', title, url),
      },
      {
        text: `${messages.shareText} VK`,
        Icon: VKIcon,
        onClick: () => clickHandler('vk', title, url),
      },
      {
        text: `${messages.shareText} Telegram`,
        Icon: TelegramIcon,
        onClick: () => clickHandler('telegram', title, url),
      },
      {
        text: `${messages.sendText} Email`,
        Icon: EmailIcon,
        onClick: () => clickHandler('email', title, url),
      },
      {
        text: `${messages.sendText} SMS`,
        Icon: SMS,
        onClick: () => clickHandler('sms', title, url),
      },
      {
        text: messages.copyText,
        Icon: ContentCopyIcon,
        onClick: () => copyText(url).then(onCopyEnd).catch(onCopyError),
      },
    ]
  }

  return (
    <Drawer open anchor="bottom" onClose={onClose}>
      <Box role="presentation" onKeyDown={onKeyDown} onClick={onClose}>
        <List>
          {shareItems.map(({ text, Icon, onClick }) => (
            <ListItem button sx={{ height: 65 }} key={text} onClick={onClick}>
              <Box display="flex" alignItems="center" sx={{ width: 240, marginInline: 'auto' }}>
                <ListItemIcon>
                  <Icon color="secondary" />
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
