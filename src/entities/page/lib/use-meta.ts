import { useIntl } from 'react-intl'

type Page =
  | 'feed'
  | 'home'
  | 'contact'
  | 'donate'
  | 'search'
  | 'rating'
  | 'following'
  | 'blog'
  | 'privacy-policy'
  | '404'
  | '500'

export function useMeta(page: Page) {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: `page.${page}.title` }),
    description: formatMessage({ id: `page.${page}.description` }),
  }
}
