import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { MessageDto, UserBaseDto } from 'dto'
import AppMenuButton from 'components/UI/AppMenuButton'

const MenuList = dynamic(() => import('./components/MenuList'))

interface MenuProps {
  message: MessageDto
  client?: UserBaseDto
}

export default function Menu({ message, client }: MenuProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  return (
    <>
      <AppMenuButton color="primary" ariaControls="message-menu" title="open message menu" compact onClick={onOpen} />
      {anchorEl && <MenuList anchorEl={anchorEl} client={client} message={message} onClose={onClose} />}
    </>
  )
}
