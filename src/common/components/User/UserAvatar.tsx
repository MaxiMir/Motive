import Link from 'next/link'
import AvatarStatus from '@components/Avatar/AvatarStatus'

interface UserAvatarProps {
  name: string
  avatar?: string | null
  href: string
  online?: boolean | null
  size?: number
  onClick?: () => void
}

export default function UserAvatar({ name, avatar, href, online, size = 26, onClick }: UserAvatarProps) {
  return (
    <Link href={href} title={name} onClick={onClick}>
      <AvatarStatus src={avatar} name={name} online={online} size={size} />
    </Link>
  )
}
