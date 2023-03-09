import { useIntl } from 'react-intl'
import { Route } from 'shared/config'

export const useRoutes = () => {
  const { formatMessage } = useIntl()

  return [
    {
      primary: formatMessage({ id: 'common.articles' }),
      icon: 'subtitles',
      href: Route.Articles,
    },
    {
      primary: formatMessage({ id: 'common.donate' }),
      icon: 'toll',
      href: Route.Donate,
    },
    {
      primary: formatMessage({ id: 'common.contact' }),
      icon: 'mark_as_unread',
      href: Route.Contact,
    },
  ]
}
