import { useIntl } from 'react-intl'

export const useMessages = (name: string, active: boolean) => {
  const { formatMessage } = useIntl()
  const nameText = formatMessage({ id: `page.user.topic.${name}` })
  const titleTmpl = formatMessage({
    id: active ? 'page.user.topic.title-decrease' : 'page.user.topic.title-increase',
  })
  const title = titleTmpl.replace('$0', nameText)

  return {
    title,
  }
}
