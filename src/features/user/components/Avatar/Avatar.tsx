import { MouseEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { useUserContext } from '@features/user/hooks'
import AvatarStatus from '@components/Avatar/AvatarStatus'

const AppLightBox = dynamic(() => import('@ui/AppLightBox/AppLightBox'))
const MenuList = dynamic(() => import('./components/MenuList'))

function Avatar() {
  const { name, avatar, online, lastSeen, device } = useUserContext()
  const [index, setIndex] = useState<number>()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
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

export default Avatar
