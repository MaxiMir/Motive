import { IconButton, MenuItem, Box, Menu } from '@mui/material'
import { MouseEvent, useId, useState } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useViewer } from 'entities/viewer'
import { MessageDto } from 'shared/api'
import { copy } from 'shared/lib/helpers'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/icon'
import ListItem from 'shared/ui/list-item'
import { useSnackbar } from 'shared/ui/snackbar'
import TooltipArrow from 'shared/ui/tooltip-arrow'

const CreateReport = dynamic(() => import('features/report/create-report'))
const EditTopicModal = dynamic(() => import('features/topic/edit-topic'))

interface MenuActsProps {
  message: MessageDto
}

function MenuActs({ message }: MenuActsProps) {
  const id = useId()
  const menuId = useId()
  const viewer = useViewer()
  const { formatMessage } = useIntl()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [editing, toggleEditing] = useToggle()
  const [reporting, toggleReporting] = useToggle()
  const { enqueueSnackbar } = useSnackbar()
  const canEdit = message.user.id === viewer?.id
  const open = Boolean(anchorEl)
  const title = formatMessage({ id: 'page.user.message-menu.title' })
  const copyText = formatMessage({ id: 'common.copy' })
  const copiedText = formatMessage({ id: 'common.copied' })
  const editText = formatMessage({ id: 'common.edit' })
  const reportText = formatMessage({ id: 'common.report' })
  const errorText = formatMessage({ id: 'common.error' })
  const cancelText = formatMessage({ id: 'common.cancel' })

  const onOpenMenu = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onCloseMenu = () => setAnchorEl(null)

  const onSuccess = () => {
    enqueueSnackbar(copiedText, { severity: 'success', icon: '⌨️' })
  }

  const onError = () => {
    enqueueSnackbar(errorText, { severity: 'error', icon: '☠️' })
  }

  const onCopy = () => copy(message.text).then(onSuccess).catch(onError).finally(onCloseMenu)

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
        <TooltipArrow title={title}>
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
          <ListItem icon="content_copy" primary={copyText} />
        </MenuItem>
        {canEdit ? (
          <MenuItem onClick={toggleEdit}>
            <ListItem icon="edit" primary={editText} />
          </MenuItem>
        ) : (
          <MenuItem onClick={toggleReporting}>
            <ListItem icon="outlined_flag" primary={reportText} color="error.dark" />
          </MenuItem>
        )}
        <MenuItem onClick={onCloseMenu}>
          <ListItem icon="block" primary={cancelText} color="grey" />
        </MenuItem>
      </Menu>
      {reporting && (
        <CreateReport id={message.id} type="message" anchorEl={anchorEl} onClose={onCloseReport} />
      )}
      {editing && <EditTopicModal message={message} onClose={toggleEdit} />}
    </>
  )
}

export default MenuActs
