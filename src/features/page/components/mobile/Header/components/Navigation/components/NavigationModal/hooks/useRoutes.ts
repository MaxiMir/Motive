import { useIntl } from 'react-intl'
import { Route } from '@href'

export const useRoutes = () => {
  const { formatMessage } = useIntl()

  return [
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
