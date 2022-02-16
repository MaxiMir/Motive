import { Menu, MenuItem } from '@material-ui/core'
import { ReportType, UserBaseDto } from 'dto'
import AppMenuItem from 'components/UI/AppMenuItem'
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
      {['Nudity', 'Violence', 'Terrorism', 'Spam', 'Something else'].map((name) => (
        <AppMenuItem icon="outlined_flag" text={name} key={name} onClick={() => onClick(name)} />
      ))}
      <AppMenuItem icon="not_interested" text="Cancel" onClick={onClose} />
    </Menu>
  )
}
