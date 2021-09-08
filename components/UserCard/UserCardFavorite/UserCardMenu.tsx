import { useState } from 'react'
import dynamic from 'next/dynamic'
import { MenuItem } from '@material-ui/core'
import Share from 'components/Share'
import AppMenuButton from 'components/UI/AppMenuButton'

const Menu = dynamic(() => import('@material-ui/core/Menu'))

interface UserCardFavoriteMenuProps {
  title: string
  href: string
  onRemove: () => void
}

const UserCardMenu = ({ title, href, onRemove }: UserCardFavoriteMenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [withShare, setWithShare] = useState(false)

  const onShare = () => {
    onCloseMenu()
    setWithShare(true)
  }

  const onRemoveCombine = () => {
    onCloseMenu()
    onRemove()
  }

  const onCloseMenu = () => setAnchorEl(null)

  return (
    <>
      <AppMenuButton
        ariaControls="user-menu"
        title="open user menu"
        isHorizontal
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />
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
          <MenuItem onClick={onRemoveCombine}>Remove from Favorites</MenuItem>
          <MenuItem onClick={onCloseMenu}>Cancel</MenuItem>
        </Menu>
      )}
      <Share open={withShare} title={title} href={href} onClose={() => setWithShare(false)} />
    </>
  )
}

export default UserCardMenu
