import { useClient } from 'entities/user'

export const useCheckOnClientPage = (id: number) => {
  const client = useClient()

  return id === client?.id
}
