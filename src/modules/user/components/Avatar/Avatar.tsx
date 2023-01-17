import { MouseEvent, useId, useState } from 'react'
import dynamic from 'next/dynamic'
import { Menu, MenuItem } from '@mui/material'
import { paperClasses } from '@mui/material/Paper'
import { useUserContext } from '@modules/user/hooks'
import useToggle from '@hooks/useToggle'
import AvatarStatus from '@components/Avatar/AvatarStatus'
import AppListItem from '@ui/AppListItem'
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
  const sources = !avatar ? [] : [avatar]
  const disabled = !sources.length && !clientPage
  const open = Boolean(anchorEl)
  const openLightbox = typeof index === 'number'

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

  const onCloseLightBox = () => setIndex(undefined)

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
            backgroundColor: 'underlay',
          },
        }}
        onClick={onClose}
        onClose={onClose}
      >
        {avatar && (
          <MenuItem onClick={openPhoto}>
            <AppListItem icon="photo" primary={messages.openText} />
          </MenuItem>
        )}
        <MenuItem onClick={toggleEditing}>
          <AppListItem icon="edit" primary={messages.editText} />
        </MenuItem>
        {avatar && (
          <MenuItem onClick={toggleDeleting}>
            <AppListItem icon="delete" primary={messages.deleteText} color="error.dark" />
          </MenuItem>
        )}
        <MenuItem onClick={onClose}>
          <AppListItem icon="block" primary={messages.cancelText} color="grey" />
        </MenuItem>
      </Menu>
      {openLightbox && <AppLightBox sources={sources} index={index} onClose={onCloseLightBox} />}
      {editing && <EditModal onClose={toggleEditing} />}
      {deleting && <DeleteModal onClose={toggleDeleting} />}
    </>
  )
}

export default Avatar
