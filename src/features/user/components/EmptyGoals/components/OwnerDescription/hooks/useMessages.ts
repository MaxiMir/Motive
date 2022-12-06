import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'page.user.owner-description.title' }),
    subtitle: formatMessage({ id: 'page.user.owner-description.subtitle' }),
    description: formatMessage({ id: 'page.user.owner-description.description' }),
    link: formatMessage({ id: 'page.user.owner-description.link' }),
  }
}

export default useMessages
