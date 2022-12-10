import { useState, MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { UserDto, getUserHref } from '@features/user'
import AppMenuButton from '@ui/AppMenuButton'
import { useRemoveFollowing } from '@features/subscription'

const Share = dynamic(() => import('@components/Share'))
const MenuList = dynamic(() => import('./components/MenuList'))

interface MenuProps {
  user: UserDto
  index: number
}

function Menu({ user, index }: MenuProps) {
  const { name, nickname } = user
  const { formatMessage } = useIntl()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [withShare, setWithShare] = useState(false)
  const onRemove = useRemoveFollowing()
  const href = getUserHref(nickname)
  const title = formatMessage({ id: 'page.following.menu.title' })
  const ariaControls = formatMessage({ id: 'page.following.menu.aria' })

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
      <AppMenuButton title={title} ariaControls={ariaControls} horizontal onClick={onOpen} />
      {anchorEl && <MenuList anchorEl={anchorEl} onShare={onShare} onRemove={onRemoveCombine} onClose={onClose} />}
      {withShare && <Share title={name} href={href} onClose={onCloseShare} />}
    </>
  )
}

export default Menu
