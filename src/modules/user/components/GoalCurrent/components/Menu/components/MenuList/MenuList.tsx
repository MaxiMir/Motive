import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu } from '@mui/material'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks/useGoalContext'
import { OwnershipDto } from '@features/member'
import AppMenuItem from '@ui/AppMenuItem'
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
        <AppMenuItem icon="share" text={messages.shareText} onClick={onShare} />
        {!clientOwnership.goal && (
          <AppMenuItem
            icon="outlined_flag"
            text={messages.reportText}
            color="error.dark"
            onClick={onOpenReport}
          />
        )}
        {clientOwnership.member && (
          <AppMenuItem icon="logout" text={messages.leaveText} onClick={onLeave} />
        )}
        <AppMenuItem icon="block" text={messages.cancelText} color="grey" onClick={onClose} />
      </Menu>
      {withReport && (
        <Report entityId={id} type="goal" anchorEl={anchorEl} onClose={onCloseReport} />
      )}
    </>
  )
}

export default MenuList
