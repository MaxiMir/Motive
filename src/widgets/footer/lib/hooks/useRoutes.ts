import { useIntl } from 'react-intl'
import TopOfTheDay from '@shared/ui/icons/TopOfTheDay'
import Search from '@shared/ui/icons/Search'
import Rating from '@shared/ui/icons/Rating'
import Following from '@shared/ui/icons/Following'
import { Route } from '@shared/config/routes'

export const useRoutes = () => {
  const { formatMessage } = useIntl()

  return [
    {
      title: formatMessage({ id: 'page.feed.title' }),
      href: Route.Feed,
      Component: TopOfTheDay,
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
