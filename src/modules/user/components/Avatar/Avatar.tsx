import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { useUserContext } from '@modules/user/hooks'
import useToggle from '@hooks/useToggle'
import AvatarStatus from '@components/Avatar/AvatarStatus'

const AppLightBox = dynamic(() => import('@ui/AppLightBox/AppLightBox'))
const MenuList = dynamic(() => import('./components/MenuList'))
const ModalEdit = dynamic(() => import('./components/ModalEdit'))
const ModalDelete = dynamic(() => import('./components/ModalDelete'))

interface AvatarProps {
  clientPage: boolean
}

function Avatar({ clientPage }: AvatarProps) {
  const { name, avatar, online, lastSeen, device } = useUserContext()
  const [index, setIndex] = useState<number>()
  const [openEdit, toggleEdit] = useToggle()
  const [openDelete, toggleDelete] = useToggle()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const sources = !avatar ? null : [avatar]
  const disabled = !sources && !clientPage

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
        size={150}
        online={online}
        lastSeen={lastSeen}
        device={device}
        disabled={disabled}
        onClick={onClick}
      />
      {anchorEl && (
        <MenuList
          anchorEl={anchorEl}
          avatar={avatar}
          onOpen={openPhoto}
          onEdit={toggleEdit}
          onDelete={toggleDelete}
          onClose={onClose}
        />
      )}
      {sources && <AppLightBox sources={sources} index={index} setIndex={setIndex} />}
      {openEdit && <ModalEdit onClose={toggleEdit} />}
      {openDelete && <ModalDelete onClose={toggleDelete} />}
    </>
  )
}

export default Avatar
