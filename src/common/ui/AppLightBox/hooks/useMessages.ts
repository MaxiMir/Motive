import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    nextLabel: formatMessage({ id: 'common.next' }),
    prevLabel: formatMessage({ id: 'common.previous' }),
    zoomInLabel: formatMessage({ id: 'common.zoom-in' }),
    zoomOutLabel: formatMessage({ id: 'common.zoom-out' }),
    closeLabel: formatMessage({ id: 'common.close' }),
  }
}

export default useMessages
