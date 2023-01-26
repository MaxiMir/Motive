import { Menu, MenuItem } from '@mui/material'
import { useSendReport } from '@entities/report'
import { ReportType } from '@shared/api/dto'
import ListItem from '@shared/ui/ListItem'
import { useMessages } from './lib'

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
          <ListItem icon="outlined_flag" primary={name} color="error.dark" />
        </MenuItem>
      ))}
      <MenuItem onClick={onClose}>
        <ListItem icon="block" primary={messages.cancelText} color="grey" />
      </MenuItem>
    </Menu>
  )
}

export default Report
