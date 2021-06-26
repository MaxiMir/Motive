import { useState, MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { createStyles, IconButton, Menu, MenuItem } from '@material-ui/core'
import { useFavorite } from 'hook/useFavorite'
import { makeStyles } from '@material-ui/core/styles'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

const Share = dynamic(() => import('components/Share'))

interface UserCardFavoriteMenuProps {
  id: string
  name: string
  link: string
}

const UserCardMenu = ({ id, name, link }: UserCardFavoriteMenuProps) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [withShare, setWithShare] = useState(false)
  const [, onRemoveFromFavorite] = useFavorite(id)

  const onClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const onShare = () => {
    onCloseMenu()
    setWithShare(true)
  }

  const onRemove = () => {
    onCloseMenu()
    onRemoveFromFavorite()
  }

  const onCloseMenu = () => setAnchorEl(null)

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
        onClose={onCloseMenu}
      >
        <MenuItem onClick={onShare}>Share</MenuItem>
        <MenuItem onClick={onRemove}>Remove from Favorites</MenuItem>
      </Menu>
      {withShare && (
        <Share title={name} urn={link} onClose={() => setWithShare(false)} />
      )}
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

export default UserCardMenu
