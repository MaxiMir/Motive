import { MouseEvent, useId, useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu } from '@mui/material'
import { MessageDto } from '@features/topic'
import AppMenuButton from '@ui/AppMenuButton'
import AppMenuItem from '@ui/AppMenuItem'
import useClient from '@hooks/useClient'
import useToggle from '@hooks/useToggle'
import { useMessages } from './hooks/useMessages'

const Report = dynamic(() => import('@features/report'))
const EditModal = dynamic(() => import('./components/EditModal'))

interface MenuActionsProps {
  message: MessageDto
}

function MenuActions({ message }: MenuActionsProps) {
  const id = useId()
  const menuId = useId()
  const client = useClient()
  const messages = useMessages()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [editing, toggleEditing] = useToggle()
  const [reporting, toggleReporting] = useToggle()
  const canEdit = message.user.id === client?.id
  const open = Boolean(anchorEl)

  const onOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const toggleEdit = () => {
    toggleEditing()
    onClose()
  }

  const onCloseReport = () => {
    toggleReporting()
    onClose()
  }

  return (
    <>
      <AppMenuButton
        id={id}
        title={messages.title}
        color="primary"
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={onOpen}
      />
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          'aria-labelledby': id,
        }}
        onClose={onClose}
      >
        {canEdit ? (
          <AppMenuItem icon="edit" text={messages.editText} onClick={toggleEdit} />
        ) : (
          <AppMenuItem
            icon="outlined_flag"
            text={messages.reportText}
            color="error.dark"
            onClick={toggleReporting}
          />
        )}
        <AppMenuItem icon="block" text={messages.cancelText} color="grey" onClick={onClose} />
      </Menu>
      {reporting && (
        <Report entityId={message.id} type="message" anchorEl={anchorEl} onClose={onCloseReport} />
      )}
      {editing && <EditModal message={message} onClose={toggleEdit} />}
    </>
  )
}

export default MenuActions
