import { useIntl } from 'react-intl'
import { OGType, UserPageDto } from 'shared/api'
import { getImageSrc } from 'shared/lib/helpers'

export const useUserMetaTags = (user?: UserPageDto) => {
  const { formatMessage } = useIntl()

  if (!user) {
    return null
  }

  const userTag = `${user.name} (@${user.nickname})`
  const titleCenter = formatMessage({ id: 'page.user.title-profile' })
  const descriptionStart = formatMessage(
    { id: 'page.user.description', defaultMessage: '' },
    { name: userTag },
  )
  const goalNames = user.goals.map(({ name }) => `«${name}»`).join(', ')

  return {
    title: `${userTag} • ${titleCenter} ${process.env.NEXT_PUBLIC_APP_NAME}`,
    description: `${descriptionStart} ${goalNames}`,
    keywords: user.confirmations.map((c) => c.goal.name).join(', '),
    image: !user.avatar ? undefined : getImageSrc(user.avatar),
    type: OGType.Profile,
  }
}
