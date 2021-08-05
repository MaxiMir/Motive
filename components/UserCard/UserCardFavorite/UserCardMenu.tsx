import { useState } from 'react'
import dynamic from 'next/dynamic'
import { MenuItem } from '@material-ui/core'
import useFavorite from 'hooks/useFavorite'
import Share from 'components/Share'
import AppMenuButton from 'components/UI/AppMenuButton'
import AppSnackbar from 'components/UI/AppSnackbar'

const Menu = dynamic(() => import('@material-ui/core/Menu'))

interface UserCardFavoriteMenuProps {
  id: string
  title: string
  href: string
}

const UserCardMenu = ({ id, title, href }: UserCardFavoriteMenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [withShare, setWithShare] = useState(false)
  const [message, setMessage] = useState<string>()
  const [, onChangeFavorite] = useFavorite(id, true)

  const onShare = () => {
    onCloseMenu()
    setWithShare(true)
  }

  const onRemove = () => {
    onCloseMenu()
    onChangeFavorite()
    setMessage('Removed from favorites')
  }

  const onCloseMenu = () => setAnchorEl(null)

  return (
    <>
      <AppMenuButton ariaControls="user-menu" title="open user menu" onClick={(e) => setAnchorEl(e.currentTarget)} />
      {anchorEl && (
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          keepMounted
          open={!!anchorEl}
          PaperProps={{
            style: {
              paddingLeft: 15,
              paddingRight: 15,
            },
          }}
          onClose={onCloseMenu}
        >
          <MenuItem onClick={onShare}>Share</MenuItem>
          <MenuItem onClick={onRemove}>Remove from Favorites</MenuItem>
          <MenuItem onClick={onCloseMenu}>Cancel</MenuItem>
        </Menu>
      )}
      <Share open={withShare} title={title} href={href} onClose={() => setWithShare(false)} />
      {message && (
        <AppSnackbar severity="success" autoHideDuration={3000} onClose={() => setMessage(undefined)}>
          {message}
        </AppSnackbar>
      )}
    </>
  )
}

export default UserCardMenu
