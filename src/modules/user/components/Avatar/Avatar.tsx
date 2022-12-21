import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { useUserContext } from '@modules/user/hooks'
import useToggle from '@hooks/useToggle'
import AvatarStatus from '@components/Avatar/AvatarStatus'

const AppLightBox = dynamic(() => import('@ui/AppLightBox/AppLightBox'))
const MenuList = dynamic(() => import('./components/MenuList/MenuList'))
const ModalAvatar = dynamic(() => import('./components/ModalAvatar'))

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

  const onOpen = () => {
    onClose()
    openPhoto()
  }

  const onEdit = () => {
    onClose()
    toggleEdit()
  }

  const onDelete = () => {
    onClose()
    toggleDelete()
  }

  return (
    <>
      <AvatarStatus
        src={avatar}
        name={name}
        size={190}
        online={online}
        lastSeen={lastSeen}
        device={device}
        onClick={onClick}
      />
      {anchorEl && (
        <MenuList
          anchorEl={anchorEl}
          avatar={avatar}
          onOpen={onOpen}
          onEdit={onEdit}
          onDelete={onDelete}
          onClose={onClose}
        />
      )}
      {sources && <AppLightBox sources={sources} index={index} setIndex={setIndex} />}
      {openEdit && <ModalAvatar onClose={toggleEdit} />}
      {openDelete && <div>1</div>}
    </>
  )
}

export default Avatar
