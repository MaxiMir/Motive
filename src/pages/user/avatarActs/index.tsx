import { Menu, MenuItem } from '@mui/material'
import { paperClasses } from '@mui/material/Paper'
import { MouseEvent, useId, useState } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { UserPageDto } from 'shared/api'
import Avatar from 'shared/ui/avatar'
import ListItem from 'shared/ui/ListItem'
import Progress from './progress'
import { ModalType } from './types'

const LightBox = dynamic(() => import('shared/ui/LightBox'))
const EditModal = dynamic(() => import('features/user/edit-avatar'))
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
  const [modal, setModal] = useState<ModalType>()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const sources = !avatar ? [] : [avatar]
  const disabled = !sources.length && !viewerPage
  const open = Boolean(anchorEl)
  const openLightbox = typeof index === 'number'
  const openText = formatMessage({ id: 'common.open' })
  const editText = formatMessage({ id: 'common.edit' })
  const deleteText = formatMessage({ id: 'common.delete' })
  const cancelText = formatMessage({ id: 'common.cancel' })
  const ariaLabel = formatMessage({ id: !viewerPage ? 'common.open' : 'common.open-menu' })

  const openPhoto = () => setIndex(0)

  const onClickAvatar = (e: MouseEvent<HTMLElement>) => {
    if (!sources && !viewerPage) return

    if (!viewerPage) {
      openPhoto()
      return
    }

    setAnchorEl(e.currentTarget)
  }

  const toOnClick = (type: ModalType) => {
    return () => setModal(type)
  }

  const onCloseModal = () => setModal(undefined)

  const onCloseMenu = () => setAnchorEl(null)

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
          aria-label={ariaLabel}
          aria-controls={open ? menuId : undefined}
          aria-haspopup
          aria-expanded={open ? 'true' : undefined}
          onClick={onClickAvatar}
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
        onClick={onCloseMenu}
        onClose={onCloseMenu}
      >
        {avatar && (
          <MenuItem onClick={openPhoto}>
            <ListItem icon="zoom_out_map" primary={openText} />
          </MenuItem>
        )}
        <MenuItem onClick={toOnClick('edit')}>
          <ListItem icon="photo" primary={editText} />
        </MenuItem>
        {avatar && (
          <MenuItem onClick={toOnClick('delete')}>
            <ListItem icon="delete" primary={deleteText} color="error.dark" />
          </MenuItem>
        )}
        <MenuItem onClick={onCloseMenu}>
          <ListItem icon="block" primary={cancelText} color="grey" />
        </MenuItem>
      </Menu>
      {openLightbox && <LightBox sources={sources} index={index} onClose={onCloseLightBox} />}
      {modal === 'edit' && <EditModal userId={userId} onClose={onCloseModal} />}
      {modal === 'delete' && <DeleteModal userId={userId} onClose={onCloseModal} />}
    </>
  )
}

export default AvatarActs
