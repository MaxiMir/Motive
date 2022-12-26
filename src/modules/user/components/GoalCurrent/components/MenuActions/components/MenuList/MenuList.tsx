import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu, MenuItem } from '@mui/material'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks/useGoalContext'
import { OwnershipDto } from '@features/member'
import AppMenuItemContent from '@ui/AppMenuItemContent'
import { useMessages } from './hooks/useMessages'

const Report = dynamic(() => import('@features/report'))

interface MenuListProps {
  clientOwnership: OwnershipDto
  anchorEl: HTMLElement
  onShare: () => void
  onLeave: () => void
  onClose: () => void
}

function MenuList({ clientOwnership, anchorEl, onShare, onLeave, onClose }: MenuListProps) {
  const messages = useMessages()
  const { id } = useGoalContext()
  const [withReport, setWithReport] = useState(false)

  const onOpenReport = () => setWithReport(true)

  const onCloseReport = () => {
    setWithReport(false)
    onClose()
  }

  return (
    <>
      <Menu open anchorEl={anchorEl} onClose={onClose}>
        <MenuItem onClick={onShare}>
          <AppMenuItemContent icon="share" text={messages.shareText} />
        </MenuItem>
        {!clientOwnership.goal && (
          <MenuItem onClick={onOpenReport}>
            <AppMenuItemContent icon="outlined_flag" text={messages.reportText} />
          </MenuItem>
        )}
        {clientOwnership.member && (
          <MenuItem onClick={onLeave}>
            <AppMenuItemContent icon="logout" text={messages.leaveText} />
          </MenuItem>
        )}
      </Menu>
      {withReport && (
        <Report entityId={id} type="goal" anchorEl={anchorEl} onClose={onCloseReport} />
      )}
    </>
  )
}

export default MenuList
