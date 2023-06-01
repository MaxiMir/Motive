import { useIntl } from 'react-intl'

export const useTitle = (name: string, disabled: boolean) => {
  const { formatMessage } = useIntl()
  const value = formatMessage({ id: `page.user.topic.${name}` })

  return formatMessage(
    {
      id: disabled ? 'page.user.topic.title-decrease' : 'page.user.topic.title-increase',
      defaultMessage: '',
    },
    { value },
  )
}
