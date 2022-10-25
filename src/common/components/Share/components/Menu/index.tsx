import { KeyboardEvent } from 'react'
import { useIntl } from 'react-intl'
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import SMS from '@mui/icons-material/Textsms'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { copyHandler } from 'src/common/helpers/dom'
import { FacebookIcon, TelegramIcon, TwitterIcon, VKIcon } from 'src/common/ui/icons'
import { clickHandler } from './helper'

interface MenuProps {
  title: string
  url: string
  onCopyEnd: () => void
  onCopyError: () => void
  onClose: () => void
}

export default function Menu({ title, url, onCopyEnd, onCopyError, onClose }: MenuProps) {
  const { formatMessage } = useIntl()
  const shareItems = getShareItems()

  const onKeyDown = (event: KeyboardEvent) => {
    if (['Tab', 'Shift'].includes(event.key)) return

    onClose()
  }

  function getShareItems() {
    const shareText = formatMessage({ id: 'component.share.share' })
    const sendText = formatMessage({ id: 'component.share.send' })
    const copyText = formatMessage({ id: 'component.share.copy' })

    return [
      {
        text: `${shareText} Facebook`,
        Icon: FacebookIcon,
        onClick: () => clickHandler('facebook', title, url),
      },
      {
        text: `${shareText} Twitter`,
        Icon: TwitterIcon,
        onClick: () => clickHandler('twitter', title, url),
      },
      {
        text: `${shareText} VK`,
        Icon: VKIcon,
        onClick: () => clickHandler('vk', title, url),
      },
      {
        text: `${shareText} Telegram`,
        Icon: TelegramIcon,
        onClick: () => clickHandler('telegram', title, url),
      },
      {
        text: `${sendText} Email`,
        Icon: EmailIcon,
        onClick: () => clickHandler('email', title, url),
      },
      {
        text: `${sendText} SMS`,
        Icon: SMS,
        onClick: () => clickHandler('sms', title, url),
      },
      {
        text: copyText,
        Icon: ContentCopyIcon,
        onClick: () => copyHandler(url, onCopyEnd, onCopyError),
      },
    ]
  }

  return (
    <Drawer open anchor="bottom" onClose={onClose}>
      <Box role="presentation" onKeyDown={onKeyDown} onClick={onClose}>
        <List>
          {shareItems.map(({ text, Icon, onClick }) => (
            <ListItem button sx={{ height: 65 }} key={text} onClick={onClick}>
              <Box display="flex" alignItems="center" sx={{ width: 240, margin: '0 auto' }}>
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
