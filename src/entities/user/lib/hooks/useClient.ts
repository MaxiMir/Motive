import { useSession } from 'next-auth/react'
import { ClientDto } from '@shared/api/user'

export const useClient = (): ClientDto | undefined => {
  const { data, status } = useSession()
  const user = data?.user as ClientDto | undefined

  return status !== 'authenticated' || !user
    ? undefined
    : {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        avatar: user.avatar,
      }
}