import { useIntl } from 'react-intl'
import { Route } from '@href'

export const useRoutes = () => {
  const { formatMessage } = useIntl()

  return [
    {
      primary: formatMessage({ id: 'component.footer.top' }),
      icon: 'show_chart',
      href: Route.TopOfTheDay,
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
      primary: formatMessage({ id: 'common.articles' }),
      icon: 'subtitles',
      href: Route.Articles,
    },
    {
      primary: formatMessage({ id: 'common.features' }),
      icon: 'widgets',
      href: Route.Features,
    },
    {
      primary: formatMessage({ id: 'common.contact' }),
      icon: 'mark_as_unread',
      href: Route.Contact,
    },
  ]
}
