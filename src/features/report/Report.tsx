import { Menu, MenuItem } from '@mui/material'
import AppMenuItemContent from '@ui/AppMenuItemContent'
import { ReportType } from './dto'
import { useMessages } from './hooks/useMessages'
import { useSendReport } from './hooks/useSendReport'

interface ReportProps {
  entityId: number
  type: ReportType
  anchorEl: HTMLElement
  onClose: () => void
}

function Report({ entityId, type, anchorEl, onClose }: ReportProps) {
  const messages = useMessages()

  const onClick = useSendReport(entityId, type, onClose)

  return (
    <Menu id="report-menu" anchorEl={anchorEl} open={!!anchorEl} onClose={onClose}>
      <MenuItem disabled>{messages.title}:</MenuItem>
      {messages.reports.map((name) => (
        <MenuItem key={name} onClick={() => onClick(name)}>
          <AppMenuItemContent icon="outlined_flag" text={name} />
        </MenuItem>
      ))}
    </Menu>
  )
}

export default Report
