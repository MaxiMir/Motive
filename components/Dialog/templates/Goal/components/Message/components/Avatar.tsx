import { UserBase } from 'dto'
import AvatarBase from 'components/UserCard/templates/Avatar'

interface AvatarProps {
  user: UserBase
}

export default function Avatar({ user }: AvatarProps): JSX.Element {
  return (
    <>
      <AvatarBase type="avatar" size={40} {...user} />
    </>
  )
}
