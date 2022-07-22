import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu, MenuItem } from '@mui/material'
import i18n from 'constants/i18n'
import { OwnershipDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppMenuItemContent from 'components/ui/AppMenuItemContent'

const Report = dynamic(() => import('components/Report'))

interface MenuListProps {
  goalId: number
  clientOwnership: OwnershipDto
  anchorEl: HTMLElement
  locale: Locale
  onShare: () => void
  onLeave: () => void
  onClose: () => void
}

export default function MenuList({
  goalId,
  clientOwnership,
  anchorEl,
  locale,
  onShare,
  onLeave,
  onClose,
}: MenuListProps) {
  const [withReport, setWithReport] = useState(false)
  const { share, report, leave } = i18n[locale]

  const onOpenReport = () => setWithReport(true)

  const onCloseReport = () => {
    setWithReport(false)
    onClose()
  }

  return (
    <>
      <Menu open anchorEl={anchorEl} onClose={onClose}>
        <MenuItem onClick={onShare}>
          <AppMenuItemContent icon="share" text={share} />
        </MenuItem>
        {!clientOwnership.goal && (
          <MenuItem onClick={onOpenReport}>
            <AppMenuItemContent icon="outlined_flag" text={report} />
          </MenuItem>
        )}
        {clientOwnership.member && (
          <MenuItem onClick={onLeave}>
            <AppMenuItemContent icon="logout" text={leave} />
          </MenuItem>
        )}
      </Menu>
      {withReport && <Report entityId={goalId} type="goal" anchorEl={anchorEl} onClose={onCloseReport} />}
    </>
  )
}
