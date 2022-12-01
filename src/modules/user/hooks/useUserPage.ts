import { useQuery } from 'react-query'
import PageService from '@services/page'
import useUserPageConfig from './useUserPageConfig'

const useUserPage = () => {
  const { key, asPath } = useUserPageConfig()

  return useQuery(key, () => PageService.getUser(asPath), {
    staleTime: 5_000,
  })
}

export default useUserPage
