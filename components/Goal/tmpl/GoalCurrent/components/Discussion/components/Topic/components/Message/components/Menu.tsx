import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { MenuItem } from '@material-ui/core'
import { MessageDto, UserBaseDto } from 'dto'
import AppMenuButton from 'components/UI/AppMenuButton'

const MUMenu = dynamic(() => import('@material-ui/core/Menu'))
const Report = dynamic(() => import('components/Report'))
const Modal = dynamic(() => import('components/Modal'))

interface MenuProps {
  topicId: number
  message: MessageDto
  client?: UserBaseDto
}

export default function Menu({ topicId, message, client }: MenuProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [withReport, setWithReport] = useState(false)
  const [withEdit, setWithEdit] = useState(false)

  const onOpenMenu = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)

  const onCloseMenu = () => setAnchorEl(null)

  const onOpenReport = () => setWithReport(true)

  const onCloseReport = () => {
    setWithReport(false)
    onCloseMenu()
  }

  const onCloseModal = () => {
    setWithEdit(false)
    onCloseMenu()
  }

  return (
    <>
      <AppMenuButton
        color="primary"
        ariaControls="message-menu"
        title="open message menu"
        compact
        onClick={onOpenMenu}
      />
      {anchorEl && (
        <>
          <MUMenu id="goal-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={onCloseMenu}>
            {message.user.id === client?.id ? (
              <MenuItem onClick={() => setWithEdit(true)}>Edit</MenuItem>
            ) : (
              <MenuItem onClick={onOpenReport}>Report</MenuItem>
            )}
            <MenuItem onClick={onCloseMenu}>Cancel</MenuItem>
          </MUMenu>
          {withReport && (
            <Report entityId={topicId} type="message" anchorEl={anchorEl} client={client} onClose={onCloseReport} />
          )}
          {withEdit && <Modal tmpl="edit-message" message={message} onClose={onCloseModal} />}
        </>
      )}
    </>
  )
}
