import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu, MenuItem } from '@material-ui/core'
import { RoleDto, UserBaseDto } from 'dto'
import AppMenuItemContent from 'components/UI/AppMenuItemContent'

const Report = dynamic(() => import('components/Report'))

interface MenuListProps {
  anchorEl: HTMLElement
  goalId: number
  client?: UserBaseDto
  role: RoleDto
  onShare: () => void
  onClose: () => void
}

export default function MenuList({ anchorEl, goalId, client, role, onShare, onClose }: MenuListProps): JSX.Element {
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
        {role !== 'OWNER' && (
          <MenuItem onClick={onOpenReport}>
            <AppMenuItemContent icon="outlined_flag" text="Report" />
          </MenuItem>
        )}
        <MenuItem onClick={onClose}>
          <AppMenuItemContent icon="not_interested" text="Cancel" />
        </MenuItem>
      </Menu>
      {withReport && (
        <Report entityId={goalId} type="goal" anchorEl={anchorEl} client={client} onClose={onCloseReport} />
      )}
    </>
  )
}
