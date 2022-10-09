import dynamic from 'next/dynamic'

const Avatar = dynamic(() => import('./components/Avatar'))
const NoAvatar = dynamic(() => import('./components/NoAvatar'))

export interface UserAvatarProps {
  src?: string | null
  name: string
  size: number
}

export default function AppAvatar({ src, name, size }: UserAvatarProps) {
  return <>{!src ? <NoAvatar name={name} size={size} /> : <Avatar src={src} size={size} />}</>
}
