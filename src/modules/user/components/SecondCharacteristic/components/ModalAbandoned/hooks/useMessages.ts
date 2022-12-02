import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.abandoned' }),
    header: formatMessage({ id: 'page.user.modal-abandoned.header' }),
  }
}

export default useMessages
