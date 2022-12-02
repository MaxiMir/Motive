import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'component.video-input.title' }),
    soonText: formatMessage({ id: 'common.soon' }),
  }
}

export default useMessages
