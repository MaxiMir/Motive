import { useIntl } from 'react-intl'
import { getImageSrc } from '@href'
import { OGType, UserPageDto } from '@features/page'

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
