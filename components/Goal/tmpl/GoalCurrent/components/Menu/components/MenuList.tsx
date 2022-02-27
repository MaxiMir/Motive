import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu, MenuItem } from '@material-ui/core'
import { RoleDto } from 'dto'
import useClient from 'hooks/useClient'
import AppMenuItemContent from 'components/UI/AppMenuItemContent'

const Report = dynamic(() => import('components/Report'))

interface MenuListProps {
  anchorEl: HTMLElement
  goalId: number
  role: RoleDto
  onShare: () => void
  onClose: () => void
}

export default function MenuList({ anchorEl, goalId, role, onShare, onClose }: MenuListProps): JSX.Element {
  const client = useClient()
  const [withReport, setWithReport] = useState(false)
  const withReportMenu = client && role !== 'OWNER'

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
        {withReportMenu && (
          <MenuItem onClick={onOpenReport}>
            <AppMenuItemContent icon="outlined_flag" text="Report" />
          </MenuItem>
        )}
        <MenuItem onClick={onClose}>
          <AppMenuItemContent icon="not_interested" text="Cancel" />
        </MenuItem>
      </Menu>
      {withReport && <Report entityId={goalId} type="goal" anchorEl={anchorEl} onClose={onCloseReport} />}
    </>
  )
}
