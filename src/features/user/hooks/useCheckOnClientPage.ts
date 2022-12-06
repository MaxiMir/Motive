import useClient from '@hooks/useClient'

const useCheckOnClientPage = (id: number) => {
  const client = useClient()

  return id === client?.id
}

export default useCheckOnClientPage
