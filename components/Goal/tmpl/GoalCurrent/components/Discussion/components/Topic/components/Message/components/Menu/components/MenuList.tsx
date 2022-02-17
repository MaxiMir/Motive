import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu, MenuItem } from '@material-ui/core'
import { MessageDto, UserBaseDto } from 'dto'
import AppMenuItemContent from 'components/UI/AppMenuItemContent'

const Report = dynamic(() => import('components/Report'))
const Modal = dynamic(() => import('components/Modal'))

interface MenuListProps {
  anchorEl: HTMLElement
  message: MessageDto
  client?: UserBaseDto
  onClose: () => void
}

export default function MenuList({ anchorEl, message, client, onClose }: MenuListProps): JSX.Element {
  const [withReport, setWithReport] = useState(false)
  const [withEdit, setWithEdit] = useState(false)

  const onOpenReport = () => setWithReport(true)

  const onCloseReport = () => {
    setWithReport(false)
    onClose()
  }

  const onCloseModal = () => {
    setWithEdit(false)
    onClose()
  }

  return (
    <>
      <Menu id="goal-menu" anchorEl={anchorEl} keepMounted open onClose={onClose}>
        {message.user.id === client?.id ? (
          <MenuItem onClick={() => setWithEdit(true)}>
            <AppMenuItemContent icon="edit" text="Edit" />
          </MenuItem>
        ) : (
          <MenuItem onClick={onOpenReport}>
            <AppMenuItemContent icon="outlined_flag" text="Report" />
          </MenuItem>
        )}
        <MenuItem onClick={onClose}>
          <AppMenuItemContent icon="not_interested" text="Cancel" />
        </MenuItem>
      </Menu>
      {withReport && (
        <Report entityId={message.id} type="message" anchorEl={anchorEl} client={client} onClose={onCloseReport} />
      )}
      {withEdit && <Modal tmpl="edit-message" message={message} onClose={onCloseModal} />}
    </>
  )
}
