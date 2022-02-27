import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { RoleDto } from 'dto'
import Share from 'components/Share'
import AppMenuButton from 'components/UI/AppMenuButton'

const MenuList = dynamic(() => import('./components/MenuList'))

interface MenuProps {
  goalId: number
  title: string
  href: string
  role: RoleDto
}

export default function Menu({ goalId, title, href, role }: MenuProps): JSX.Element {
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
      {anchorEl && <MenuList anchorEl={anchorEl} goalId={goalId} role={role} onShare={onShare} onClose={onClose} />}
      <Share open={withShare} title={title} href={href} onClose={() => setWithShare(false)} />
    </>
  )
}
