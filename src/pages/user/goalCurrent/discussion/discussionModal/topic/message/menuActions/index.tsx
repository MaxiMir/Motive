import { IconButton, MenuItem, Box, Menu } from '@mui/material'
import { MouseEvent, useId, useState } from 'react'
import dynamic from 'next/dynamic'
import { useClient } from 'entities/viewer'
import { MessageDto } from 'shared/api'
import { copyText } from 'shared/lib/helpers'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import ListItem from 'shared/ui/ListItem'
import { useSnackbar } from 'shared/ui/snackbar'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useMessages } from './lib'

const CreateReport = dynamic(() => import('features/report/create-report'))
const EditTopicModal = dynamic(() => import('features/topic/edit-topic'))

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
  const { enqueueSnackbar } = useSnackbar()
  const canEdit = message.user.id === client?.id
  const open = Boolean(anchorEl)

  const onOpenMenu = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onCloseMenu = () => setAnchorEl(null)

  const onSuccess = () => {
    enqueueSnackbar(messages.copiedText, { severity: 'success', icon: '⌨️' })
  }

  const onError = () => {
    enqueueSnackbar(messages.errorText, { severity: 'error', icon: '☠️' })
  }

  const onCopy = () => copyText(message.text).then(onSuccess).catch(onError).finally(onCloseMenu)

  const toggleEdit = () => {
    toggleEditing()
    onCloseMenu()
  }

  const onCloseReport = () => {
    onCloseMenu()
    toggleReporting()
  }

  return (
    <>
      <Box display="flex" alignItems="center" marginLeft="auto">
        <TooltipArrow title={messages.title}>
          <IconButton
            id={id}
            size="small"
            aria-controls={open ? menuId : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            sx={{ padding: '3px' }}
            onClick={onOpenMenu}
          >
            <Icon name="more_horiz" />
          </IconButton>
        </TooltipArrow>
      </Box>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          'aria-labelledby': id,
        }}
        onClose={onCloseMenu}
      >
        <MenuItem onClick={onCopy}>
          <ListItem icon="content_copy" primary={messages.copyText} />
        </MenuItem>
        {canEdit ? (
          <MenuItem onClick={toggleEdit}>
            <ListItem icon="edit" primary={messages.editText} />
          </MenuItem>
        ) : (
          <MenuItem onClick={toggleReporting}>
            <ListItem icon="outlined_flag" primary={messages.reportText} color="error.dark" />
          </MenuItem>
        )}
        <MenuItem onClick={onCloseMenu}>
          <ListItem icon="block" primary={messages.cancelText} color="grey" />
        </MenuItem>
      </Menu>
      {reporting && (
        <CreateReport id={message.id} type="message" anchorEl={anchorEl} onClose={onCloseReport} />
      )}
      {editing && <EditTopicModal message={message} onClose={toggleEdit} />}
    </>
  )
}

export default MenuActions
