import { useIntl } from 'react-intl'

export const useMessages = (name: string) => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: `page.home.advantage.${name}.title` }),
    subtitle: formatMessage({ id: `page.home.advantage.${name}.subtitle` }),
  }
}
