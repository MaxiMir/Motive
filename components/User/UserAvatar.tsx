import AppAvatar from 'components/ui/AppAvatar'
import AppLink from 'components/ui/AppLink'

export interface UserAvatarProps {
  name: string
  avatar?: string | null
  href: string
  size?: number
  onClick?: () => void
}

export default function UserAvatar({ name, avatar, href, size = 26, onClick }: UserAvatarProps) {
  return (
    <AppLink href={href} title={name} sx={{ height: size }} onClick={onClick}>
      <AppAvatar src={avatar} size={size} />
    </AppLink>
  )
}
