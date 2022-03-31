import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu, MenuItem } from '@material-ui/core'
import { OwnershipDto } from 'dto'
import AppMenuItemContent from 'components/UI/AppMenuItemContent'

const Report = dynamic(() => import('components/Report'))

interface MenuListProps {
  anchorEl: HTMLElement
  goalId: number
  clientOwnership: OwnershipDto
  onShare: () => void
  onLeave: () => void
  onClose: () => void
}

export default function MenuList({
  anchorEl,
  goalId,
  clientOwnership,
  onShare,
  onLeave,
  onClose,
}: MenuListProps): JSX.Element {
  const [withReport, setWithReport] = useState(false)

  const onOpenReport = () => setWithReport(true)

  const onCloseReport = () => {
    setWithReport(false)
    onClose()
  }

  return (
    <>
      <Menu id="goal-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={onClose}>
        <MenuItem onClick={onShare}>
          <AppMenuItemContent icon="share" text="Share" />
        </MenuItem>
        {!clientOwnership.goal && (
          <MenuItem onClick={onOpenReport}>
            <AppMenuItemContent icon="outlined_flag" text="Report" />
          </MenuItem>
        )}
        {clientOwnership.member && (
          <MenuItem onClick={onLeave}>
            <AppMenuItemContent icon="logout" text="Leave" />
          </MenuItem>
        )}
      </Menu>
      {withReport && <Report entityId={goalId} type="goal" anchorEl={anchorEl} onClose={onCloseReport} />}
    </>
  )
}
