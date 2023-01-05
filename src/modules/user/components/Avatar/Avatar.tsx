import { MouseEvent, useId, useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu } from '@mui/material'
import { paperClasses } from '@mui/material/Paper'
import { useUserContext } from '@modules/user/hooks'
import useToggle from '@hooks/useToggle'
import AppMenuItem from '@ui/AppMenuItem'
import AvatarStatus from '@components/Avatar/AvatarStatus'
import { useMessages } from './hooks/useMessages'

const AppLightBox = dynamic(() => import('@ui/AppLightBox'))
const EditModal = dynamic(() => import('./components/EditModal'))
const DeleteModal = dynamic(() => import('./components/DeleteModal'))

const SIZE = 175

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
      <AvatarStatus
        src={avatar}
        name={name}
        size={SIZE}
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
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          'aria-labelledby': id,
        }}
        sx={{
          [`& .${paperClasses.root}`]: {
            width: SIZE,
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
