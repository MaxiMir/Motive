import { useIntl } from 'react-intl'

type Page = 'feed' | 'home' | 'contact' | 'search' | 'following' | 'articles' | '404' | '500'

export const useMeta = (page: Page) => {
  const { formatMessage } = useIntl()
  const skipDescription = ['404', '500', 'feed'].includes(page)

  return {
    title: formatMessage({ id: `page.${page}.title` }),
    description: skipDescription ? undefined : formatMessage({ id: `page.${page}.description` }),
  }
}