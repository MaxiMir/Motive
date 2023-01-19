import { useIntl } from 'react-intl'

type Page = 'home' | 'contact' | 'search' | 'following' | '404' | '500'

const useMetaTags = (page: Page) => {
  const { formatMessage } = useIntl()
  const errorPage = ['404', '500'].includes(page)

  return {
    title: formatMessage({ id: `page.${page}.title` }),
    description: errorPage ? undefined : formatMessage({ id: `page.${page}.description` }),
  }
}

export default useMetaTags
