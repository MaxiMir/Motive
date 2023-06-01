import { Menu, MenuItem } from '@mui/material'
import { useIntl } from 'react-intl'
import { ReportType } from 'shared/api'
import ListItem from 'shared/ui/ListItem'
import { useSendReport } from './model'

interface CreateReportProps {
  id: number
  type: ReportType
  anchorEl: HTMLElement | null
  onClose: () => void
}

function CreateReport({ id, type, anchorEl, onClose }: CreateReportProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'component.report.title' })
  const cancelText = formatMessage({ id: 'common.cancel' })
  const reports = [
    formatMessage({ id: 'common.nudity' }),
    formatMessage({ id: 'common.violence' }),
    formatMessage({ id: 'common.terrorism' }),
    formatMessage({ id: 'common.spam' }),
    formatMessage({ id: 'common.something-else' }),
  ]

  const onClick = useSendReport(id, type, onClose)

  return (
    <Menu open anchorEl={anchorEl} onClose={onClose}>
      <MenuItem disabled>{title}:</MenuItem>
      {reports.map((name) => (
        <MenuItem key={name} onClick={() => onClick(name)}>
          <ListItem icon="outlined_flag" primary={name} color="error.dark" />
        </MenuItem>
      ))}
      <MenuItem onClick={onClose}>
        <ListItem icon="block" primary={cancelText} color="grey" />
      </MenuItem>
    </Menu>
  )
}

export default CreateReport
