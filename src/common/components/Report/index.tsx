import { useIntl } from 'react-intl'
import { Menu, MenuItem } from '@mui/material'
import { ReportType } from 'src/common/dto'
import AppMenuItemContent from 'src/common/ui/AppMenuItemContent'
import useSendReport from './hook'
import i18n from './i18n'

interface ReportProps {
  entityId: number
  type: ReportType
  anchorEl: HTMLElement
  onClose: () => void
}

export default function Report({ entityId, type, anchorEl, onClose }: ReportProps) {
  const { locale } = useIntl()
  const onClick = useSendReport(entityId, type, onClose)
  const { title, reports } = i18n[locale]

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
