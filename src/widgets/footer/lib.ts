import { useIntl } from 'react-intl'
import { Route } from 'shared/config'
import { Following, Rating, Search, Feed } from 'shared/ui/icons'

export const useRoutes = () => {
  const { formatMessage } = useIntl()

  return [
    {
      title: formatMessage({ id: 'page.feed.title' }),
      href: Route.Feed,
      Component: Feed,
    },
    {
      title: formatMessage({ id: 'component.footer.search' }),
      href: Route.Search,
      Component: Search,
    },
    {
      title: formatMessage({ id: 'component.footer.rating' }),
      href: Route.Rating,
      Component: Rating,
    },
    {
      title: formatMessage({ id: 'common.following' }),
      href: Route.Following,
      Component: Following,
    },
  ]
}
