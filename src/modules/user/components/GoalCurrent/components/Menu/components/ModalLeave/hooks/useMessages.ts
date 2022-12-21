import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'page.user.modal-leave.title' }),
    buttonText: formatMessage({ id: 'page.user.modal-leave.button' }),
    loadingText: formatMessage({ id: 'page.user.modal-leave.loading' }),
    subtitle: formatMessage({ id: 'page.user.modal-leave.subtitle' }),
  }
}
