import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useIntl } from 'react-intl'
import { OGType, UserPageDto } from '@modules/page/dto'
import { parseUrl } from '@helpers/url'
import { getImageSrc, Route } from '@href'
import { PageService } from './service'

export const useFollowingPage = () => {
  return useQuery(['page', Route.Following], PageService.getFollowing, {
    staleTime: 5_000,
  })
}

export const useRatingPage = () => {
  return useQuery(['page', Route.Rating], PageService.getRating, {
    staleTime: 30000,
  })
}

export const useSearchPage = () => {
  const { query: params } = useRouter()

  return useQuery(['page', Route.Search], () => PageService.getSearch({ params }), {
    staleTime: 5_000,
  })
}

export const useUserPage = () => {
  const { asPath } = useRouter()
  const { origin, searchParams } = parseUrl(asPath)
  const nickname = origin.replace('/', '')

  return useQuery(
    ['page', nickname],
    () => PageService.getUser(nickname, { params: searchParams }),
    {
      staleTime: 5_000,
    },
  )
}

export const useUserMetaTags = (user?: UserPageDto) => {
  const { formatMessage } = useIntl()

  if (!user) {
    return null
  }

  const partTitle = formatMessage({ id: 'page.user.title-profile' })
  const descriptionMessageTmpl = formatMessage({ id: 'page.user.description' })
  const goalNames = user.goals.map(({ name }) => `«${name}»`).join(', ')
  const image = !user.avatar ? undefined : getImageSrc(user.avatar)
  const userTag = `${user.name} (@${user.nickname})`
  const descriptionStart = descriptionMessageTmpl.replace('$0', userTag)

  return {
    title: `${userTag} • ${partTitle} ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: `${descriptionStart} ${goalNames}`,
    keywords: user.confirmations.map((c) => c.goal.name).join(', '),
    image,
    type: OGType.Profile,
  }
}
