import { useSession } from 'next-auth/react'
import { ClientDto } from 'src/common/dto'

export default function useClient(): ClientDto | undefined {
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
