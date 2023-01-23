import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'

export const useRatingTab = () => {
  const { query } = useRouter()
  const parsedTab = Math.abs(Number(query?.tab))

  return !parsedTab || parsedTab > 2 ? 0 : parsedTab
}

export const useRatingMeta = (tab: number) => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: `page.rating.title.tab-${tab}` }),
    description: formatMessage({ id: 'page.rating.description' }),
  }
}
