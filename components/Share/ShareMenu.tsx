import React from 'react'
import {
  createStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Twitter, Link, Email, Sms } from '@material-ui/icons'
import { onClick } from './helper'
import AppBox from 'components/UI/AppBox'
import { FacebookIcon, TelegramIcon, VKIcon } from 'components/UI/icons'

interface ShareMenuProps {
  title: string
  url: string
  onClose: () => void
}

const SHARE_ITEMS = [
  {
    text: 'Share to Facebook',
    Icon: FacebookIcon,
    onClick: (title: string, url: string) => onClick('facebook', title, url),
  },
  {
    text: 'Share to Twitter',
    Icon: Twitter,
    onClick: (title: string, url: string) => onClick('twitter', title, url),
  },
  {
    text: 'Share to VK',
    Icon: VKIcon,
    onClick: (title: string, url: string) => onClick('vk', title, url),
  },
  {
    text: 'Share to Telegram',
    Icon: TelegramIcon,
    onClick: (title: string, url: string) => onClick('telegram', title, url),
  },
  {
    text: 'Send to Email',
    Icon: Email,
    onClick: (title: string, url: string) => onClick('email', title, url),
  },
  {
    text: 'Send to SMS',
    Icon: Sms,
    onClick: (title: string, url: string) => onClick('sms', title, url),
  },
  {
    text: 'Copy link',
    Icon: Link,
  },
]

const ShareMenu = ({ title, url, onClose }: ShareMenuProps) => {
  const classes = useStyles()

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (['Tab', 'Shift'].includes(event.key)) {
      return
    }

    onClose()
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch (e) {
      console.error('Something went wrong', e) // TODO
    }
  }

  return (
    <Drawer open anchor="bottom" onClose={onClose}>
      <div role="presentation" onKeyDown={onKeyDown} onClick={onClose}>
        <List>
          {SHARE_ITEMS.map(({ text, Icon, onClick }) => (
            <ListItem
              button
              onClick={!onClick ? onCopy : () => onClick(title, url)}
              className={classes.listItem}
              key={text}
            >
              <AppBox alignItems="center" className={classes.listBox}>
                <ListItemIcon>
                  <Icon className={classes.icon} />
                </ListItemIcon>
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
      width: '100vw',
      height: 65,
    },
    listBox: {
      width: 225,
      margin: '0 auto',
    },
    icon: {
      color: theme.palette.warning.light,
    },
    text: {
      color: theme.palette.text.disabled,
    },
  }),
)

export default ShareMenu
