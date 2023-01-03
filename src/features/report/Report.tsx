import { Menu, MenuItem } from '@mui/material'
import AppMenuItem from '@ui/AppMenuItem'
import { ReportType } from './dto'
import { useMessages } from './hooks/useMessages'
import { useSendReport } from './hooks/useSendReport'

interface ReportProps {
  entityId: number
  type: ReportType
  anchorEl: HTMLElement | null
  onClose: () => void
}

function Report({ entityId, type, anchorEl, onClose }: ReportProps) {
  const messages = useMessages()

  const onClick = useSendReport(entityId, type, onClose)

  return (
    <Menu open anchorEl={anchorEl} onClose={onClose}>
      <MenuItem disabled>{messages.title}:</MenuItem>
      {messages.reports.map((name) => (
        <AppMenuItem icon="outlined_flag" text={name} key={name} onClick={() => onClick(name)} />
      ))}
    </Menu>
  )
}

export default Report
