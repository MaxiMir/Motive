import { useState } from 'react'
import dynamic from 'next/dynamic'
import { MenuItem } from '@material-ui/core'
import Share from 'components/Share'
import AppMenuButton from 'components/UI/AppMenuButton'

const MUMenu = dynamic(() => import('@material-ui/core/Menu'))

interface MenuProps {
  title: string
  href: string
  onRemove: () => void
}

const Menu = ({ title, href, onRemove }: MenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
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

  const onCloseShare = () => setWithShare(false)

  return (
    <>
      <AppMenuButton
        ariaControls="user-menu"
        title="open user menu"
        horizontal
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />
      {anchorEl && (
        <MUMenu id="user-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={onCloseMenu}>
          <MenuItem onClick={onShare}>Share</MenuItem>
          <MenuItem onClick={onRemoveCombine}>Remove from Favorites</MenuItem>
          <MenuItem onClick={onCloseMenu}>Cancel</MenuItem>
        </MUMenu>
      )}
      <Share open={withShare} title={title} href={href} onClose={onCloseShare} />
    </>
  )
}

export default Menu
