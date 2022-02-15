import { Menu, MenuItem } from '@material-ui/core'
import { ReportType, UserBaseDto } from 'dto'
import useSendReport from './hook'

interface ReportProps {
  entityId: number
  type: ReportType
  anchorEl: HTMLElement
  client?: UserBaseDto
  onClose: () => void
}

export default function Report({ entityId, type, anchorEl, client, onClose }: ReportProps): JSX.Element {
  const onClick = useSendReport(entityId, type, client, onClose)

  return (
    <Menu id="report-menu" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={onClose}>
      <MenuItem disabled>Select a reason:</MenuItem>
      <MenuItem onClick={() => onClick('Nudity')}>Nudity</MenuItem>
      <MenuItem onClick={() => onClick('Violence')}>Violence</MenuItem>
      <MenuItem onClick={() => onClick('Terrorism')}>Terrorism</MenuItem>
      <MenuItem onClick={() => onClick('Spam')}>Spam</MenuItem>
      <MenuItem onClick={() => onClick('Something else')}>Something else</MenuItem>
      <MenuItem onClick={onClose}>Cancel</MenuItem>
    </Menu>
  )
}
