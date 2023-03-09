import { useIntl } from 'react-intl'

type Page =
  | 'feed'
  | 'home'
  | 'contact'
  | 'donate'
  | 'search'
  | 'rating'
  | 'following'
  | 'articles'
  | '404'
  | '500'

export const useMeta = (page: Page) => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: `page.${page}.title` }),
    description: formatMessage({ id: `page.${page}.description` }),
  }
}
