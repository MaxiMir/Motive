import { Menu, MenuItem } from '@mui/material'
import { paperClasses } from '@mui/material/Paper'
import { MouseEvent, useId, useState } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { UserPageDto } from 'shared/api'
import { useToggle } from 'shared/lib/hooks'
import Avatar from 'shared/ui/avatar'
import ListItem from 'shared/ui/ListItem'
import Progress from './progress'

const LightBox = dynamic(() => import('shared/ui/LightBox'))
const UpdateModal = dynamic(() => import('features/user/update-avatar'))
const DeleteModal = dynamic(() => import('features/user/delete-avatar'))

const SIZE = 180

interface AvatarActsProps {
  user: UserPageDto
  viewerPage: boolean
}

function AvatarActs({ user, viewerPage }: AvatarActsProps) {
  const { id: userId, name, avatar, characteristic } = user
  const id = useId()
  const menuId = useId()
  const { formatMessage } = useIntl()
  const [index, setIndex] = useState<number>()
  const [editing, toggleEditing] = useToggle()
  const [deleting, toggleDeleting] = useToggle()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const sources = !avatar ? [] : [avatar]
  const disabled = !sources.length && !viewerPage
  const open = Boolean(anchorEl)
  const openLightbox = typeof index === 'number'
  const openText = formatMessage({ id: 'common.open-photo' })
  const editText = formatMessage({ id: 'common.edit' })
  const deleteText = formatMessage({ id: 'common.delete' })
  const cancelText = formatMessage({ id: 'common.cancel' })

  const openPhoto = () => setIndex(0)

  const onClick = (e: MouseEvent<HTMLElement>) => {
    if (!sources && !viewerPage) return

    if (!viewerPage) {
      openPhoto()
      return
    }

    setAnchorEl(e.currentTarget)
  }

  const onClose = () => setAnchorEl(null)

  const onCloseLightBox = () => setIndex(undefined)

  return (
    <>
      <Progress progress={characteristic.progress} radius={SIZE}>
        <Avatar
          src={avatar}
          name={name}
          size={130}
          disabled={disabled}
          id={id}
          aria-controls={open ? menuId : undefined}
          aria-haspopup
          aria-expanded={open ? 'true' : undefined}
          onClick={onClick}
        />
      </Progress>
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
            <ListItem icon="photo" primary={openText} />
          </MenuItem>
        )}
        <MenuItem onClick={toggleEditing}>
          <ListItem icon="edit" primary={editText} />
        </MenuItem>
        {avatar && (
          <MenuItem onClick={toggleDeleting}>
            <ListItem icon="delete" primary={deleteText} color="error.dark" />
          </MenuItem>
        )}
        <MenuItem onClick={onClose}>
          <ListItem icon="block" primary={cancelText} color="grey" />
        </MenuItem>
      </Menu>
      {openLightbox && <LightBox sources={sources} index={index} onClose={onCloseLightBox} />}
      {editing && <UpdateModal userId={userId} onClose={toggleEditing} />}
      {deleting && <DeleteModal userId={userId} onClose={toggleDeleting} />}
    </>
  )
}

export default AvatarActs
