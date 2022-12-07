import { useIntl } from 'react-intl'
import { Menu, MenuItem } from '@mui/material'
import { ReportType } from '@dto'
import AppMenuItemContent from '@ui/AppMenuItemContent'
import { useSendReport } from './hooks/useSendReport'

interface ReportProps {
  entityId: number
  type: ReportType
  anchorEl: HTMLElement
  onClose: () => void
}

function Report({ entityId, type, anchorEl, onClose }: ReportProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'component.report.title' })
  const reports = [
    formatMessage({ id: 'common.nudity' }),
    formatMessage({ id: 'common.violence' }),
    formatMessage({ id: 'common.terrorism' }),
    formatMessage({ id: 'common.spam' }),
    formatMessage({ id: 'common.something-else' }),
  ]

  const onClick = useSendReport(entityId, type, onClose)

  return (
    <Menu id="report-menu" anchorEl={anchorEl} open={!!anchorEl} onClose={onClose}>
      <MenuItem disabled>{title}:</MenuItem>
      {reports.map((name) => (
        <MenuItem key={name} onClick={() => onClick(name)}>
          <AppMenuItemContent icon="outlined_flag" text={name} />
        </MenuItem>
      ))}
    </Menu>
  )
}

export default Report
