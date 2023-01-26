import { useIntl } from 'react-intl'

export const enum Route {
  Feed = '/feed',
  Search = '/search',
  Rating = '/rating',
  Following = '/following',
  Contact = '/contact',
  Articles = '',
}

export const enum SearchParam {
  Dates = 'd',
  ScrollTo = 's',
  ScrollId = 'i',
}

export const enum HashMark {
  Goal = 'goal',
  Feedback = 'feedback',
  Discussion = 'discussion',
}

export const useDesktopRoutes = () => {
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
      primary: formatMessage({ id: 'common.articles' }),
      icon: 'subtitles',
      href: Route.Articles,
    },
    {
      primary: formatMessage({ id: 'common.contact' }),
      icon: 'mark_as_unread',
      href: Route.Contact,
    },
  ]
}
