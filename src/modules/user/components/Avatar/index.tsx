import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import AvatarStatus from '@components/Avatar/AvatarStatus'
import { UserDetailDto } from '@dto'

const AppLightBox = dynamic(() => import('@ui/AppLightBox'))
const MenuList = dynamic(() => import('./components/MenuList'))

interface AvatarProps {
  user: UserDetailDto
}

export default function Avatar({ user }: AvatarProps) {
  const [index, setIndex] = useState<number>()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const { name, avatar, online, lastSeen, device } = user
  const sources = avatar && [avatar]

  const onClick = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)

  const onClose = () => setAnchorEl(null)

  const onOpenPhoto = () => {
    onClose()
    setIndex(0)
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
        onClick={!avatar ? undefined : onClick}
      />
      {anchorEl && <MenuList anchorEl={anchorEl} onOpenPhoto={onOpenPhoto} onClose={onClose} />}
      {sources && <AppLightBox sources={sources} index={index} setIndex={setIndex} />}
    </>
  )
}
