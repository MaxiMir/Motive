import { useState, MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { UserDto } from 'dto'
import { getUserHref } from 'views/UserView/helper'
import AppMenuButton from 'components/UI/AppMenuButton'
import Share from 'components/Share'
import useRemoveFollowing from './hook'

const MenuList = dynamic(() => import('./components/MenuList'))

interface MenuProps {
  user: UserDto
  index: number
}

const Menu = ({ user, index }: MenuProps): JSX.Element => {
  const { name, nickname } = user
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [withShare, setWithShare] = useState(false)
  const onRemove = useRemoveFollowing()
  const href = getUserHref(nickname)

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const onShare = () => {
    onClose()
    setWithShare(true)
  }

  const onRemoveCombine = () => {
    onClose()
    onRemove(user, index)
  }

  const onCloseShare = () => setWithShare(false)

  return (
    <>
      <AppMenuButton ariaControls="user-menu" title="open user menu" horizontal onClick={onOpen} />
      {anchorEl && <MenuList anchorEl={anchorEl} onShare={onShare} onRemove={onRemoveCombine} onClose={onClose} />}
      <Share open={withShare} title={name} href={href} onClose={onCloseShare} />
    </>
  )
}

export default Menu
