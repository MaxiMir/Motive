import { Menu, MenuItem } from '@material-ui/core'
import { ReportType } from 'dto'
import AppMenuItemContent from 'components/UI/AppMenuItemContent'
import useSendReport from './hook'

interface ReportProps {
  entityId: number
  type: ReportType
  anchorEl: HTMLElement
  onClose: () => void
}

export default function Report({ entityId, type, anchorEl, onClose }: ReportProps): JSX.Element {
  const onClick = useSendReport(entityId, type, onClose)

  return (
    <Menu id="report-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={onClose}>
      <MenuItem disabled>Select a reason:</MenuItem>
      {['Nudity', 'Violence', 'Terrorism', 'Spam', 'Something else'].map((name) => (
        <MenuItem key={name} onClick={() => onClick(name)}>
          <AppMenuItemContent icon="outlined_flag" text={name} />
        </MenuItem>
      ))}
    </Menu>
  )
}
