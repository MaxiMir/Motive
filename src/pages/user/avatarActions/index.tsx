import { Menu, MenuItem } from '@mui/material'
import { paperClasses } from '@mui/material/Paper'
import { MouseEvent, useId, useState } from 'react'
import dynamic from 'next/dynamic'
import { UserPageDto } from 'shared/api'
import { useToggle } from 'shared/lib/hooks'
import Avatar from 'shared/ui/avatar'
import ListItem from 'shared/ui/ListItem'
import { useMessages } from './lib'

const LightBox = dynamic(() => import('shared/ui/LightBox'))
const UpdatingModal = dynamic(() => import('features/updating-avatar'))
const DeletingModal = dynamic(() => import('features/deleting-avatar'))

const SIZE = 175

interface AvatarActionsProps {
  user: UserPageDto
  clientPage: boolean
}

function AvatarActions({ user, clientPage }: AvatarActionsProps) {
  const { id: userId, name, avatar, online, lastSeen, device } = user
  const id = useId()
  const menuId = useId()
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
      <Avatar
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
            <ListItem icon="photo" primary={messages.openText} />
          </MenuItem>
        )}
        <MenuItem onClick={toggleEditing}>
          <ListItem icon="edit" primary={messages.editText} />
        </MenuItem>
        {avatar && (
          <MenuItem onClick={toggleDeleting}>
            <ListItem icon="delete" primary={messages.deleteText} color="error.dark" />
          </MenuItem>
        )}
        <MenuItem onClick={onClose}>
          <ListItem icon="block" primary={messages.cancelText} color="grey" />
        </MenuItem>
      </Menu>
      {openLightbox && <LightBox sources={sources} index={index} onClose={onCloseLightBox} />}
      {editing && <UpdatingModal userId={userId} onClose={toggleEditing} />}
      {deleting && <DeletingModal userId={userId} onClose={toggleDeleting} />}
    </>
  )
}

export default AvatarActions
