import { useIntl } from 'react-intl'
import { Route } from 'shared/config'

export function useRoutes() {
  const { formatMessage } = useIntl()

  return [
    {
      primary: formatMessage({ id: 'page.feed.title' }),
      icon: 'show_chart',
      href: Route.Feed,
    },
    {
      primary: formatMessage({ id: 'component.footer.search' }),
      icon: 'search',
      href: Route.Search,
    },
    {
      primary: formatMessage({ id: 'component.footer.rating' }),
      icon: 'sort',
      href: Route.Rating,
    },
    {
      primary: formatMessage({ id: 'common.following' }),
      icon: 'star',
      href: Route.Following,
    },
    {
      primary: formatMessage({ id: 'common.blog' }),
      icon: 'subtitles',
      href: Route.Blog,
    },
    {
      primary: formatMessage({ id: 'common.donate' }),
      icon: 'toll',
      href: Route.Donate,
    },
  ]
}
