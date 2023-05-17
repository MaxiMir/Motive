import { useIntl } from 'react-intl'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { getArticlePage } from 'shared/api'

export const useArticlePage = () => {
  const { query } = useRouter()
  const { locale } = useIntl()
  const params = { locale }
  const pathname = String(query.id)

  return useQuery(['page', pathname], () => getArticlePage(pathname, { params }), {
    staleTime: 5_000,
  })
}
