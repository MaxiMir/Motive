import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import Share from 'components/Share'
import AppMenuButton from 'components/UI/AppMenuButton'

const MenuList = dynamic(() => import('./components/MenuList'))

interface MenuProps {
  goalId: number
  title: string
  href: string
  isOwner: boolean
}

export default function Menu({ goalId, title, href, isOwner }: MenuProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [withShare, setWithShare] = useState(false)

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const onShare = () => {
    onClose()
    setWithShare(true)
  }

  return (
    <>
      <AppMenuButton ariaControls="goal-menu" title="open goal menu" onClick={onOpen} />
      {anchorEl && (
        <MenuList anchorEl={anchorEl} goalId={goalId} isOwner={isOwner} onShare={onShare} onClose={onClose} />
      )}
      <Share open={withShare} title={title} href={href} onClose={() => setWithShare(false)} />
    </>
  )
}
