import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { GoalDto, OwnershipDto } from 'dto'
import useLocale from 'hooks/useLocale'
import AppMenuButton from 'components/UI/AppMenuButton'
import i18n from './i18n'

const Modal = dynamic(() => import('components/Modal'))
const Share = dynamic(() => import('components/Share'))
const MenuList = dynamic(() => import('./components/MenuList'))

interface MenuProps {
  goal: GoalDto
  title: string
  href: string
  clientOwnership: OwnershipDto
}

export default function Menu({ goal, title, href, clientOwnership }: MenuProps): JSX.Element {
  const { locale } = useLocale()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [withShare, setWithShare] = useState(false)
  const [withLeave, setWithLeave] = useState(false)
  const { buttonTitle, ariaControls } = i18n[locale]

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const onShare = () => {
    onClose()
    setWithShare(true)
  }

  const onCloseShare = () => setWithShare(false)

  const onLeave = () => {
    onClose()
    setWithLeave(true)
  }

  const onLeaveClose = () => setWithLeave(false)

  return (
    <>
      <AppMenuButton ariaControls={ariaControls} title={buttonTitle} onClick={onOpen} />
      {anchorEl && (
        <MenuList
          anchorEl={anchorEl}
          goalId={goal.id}
          clientOwnership={clientOwnership}
          locale={locale}
          onShare={onShare}
          onLeave={onLeave}
          onClose={onClose}
        />
      )}
      {withShare && <Share title={title} href={href} locale={locale} onClose={onCloseShare} />}
      {withLeave && <Modal tmpl="leave" goal={goal} clientOwnership={clientOwnership} onClose={onLeaveClose} />}
    </>
  )
}
