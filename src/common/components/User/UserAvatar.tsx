import AvatarStatus from '@components/Avatar/AvatarStatus'
import AppLink from '@ui/AppLink'

export interface UserAvatarProps {
  name: string
  avatar?: string | null
  href: string
  online?: boolean | null
  size?: number
  onClick?: () => void
}

export default function UserAvatar({ name, avatar, href, online, size = 26, onClick }: UserAvatarProps) {
  return (
    <AppLink href={href} title={name} sx={{ height: size, textDecoration: 'none' }} onClick={onClick}>
      <AvatarStatus src={avatar} name={name} online={online} size={size} />
    </AppLink>
  )
}
