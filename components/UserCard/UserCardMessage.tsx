import { Role, UserBase } from 'dto'

export interface UserCardMessageProps {
  type: 'message'
  user: UserBase
  role: Role
}

export default function UserCardMessage({ user, role }: UserCardMessageProps): JSX.Element {
  console.log(user, role)
  return <></>
}
