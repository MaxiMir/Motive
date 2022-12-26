import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useUserContext } from '@modules/user/hooks'
import AppMenuButton from '@ui/AppMenuButton'
import { useMessages } from './hooks/useMessages'

const Share = dynamic(() => import('@components/Share'))
const MenuList = dynamic(() => import('./components/MenuList'))

function Menu() {
  const { asPath } = useRouter()
  const messages = useMessages()
  const { name } = useUserContext()
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
      <AppMenuButton
        title={messages.title}
        color="primary"
        ariaControls={messages.ariaControls}
        horizontal
        onClick={onOpen}
      />
      {anchorEl && <MenuList anchorEl={anchorEl} onShare={onShare} onClose={onClose} />}
      {withShare && <Share title={name} href={asPath} onClose={onCloseShare} />}
    </>
  )
}

export default Menu
