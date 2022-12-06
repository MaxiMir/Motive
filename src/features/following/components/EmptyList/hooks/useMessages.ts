import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.empty' }),
    hint: formatMessage({ id: 'page.following.list.hint' }),
  }
}

export default useMessages
