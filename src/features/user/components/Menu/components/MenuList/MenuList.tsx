import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Menu, MenuItem } from '@mui/material'
import { useCheckOnClientPage, useUserContext } from '@features/user/hooks'
import AppMenuItemContent from '@ui/AppMenuItemContent'

const Report = dynamic(() => import('@components/Report'))

interface MenuListProps {
  anchorEl: HTMLElement
  onShare: () => void
  onClose: () => void
}

function MenuList({ anchorEl, onShare, onClose }: MenuListProps) {
  const { id } = useUserContext()
  const clientPage = useCheckOnClientPage(id)
  const { formatMessage } = useIntl()
  const [withReport, setWithReport] = useState(false)
  const shareText = formatMessage({ id: 'common.share' })
  const reportText = formatMessage({ id: 'common.report' })

  const onOpenReport = () => setWithReport(true)

  const onCloseReport = () => {
    setWithReport(false)
    onClose()
  }

  return (
    <>
      <Menu id="user-edit-menu" anchorEl={anchorEl} open onClose={onClose}>
        <MenuItem onClick={onShare}>
          <AppMenuItemContent icon="share" text={shareText} />
        </MenuItem>
        {!clientPage && (
          <MenuItem onClick={onOpenReport}>
            <AppMenuItemContent icon="outlined_flag" text={reportText} />
          </MenuItem>
        )}
      </Menu>
      {withReport && <Report entityId={id} type="user" anchorEl={anchorEl} onClose={onCloseReport} />}
    </>
  )
}

export default MenuList
