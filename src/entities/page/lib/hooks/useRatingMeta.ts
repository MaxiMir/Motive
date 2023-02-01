import { useIntl } from 'react-intl'

export const useRatingMeta = (tab: number) => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: `page.rating.title.tab-${tab}` }),
    description: formatMessage({ id: 'page.rating.description' }),
  }
}
