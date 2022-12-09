import { useIntl } from 'react-intl'

type Page = 'home' | 'contact' | 'search' | 'following'

const useMetaTags = (page: Page) => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: `page.${page}.title` }),
    description: formatMessage({ id: `page.${page}.description` }),
  }
}

export default useMetaTags
