import { KeyboardEvent } from 'react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { copyHandler } from 'helpers/dom'
import { Locale } from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import { FacebookIcon, TelegramIcon, TwitterIcon, VKIcon } from 'components/UI/icons'
import AppIcon from 'components/UI/AppIcon'
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

const Menu = ({ title, url, locale, onCopyEnd, onCopyError, onClose }: MenuProps): JSX.Element => {
  const theme = useTheme()
  const { share, send, link } = i18n[locale]
  const shareItems = getShareItems()

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
        iconText: <AppIcon name="email" sx={{ color: theme.palette.secondary.main }} />,
        onClick: () => clickHandler('email', title, url),
      },
      {
        text: `${send} SMS`,
        iconText: <AppIcon name="sms" sx={{ color: theme.palette.secondary.main }} />,
        onClick: () => clickHandler('sms', title, url),
      },
      {
        text: link,
        iconText: <AppIcon name="content_copy" sx={{ color: theme.palette.secondary.main }} />,
        onClick: () => copyHandler(url, onCopyEnd, onCopyError),
      },
    ]
  }

  return (
    <Drawer open anchor="bottom" onClose={onClose}>
      <div role="presentation" onKeyDown={onKeyDown} onClick={onClose}>
        <List>
          {shareItems.map(({ text, Icon, iconText, onClick }) => (
            <ListItem button sx={{ height: 65 }} key={text} onClick={onClick}>
              <AppBox alignItems="center" sx={{ width: 240, margin: '0 auto' }}>
                <ListItemIcon>{Icon ? <Icon color="secondary" /> : iconText}</ListItemIcon>
                <ListItemText primary={text} sx={{ color: theme.palette.text.disabled }} />
              </AppBox>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  )
}

export default Menu
