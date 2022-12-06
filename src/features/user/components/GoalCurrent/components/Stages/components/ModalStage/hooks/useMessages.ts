import { useIntl } from 'react-intl'

const useMessages = (isFinal: boolean) => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'page.user.modal-stage.title' }),
    behind: formatMessage({ id: 'page.user.modal-stage.behind' }),
    button: formatMessage({ id: 'common.complete' }),
    buttonLoading: formatMessage({ id: 'common.completing' }),
    nextTitle: formatMessage({ id: `page.user.modal-stage.title-${isFinal ? 'final' : 'next'}` }),
  }
}

export default useMessages
