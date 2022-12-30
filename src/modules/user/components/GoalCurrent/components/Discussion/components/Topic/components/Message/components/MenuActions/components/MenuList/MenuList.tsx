import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu } from '@mui/material'
import { MessageDto } from '@features/topic'
import useClient from '@hooks/useClient'
import AppMenuItem from '@ui/AppMenuItem'
import { useMessages } from './hooks/useMessages'

const Report = dynamic(() => import('@features/report'))

interface MenuListProps {
  anchorEl: HTMLElement
  message: MessageDto
  onOpenModal: () => void
  onClose: () => void
}

function MenuList({ anchorEl, message, onOpenModal, onClose }: MenuListProps) {
  const client = useClient()
  const messages = useMessages()
  const [withReport, setWithReport] = useState(false)

  const onOpenReport = () => setWithReport(true)

  const onCloseReport = () => {
    setWithReport(false)
    onClose()
  }

  return (
    <>
      <Menu id="goal-menu" anchorEl={anchorEl} open onClose={onClose}>
        {message.user.id === client?.id ? (
          <AppMenuItem icon="edit" text={messages.editText} onClick={onOpenModal} />
        ) : (
          <AppMenuItem icon="outlined_flag" text={messages.reportText} onClick={onOpenReport} />
        )}
      </Menu>
      {withReport && (
        <Report entityId={message.id} type="message" anchorEl={anchorEl} onClose={onCloseReport} />
      )}
    </>
  )
}

export default MenuList
