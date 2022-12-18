import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    doneButtonText: formatMessage({ id: 'common.done' }),
    nextButtonText: formatMessage({ id: 'common.next' }),
  }
}
