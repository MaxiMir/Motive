import { useIntl } from 'react-intl'
import { useQuery } from 'react-query'
import { getArticlePage } from 'shared/api'

export const useArticlePage = (pathname: string) => {
  const { locale } = useIntl()
  const params = { locale }

  return useQuery(['page', pathname], () => getArticlePage(pathname, { params }), {
    staleTime: 5_000,
  })
}
