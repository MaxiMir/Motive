import { useIntl } from 'react-intl'
import { useQuery } from 'react-query'
import { getBlogPage } from 'shared/api'
import { Route } from 'shared/config'

export const useBlogPage = () => {
  const { locale } = useIntl()
  const params = { locale }

  return useQuery(['page', Route.Blog], () => getBlogPage({ params }), {
    staleTime: 5_000,
    refetchOnWindowFocus: false,
  })
}
