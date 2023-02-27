import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    labelledby: formatMessage({ id: 'common.message-type' }),
    questionText: formatMessage({ id: 'common.question' }),
    supportingText: formatMessage({ id: 'common.supporting' }),
  }
}
