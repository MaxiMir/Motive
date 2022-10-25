import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu, MenuItem } from '@mui/material'
import { MessageDto } from 'src/common/dto'
import useClient from 'src/common/hooks/useClient'
import { Locale } from 'src/common/hooks/useSetLocale'
import AppMenuItemContent from 'src/common/ui/AppMenuItemContent'
import i18n from './i18n'

const Report = dynamic(() => import('@components/Report'))

interface MenuListProps {
  anchorEl: HTMLElement
  message: MessageDto
  locale: Locale
  onOpenModal: () => void
  onClose: () => void
}

export default function MenuList({ anchorEl, message, locale, onOpenModal, onClose }: MenuListProps) {
  const client = useClient()
  const [withReport, setWithReport] = useState(false)
  const { edit, report } = i18n[locale]

  const onOpenReport = () => setWithReport(true)

  const onCloseReport = () => {
    setWithReport(false)
    onClose()
  }

  return (
    <>
      <Menu id="goal-menu" anchorEl={anchorEl} open onClose={onClose}>
        {message.user.id === client?.id ? (
          <MenuItem onClick={onOpenModal}>
            <AppMenuItemContent icon="edit" text={edit} />
          </MenuItem>
        ) : (
          <MenuItem onClick={onOpenReport}>
            <AppMenuItemContent icon="outlined_flag" text={report} />
          </MenuItem>
        )}
      </Menu>
      {withReport && <Report entityId={message.id} type="message" anchorEl={anchorEl} onClose={onCloseReport} />}
    </>
  )
}
