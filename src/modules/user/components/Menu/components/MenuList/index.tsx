import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { Menu, MenuItem } from '@mui/material'
import { UserBaseDto } from '@dto'
import AppMenuItemContent from '@ui/AppMenuItemContent'

const ModalProfile = dynamic(() => import('./components/ModalProfile'))

interface MenuListProps {
  anchorEl: HTMLElement
  user: UserBaseDto
  clientPage: boolean
  onShare: () => void
  onClose: () => void
}

export default function MenuList({ anchorEl, user, clientPage, onShare, onClose }: MenuListProps) {
  const { formatMessage } = useIntl()
  const [open, setOpen] = useState(false)
  const shareText = formatMessage({ id: 'common.share' })
  const editText = !clientPage ? '' : formatMessage({ id: 'common.edit' })

  const onOpenEdit = () => setOpen(true)

  const onCloseEdit = () => {
    setOpen(false)
    onClose()
  }

  return (
    <>
      <Menu id="user-edit-menu" anchorEl={anchorEl} open onClose={onClose}>
        <MenuItem onClick={onShare}>
          <AppMenuItemContent icon="share" text={shareText} />
        </MenuItem>
        {clientPage && (
          <MenuItem onClick={onOpenEdit}>
            <AppMenuItemContent icon="edit" text={editText} />
          </MenuItem>
        )}
      </Menu>
      {open && <ModalProfile user={user} onClose={onCloseEdit} />}
    </>
  )
}
