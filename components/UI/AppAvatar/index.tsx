import dynamic from 'next/dynamic'

const Avatar = dynamic(() => import('./components/Avatar'))
const NoAvatar = dynamic(() => import('./components/NoAvatar'))

export interface UserAvatarProps {
  src?: string | null
  size: 80 | 55 | 35 | 32 | 26
}

export default function AppAvatar({ src, size }: UserAvatarProps): JSX.Element {
  return <>{!src ? <NoAvatar size={size} /> : <Avatar src={src} size={size} />}</>
}
