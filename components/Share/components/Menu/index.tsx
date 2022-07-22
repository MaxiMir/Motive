import { KeyboardEvent } from 'react'
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import SMS from '@mui/icons-material/Textsms'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { copyHandler } from 'helpers/dom'
import { Locale } from 'hooks/useLocale'
import { FacebookIcon, TelegramIcon, TwitterIcon, VKIcon } from 'components/ui/icons'
import { clickHandler } from './helper'
import i18n from './i18n'

interface MenuProps {
  title: string
  url: string
  locale: Locale
  onCopyEnd: () => void
  onCopyError: () => void
  onClose: () => void
}

export default function Menu({ title, url, locale, onCopyEnd, onCopyError, onClose }: MenuProps) {
  const theme = useTheme()
  const shareItems = getShareItems()
  const { share, send, link } = i18n[locale]

  const onKeyDown = (event: KeyboardEvent) => {
    if (['Tab', 'Shift'].includes(event.key)) return

    onClose()
  }

  function getShareItems() {
    return [
      {
        text: `${share} Facebook`,
        Icon: FacebookIcon,
        onClick: () => clickHandler('facebook', title, url),
      },
      {
        text: `${share} Twitter`,
        Icon: TwitterIcon,
        onClick: () => clickHandler('twitter', title, url),
      },
      {
        text: `${share} VK`,
        Icon: VKIcon,
        onClick: () => clickHandler('vk', title, url),
      },
      {
        text: `${share} Telegram`,
        Icon: TelegramIcon,
        onClick: () => clickHandler('telegram', title, url),
      },
      {
        text: `${send} Email`,
        Icon: EmailIcon,
        onClick: () => clickHandler('email', title, url),
      },
      {
        text: `${send} SMS`,
        Icon: SMS,
        onClick: () => clickHandler('sms', title, url),
      },
      {
        text: link,
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
                <ListItemText primary={text} sx={{ color: theme.palette.text.disabled }} />
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
