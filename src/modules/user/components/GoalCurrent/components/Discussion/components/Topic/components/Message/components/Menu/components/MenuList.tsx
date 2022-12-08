import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Menu, MenuItem } from '@mui/material'
import { MessageDto } from '@dto'
import useClient from '@hooks/useClient'
import AppMenuItemContent from '@ui/AppMenuItemContent'

const Report = dynamic(() => import('@features/report'))

interface MenuListProps {
  anchorEl: HTMLElement
  message: MessageDto
  onOpenModal: () => void
  onClose: () => void
}

function MenuList({ anchorEl, message, onOpenModal, onClose }: MenuListProps) {
  const { formatMessage } = useIntl()
  const client = useClient()
  const editText = formatMessage({ id: 'common.edit' })
  const reportText = formatMessage({ id: 'common.report' })
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
            <AppMenuItemContent icon="edit" text={editText} />
          </MenuItem>
        ) : (
          <MenuItem onClick={onOpenReport}>
            <AppMenuItemContent icon="outlined_flag" text={reportText} />
          </MenuItem>
        )}
      </Menu>
      {withReport && <Report entityId={message.id} type="message" anchorEl={anchorEl} onClose={onCloseReport} />}
    </>
  )
}

export default MenuList
