import Link from 'next/link'
import AvatarStatus from '@components/Avatar/AvatarStatus'

interface UserLinkProps {
  name: string
  avatar?: string | null
  href: string
  online?: boolean | null
  size?: number
  onClick?: () => void
}

function UserLink({ name, avatar, href, online, size = 26, onClick }: UserLinkProps) {
  return (
    <Link href={href} title={name} onClick={onClick}>
      <AvatarStatus src={avatar} name={name} online={online} size={size} />
    </Link>
  )
}

export default UserLink
