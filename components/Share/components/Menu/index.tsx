import { KeyboardEvent } from 'react'
import { createStyles, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AppBox from 'components/UI/AppBox'
import { FacebookIcon, TelegramIcon, TwitterIcon, VKIcon } from 'components/UI/icons'
import AppIcon from 'components/UI/AppIcon'
import { clickHandler, copyHandler } from './helper'

interface MenuProps {
  title: string
  url: string
  onCopyEnd: () => void
  onCopyError: () => void
  onClose: () => void
}

const Menu = ({ title, url, onCopyEnd, onCopyError, onClose }: MenuProps): JSX.Element => {
  const classes = useStyles()
  const shareItems = getShareItems()

  const onKeyDown = (event: KeyboardEvent) => {
    if (['Tab', 'Shift'].includes(event.key)) {
      return
    }

    onClose()
  }

  function getShareItems() {
    return [
      {
        text: 'Share to Facebook',
        Icon: FacebookIcon,
        onClick: () => clickHandler('facebook', title, url),
      },
      {
        text: 'Share to Twitter',
        Icon: TwitterIcon,
        onClick: () => clickHandler('twitter', title, url),
      },
      {
        text: 'Share to VK',
        Icon: VKIcon,
        onClick: () => clickHandler('vk', title, url),
      },
      {
        text: 'Share to Telegram',
        Icon: TelegramIcon,
        onClick: () => clickHandler('telegram', title, url),
      },
      {
        text: 'Send to Email',
        iconText: <AppIcon name="email" color="secondary" />,
        onClick: () => clickHandler('email', title, url),
      },
      {
        text: 'Send to SMS',
        iconText: <AppIcon name="sms" color="secondary" />,
        onClick: () => clickHandler('sms', title, url),
      },
      {
        text: 'Copy link',
        iconText: <AppIcon name="link" color="secondary" />,
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
      width: 200,
      margin: '0 auto',
    },
    text: {
      color: theme.palette.text.disabled,
    },
  }),
)

export default Menu
