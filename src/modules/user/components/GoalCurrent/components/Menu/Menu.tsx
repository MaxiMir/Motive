import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { GoalDto, OwnershipDto } from '@dto'
import AppMenuButton from '@ui/AppMenuButton'

const Share = dynamic(() => import('@components/Share'))
const ModalLeave = dynamic(() => import('./components/ModalLeave'))
const MenuList = dynamic(() => import('./components/MenuList'))

interface MenuProps {
  goal: GoalDto
  title: string
  href: string
  clientOwnership: OwnershipDto
}

function Menu({ goal, title, href, clientOwnership }: MenuProps) {
  const { formatMessage } = useIntl()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [withShare, setWithShare] = useState(false)
  const [withLeave, setWithLeave] = useState(false)
  const buttonTitle = formatMessage({ id: 'page.user.goal-current.open-menu' })
  const ariaControls = formatMessage({ id: 'page.user.goal-current.open-menu-area' })

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
      <AppMenuButton title={buttonTitle} ariaControls={ariaControls} aria-label={buttonTitle} onClick={onOpen} />
      {anchorEl && (
        <MenuList
          anchorEl={anchorEl}
          goalId={goal.id}
          clientOwnership={clientOwnership}
          onShare={onShare}
          onLeave={onLeave}
          onClose={onClose}
        />
      )}
      {withShare && <Share title={title} href={href} onClose={onCloseShare} />}
      {withLeave && <ModalLeave goal={goal} clientOwnership={clientOwnership} onClose={onLeaveClose} />}
    </>
  )
}

export default Menu
