import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'page.user.modal-feedback.title' }),
    label: formatMessage({ id: 'page.user.modal-feedback.label' }),
    subtitle: formatMessage({ id: 'page.user.modal-feedback.subtitle' }),
    photoTitle: formatMessage({ id: 'page.user.modal-feedback.photo-title' }),
    videoTitle: formatMessage({ id: 'page.user.modal-feedback.video-title' }),
    buttonText: formatMessage({ id: 'page.user.modal-feedback.button' }),
    loadingText: formatMessage({ id: 'page.user.modal-feedback.loading' }),
  }
}

export default useMessages
