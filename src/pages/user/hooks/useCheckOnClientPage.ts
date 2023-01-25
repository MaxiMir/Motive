import useClient from '@lib/hooks/useClient'

export const useCheckOnClientPage = (id: number) => {
  const client = useClient()

  return id === client?.id
}
