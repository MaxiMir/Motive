import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'component.modal-completion.title' }),
    buttonText: formatMessage({ id: 'common.complete' }),
    loadingText: formatMessage({ id: 'common.completing' }),
    subtitle: formatMessage({ id: 'component.modal-completion.subtitle' }),
    label: formatMessage({ id: 'component.modal-completion.label' }),
    photoTitle: formatMessage({ id: 'component.modal-completion.photoTitle' }),
    videoTitle: formatMessage({ id: 'component.modal-completion.videoTitle' }),
    accordionHeader: formatMessage({ id: 'component.modal-completion.accordionHeader' }),
    ariaControls: formatMessage({ id: 'component.modal-completion.aria' }),
    detailsStart: formatMessage({ id: 'component.modal-completion.details-start' }),
    detailsEnd: formatMessage({ id: 'component.modal-completion.details-end' }),
  }
}

export default useMessages
