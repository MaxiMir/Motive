import { FC, useState, MouseEvent, useCallback } from 'react'
import { createStyles, IconButton, Menu, MenuItem } from '@material-ui/core'
import { useFavorite } from 'hook/useFavorite'
import { makeStyles } from '@material-ui/core/styles'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

interface UserCardCompactMenuProps {
  id: string
  link: string
}

const UserCardCompactMenu: FC<UserCardCompactMenuProps> = ({ id, link }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [, onRemoveFromFavorite] = useFavorite(id)

  const onClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(link)
    } catch (e) {
      console.error('Something went wrong', e) // TODO
    } finally {
      onClose()
    }
  }, [link])

  const onRemove = () => {
    onRemoveFromFavorite()
    onClose()
  }

  const onClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton className={classes.button} onClick={onClick}>
        <MoreHorizIcon fontSize="small" className={classes.icon} />
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={!!anchorEl}
        onClose={onClose}
      >
        <MenuItem onClick={onCopy}>Copy Link</MenuItem>
        <MenuItem onClick={onRemove}>Remove from Favorites</MenuItem>
      </Menu>
    </>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      padding: 3,
    },
    icon: {
      fontSize: '1.5rem',
      color: theme.palette.warning.light,
    },
  }),
)

export default UserCardCompactMenu
