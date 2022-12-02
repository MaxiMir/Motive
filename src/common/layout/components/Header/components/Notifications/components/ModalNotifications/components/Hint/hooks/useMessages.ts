import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'page.user.modal-notification.hint' }),
    buttonText: formatMessage({ id: 'common.turn-on' }),
  }
}

export default useMessages
