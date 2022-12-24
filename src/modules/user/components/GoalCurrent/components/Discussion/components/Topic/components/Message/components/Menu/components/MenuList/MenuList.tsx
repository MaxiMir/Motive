import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu, MenuItem } from '@mui/material'
import { MessageDto } from '@features/topic'
import useClient from '@hooks/useClient'
import AppMenuItemContent from '@ui/AppMenuItemContent'
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
          <MenuItem onClick={onOpenModal}>
            <AppMenuItemContent icon="edit" text={messages.editText} />
          </MenuItem>
        ) : (
          <MenuItem onClick={onOpenReport}>
            <AppMenuItemContent icon="outlined_flag" text={messages.reportText} />
          </MenuItem>
        )}
      </Menu>
      {withReport && (
        <Report entityId={message.id} type="message" anchorEl={anchorEl} onClose={onCloseReport} />
      )}
    </>
  )
}

export default MenuList
