import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu, MenuItem } from '@mui/material'
import { OwnershipDto } from '@dto'
import AppMenuItemContent from '@ui/AppMenuItemContent'
import { useIntl } from 'react-intl'

const Report = dynamic(() => import('@components/Report'))

interface MenuListProps {
  goalId: number
  clientOwnership: OwnershipDto
  anchorEl: HTMLElement
  onShare: () => void
  onLeave: () => void
  onClose: () => void
}

export default function MenuList({ goalId, clientOwnership, anchorEl, onShare, onLeave, onClose }: MenuListProps) {
  const { formatMessage } = useIntl()
  const [withReport, setWithReport] = useState(false)
  const shareText = formatMessage({ id: 'common.share' })
  const reportText = formatMessage({ id: 'common.report' })
  const leaveText = formatMessage({ id: 'common.leave' })

  const onOpenReport = () => setWithReport(true)

  const onCloseReport = () => {
    setWithReport(false)
    onClose()
  }

  return (
    <>
      <Menu open anchorEl={anchorEl} onClose={onClose}>
        <MenuItem onClick={onShare}>
          <AppMenuItemContent icon="share" text={shareText} />
        </MenuItem>
        {!clientOwnership.goal && (
          <MenuItem onClick={onOpenReport}>
            <AppMenuItemContent icon="outlined_flag" text={reportText} />
          </MenuItem>
        )}
        {clientOwnership.member && (
          <MenuItem onClick={onLeave}>
            <AppMenuItemContent icon="logout" text={leaveText} />
          </MenuItem>
        )}
      </Menu>
      {withReport && <Report entityId={goalId} type="goal" anchorEl={anchorEl} onClose={onCloseReport} />}
    </>
  )
}
