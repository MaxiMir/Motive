import { useIntl } from 'react-intl'
import { Route } from '@shared/consts'
import Following from '@shared/ui/icons/Following'
import Rating from '@shared/ui/icons/Rating'
import Search from '@shared/ui/icons/Search'
import TopOfTheDay from '@shared/ui/icons/TopOfTheDay'

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
