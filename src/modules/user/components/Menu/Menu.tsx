import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useUserContext } from '@modules/user/hooks'
import AppIcon from '@ui/AppIcon'
import GreyButton from '@ui/styled/GreyButton'
import { useMessages } from './hooks/useMessages'

const Share = dynamic(() => import('@components/Share'))
const MenuActions = dynamic(() => import('./components/MenuActions'))

function Menu() {
  const { asPath } = useRouter()
  const { id, name } = useUserContext()
  const messages = useMessages()
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
      <GreyButton
        size="small"
        aria-label={messages.title}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        endIcon={<AppIcon name="expand_more" />}
        sx={{
          minWidth: '96px',
          height: 30,
          paddingX: 1,
        }}
        onClick={onOpen}
      >
        {messages.title}
      </GreyButton>
      {anchorEl && <MenuActions anchorEl={anchorEl} id={id} onShare={onShare} onClose={onClose} />}
      {withShare && <Share title={name} href={asPath} onClose={onCloseShare} />}
    </>
  )
}

export default Menu
