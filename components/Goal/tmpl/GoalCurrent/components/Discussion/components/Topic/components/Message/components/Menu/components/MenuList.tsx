import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Divider, Menu, MenuItem } from '@material-ui/core'
import { MessageDto } from 'dto'
import useClient from 'hooks/useClient'
import AppMenuItemContent from 'components/UI/AppMenuItemContent'

const Report = dynamic(() => import('components/Report'))

interface MenuListProps {
  anchorEl: HTMLElement
  message: MessageDto
  onOpenModal: () => void
  onClose: () => void
}

export default function MenuList({ anchorEl, message, onOpenModal, onClose }: MenuListProps): JSX.Element {
  const client = useClient()
  const [withReport, setWithReport] = useState(false)

  const onOpenReport = () => setWithReport(true)

  const onCloseReport = () => {
    setWithReport(false)
    onClose()
  }

  return (
    <>
      <Menu id="goal-menu" anchorEl={anchorEl} keepMounted open onClose={onClose}>
        {message.user.id === client?.id ? (
          <MenuItem onClick={onOpenModal}>
            <AppMenuItemContent icon="edit" text="Edit" />
          </MenuItem>
        ) : (
          <MenuItem onClick={onOpenReport}>
            <AppMenuItemContent icon="outlined_flag" text="Report" />
          </MenuItem>
        )}
        <Divider light />
        <MenuItem onClick={onClose}>
          <AppMenuItemContent icon="not_interested" text="Cancel" />
        </MenuItem>
      </Menu>
      {withReport && <Report entityId={message.id} type="message" anchorEl={anchorEl} onClose={onCloseReport} />}
    </>
  )
}
