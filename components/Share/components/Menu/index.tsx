import { KeyboardEvent } from 'react'
import { createStyles, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
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
  const classes = useStyles()
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
        iconText: <AppIcon name="email" color="secondary" />,
        onClick: () => clickHandler('email', title, url),
      },
      {
        text: `${send} SMS`,
        iconText: <AppIcon name="sms" color="secondary" />,
        onClick: () => clickHandler('sms', title, url),
      },
      {
        text: link,
        iconText: <AppIcon name="content_copy" color="secondary" />,
        onClick: () => copyHandler(url, onCopyEnd, onCopyError),
      },
    ]
  }

  return (
    <Drawer open anchor="bottom" onClose={onClose}>
      <div role="presentation" onKeyDown={onKeyDown} onClick={onClose}>
        <List>
          {shareItems.map(({ text, Icon, iconText, onClick }) => (
            <ListItem button onClick={onClick} className={classes.listItem} key={text}>
              <AppBox alignItems="center" className={classes.listBox}>
                <ListItemIcon>{Icon ? <Icon color="secondary" /> : iconText}</ListItemIcon>
                <ListItemText primary={text} className={classes.text} />
              </AppBox>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    listItem: {
      height: 65,
    },
    listBox: {
      width: 240,
      margin: '0 auto',
    },
    text: {
      color: theme.palette.text.disabled,
    },
  }),
)

export default Menu
