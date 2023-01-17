import { MouseEvent, useId, useState } from 'react'
import dynamic from 'next/dynamic'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MessageDto } from '@features/topic'
import AppListItem from '@ui/AppListItem'
import useClient from '@hooks/useClient'
import useToggle from '@hooks/useToggle'
import AppIcon from '@ui/AppIcon'
import TooltipArrow from '@ui/styled/TooltipArrow'
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
    onClose()
    toggleReporting()
  }

  return (
    <>
      <TooltipArrow title={messages.title}>
        <IconButton
          id={id}
          size="small"
          aria-controls={open ? menuId : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{ padding: '3px' }}
          onClick={onOpen}
        >
          <AppIcon name="more_horiz" />
        </IconButton>
      </TooltipArrow>
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
          <MenuItem onClick={toggleEdit}>
            <AppListItem icon="edit" primary={messages.editText} />
          </MenuItem>
        ) : (
          <MenuItem onClick={toggleReporting}>
            <AppListItem icon="outlined_flag" primary={messages.reportText} color="error.dark" />
          </MenuItem>
        )}
        <MenuItem onClick={onClose}>
          <AppListItem icon="block" primary={messages.cancelText} color="grey" />
        </MenuItem>
      </Menu>
      {reporting && (
        <Report id={message.id} type="message" anchorEl={anchorEl} onClose={onCloseReport} />
      )}
      {editing && <EditModal message={message} onClose={toggleEdit} />}
    </>
  )
}

export default MenuActions
