import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu, MenuItem } from '@mui/material'
import { useCheckOnClientPage } from '@modules/user/hooks'
import AppMenuItemContent from '@ui/AppMenuItemContent'
import { useMessages } from './hooks/useMessages'

const Report = dynamic(() => import('@features/report'))

interface MenuActionsProps {
  anchorEl: HTMLElement
  id: number
  onShare: () => void
  onClose: () => void
}

function MenuActions({ anchorEl, id, onShare, onClose }: MenuActionsProps) {
  const clientPage = useCheckOnClientPage(id)
  const messages = useMessages(!clientPage)
  const [withReport, setWithReport] = useState(false)

  const onOpenReport = () => setWithReport(true)

  const onCloseReport = () => {
    setWithReport(false)
    onClose()
  }

  return (
    <>
      <Menu id="user-edit-menu" anchorEl={anchorEl} open onClose={onClose}>
        <MenuItem onClick={onShare}>
          <AppMenuItemContent icon="share" text={messages.shareText} />
        </MenuItem>
        {!clientPage && (
          <MenuItem
            sx={{
              '& span': {
                color: 'error.dark',
              },
            }}
            onClick={onOpenReport}
          >
            <AppMenuItemContent icon="outlined_flag" text={messages.reportText} />
          </MenuItem>
        )}
      </Menu>
      {withReport && (
        <Report entityId={id} type="user" anchorEl={anchorEl} onClose={onCloseReport} />
      )}
    </>
  )
}

export default MenuActions
