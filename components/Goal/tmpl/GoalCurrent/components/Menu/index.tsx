import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { GoalDto, OwnershipDto } from 'dto'
import Share from 'components/Share'
import AppMenuButton from 'components/UI/AppMenuButton'

const Modal = dynamic(() => import('components/Modal'))
const MenuList = dynamic(() => import('./components/MenuList'))

interface MenuProps {
  goal: GoalDto
  title: string
  href: string
  clientOwnership: OwnershipDto
}

export default function Menu({ goal, title, href, clientOwnership }: MenuProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [withShare, setWithShare] = useState(false)
  const [withLeave, setWithLeave] = useState(false)

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
      <AppMenuButton ariaControls="goal-menu" title="Open goal menu" onClick={onOpen} />
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
      <Share open={withShare} title={title} href={href} onClose={onCloseShare} />
      {withLeave && <Modal tmpl="leave" goal={goal} clientOwnership={clientOwnership} onClose={onLeaveClose} />}
    </>
  )
}
