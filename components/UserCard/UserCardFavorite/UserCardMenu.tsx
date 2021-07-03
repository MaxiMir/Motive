import { useState, MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { IconButton, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import useFavorite from 'hook/useFavorite'

const Share = dynamic(() => import('components/Share'))
const Menu = dynamic(() => import('@material-ui/core/Menu'))

interface UserCardFavoriteMenuProps {
  id: string
  name: string
  href: string
}

const UserCardMenu = ({ id, name, href }: UserCardFavoriteMenuProps): JSX.Element => {
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
      <IconButton className={classes.button} title="open user menu" onClick={onClick}>
        <MoreHorizIcon fontSize="small" color="secondary" className={classes.icon} />
      </IconButton>
      {anchorEl && (
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
      )}
      <Share open={withShare} title={name} href={href} onClose={() => setWithShare(false)} />
    </>
  )
}

const useStyles = makeStyles({
  button: {
    padding: 3,
  },
  icon: {
    fontSize: '1.5rem',
  },
})

export default UserCardMenu
