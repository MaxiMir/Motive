import { useState, MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import Share from 'components/Share'
import AppMenuButton from 'components/UI/AppMenuButton'

const MenuList = dynamic(() => import('./components/MenuList'))

interface MenuProps {
  title: string
  href: string
  onRemove: () => void
}

const Menu = ({ title, href, onRemove }: MenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [withShare, setWithShare] = useState(false)

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const onShare = () => {
    onClose()
    setWithShare(true)
  }

  const onRemoveCombine = () => {
    onClose()
    onRemove()
  }

  const onCloseShare = () => setWithShare(false)

  return (
    <>
      <AppMenuButton ariaControls="user-menu" title="open user menu" horizontal onClick={onOpen} />
      {anchorEl && <MenuList anchorEl={anchorEl} onShare={onShare} onRemove={onRemoveCombine} onClose={onClose} />}
      <Share open={withShare} title={title} href={href} onClose={onCloseShare} />
    </>
  )
}

export default Menu
