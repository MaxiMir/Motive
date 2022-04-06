import { useState, MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { UserDto } from 'dto'
import useLocale from 'hooks/useLocale'
import { getUserHref } from 'views/UserView/helper'
import AppMenuButton from 'components/UI/AppMenuButton'
import useRemoveFollowing from './hook'
import i18n from './i18n'

const Share = dynamic(() => import('components/Share'))
const MenuList = dynamic(() => import('./components/MenuList'))

interface MenuProps {
  user: UserDto
  index: number
}

const Menu = ({ user, index }: MenuProps): JSX.Element => {
  const { name, nickname } = user
  const { locale } = useLocale()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [withShare, setWithShare] = useState(false)
  const onRemove = useRemoveFollowing(locale)
  const href = getUserHref(nickname)
  const { title, ariaControls } = i18n[locale]

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
      {anchorEl && (
        <MenuList anchorEl={anchorEl} locale={locale} onShare={onShare} onRemove={onRemoveCombine} onClose={onClose} />
      )}
      {withShare && <Share title={name} href={href} locale={locale} onClose={onCloseShare} />}
    </>
  )
}

export default Menu
