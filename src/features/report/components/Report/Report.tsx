import { Menu, MenuItem } from '@mui/material'
import { ReportType } from '@features/report/dto'
import AppListItem from '@ui/AppListItem'
import { useMessages } from './hooks/useMessages'
import { useSendReport } from './hooks/useSendReport'

interface ReportProps {
  id: number
  type: ReportType
  anchorEl: HTMLElement | null
  onClose: () => void
}

function Report({ id, type, anchorEl, onClose }: ReportProps) {
  const messages = useMessages()

  const onClick = useSendReport(id, type, onClose)

  return (
    <Menu open anchorEl={anchorEl} onClose={onClose}>
      <MenuItem disabled>{messages.title}:</MenuItem>
      {messages.reports.map((name) => (
        <MenuItem key={name} onClick={() => onClick(name)}>
          <AppListItem icon="outlined_flag" primary={name} color="error.dark" />
        </MenuItem>
      ))}
      <MenuItem onClick={onClose}>
        <AppListItem icon="block" primary={messages.cancelText} color="grey" />
      </MenuItem>
    </Menu>
  )
}

export default Report
