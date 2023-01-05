import { MouseEvent, useId, useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu } from '@mui/material'
import { useUserContext } from '@modules/user/hooks'
import useToggle from '@hooks/useToggle'
import AppMenuItem from '@ui/AppMenuItem'
import AvatarStatus from '@components/Avatar/AvatarStatus'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

const AppLightBox = dynamic(() => import('@ui/AppLightBox'))
const EditModal = dynamic(() => import('./components/EditModal'))
const DeleteModal = dynamic(() => import('./components/DeleteModal'))

interface AvatarProps {
  clientPage: boolean
}

function Avatar({ clientPage }: AvatarProps) {
  const id = useId()
  const menuId = useId()
  const { name, avatar, online, lastSeen, device } = useUserContext()
  const [index, setIndex] = useState<number>()
  const [editing, toggleEditing] = useToggle()
  const [deleting, toggleDeleting] = useToggle()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const messages = useMessages()
  const sources = !avatar ? null : [avatar]
  const disabled = !sources && !clientPage
  const open = Boolean(anchorEl)

  const openPhoto = () => setIndex(0)

  const onClick = (e: MouseEvent<HTMLElement>) => {
    if (!sources && !clientPage) return

    if (!clientPage) {
      openPhoto()
      return
    }

    setAnchorEl(e.currentTarget)
  }

  const onClose = () => setAnchorEl(null)

  return (
    <>
      <TooltipArrow title={messages.title}>
        <AvatarStatus
          src={avatar}
          name={name}
          size={175}
          online={online}
          lastSeen={lastSeen}
          device={device}
          buttonProps={{
            disabled,
            id,
            'aria-controls': open ? menuId : undefined,
            'aria-haspopup': 'true',
            'aria-expanded': open ? 'true' : undefined,
            onClick,
          }}
        />
      </TooltipArrow>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          'aria-labelledby': id,
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 175,
              height: 175,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        onClick={onClose}
        onClose={onClose}
      >
        {avatar && <AppMenuItem icon="photo" text={messages.openText} onClick={openPhoto} />}
        <AppMenuItem icon="edit" text={messages.editText} onClick={toggleEditing} />
        {avatar && (
          <AppMenuItem
            icon="delete"
            text={messages.deleteText}
            color="error.dark"
            onClick={toggleDeleting}
          />
        )}
        <AppMenuItem icon="block" text={messages.cancelText} color="grey" onClick={onClose} />
      </Menu>
      {sources && <AppLightBox sources={sources} index={index} setIndex={setIndex} />}
      {editing && <EditModal onClose={toggleEditing} />}
      {deleting && <DeleteModal onClose={toggleDeleting} />}
    </>
  )
}

export default Avatar
