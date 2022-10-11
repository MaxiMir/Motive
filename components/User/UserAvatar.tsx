import AppAvatar from 'components/AppAvatar'
import AppLink from 'components/ui/AppLink'

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
      <AppAvatar src={avatar} name={name} online={online} size={size} />
    </AppLink>
  )
}
