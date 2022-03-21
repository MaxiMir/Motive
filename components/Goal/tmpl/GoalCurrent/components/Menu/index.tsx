import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import Share from 'components/Share'
import AppMenuButton from 'components/UI/AppMenuButton'

const MenuList = dynamic(() => import('./components/MenuList'))

interface MenuProps {
  goalId: number
  title: string
  href: string
  clientGoal: boolean
}

export default function Menu({ goalId, title, href, clientGoal }: MenuProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [withShare, setWithShare] = useState(false)

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const onShare = () => {
    onClose()
    setWithShare(true)
  }

  const onCloseShare = () => setWithShare(false)

  return (
    <>
      <AppMenuButton ariaControls="goal-menu" title="Open goal menu" onClick={onOpen} />
      {anchorEl && (
        <MenuList anchorEl={anchorEl} goalId={goalId} clientGoal={clientGoal} onShare={onShare} onClose={onClose} />
      )}
      <Share open={withShare} title={title} href={href} onClose={onCloseShare} />
    </>
  )
}
