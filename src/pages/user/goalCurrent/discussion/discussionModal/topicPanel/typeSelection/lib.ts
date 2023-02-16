import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    labelledby: formatMessage({ id: 'common.select-message-type' }),
    questionLabel: formatMessage({ id: 'common.question' }),
    supportingLabel: formatMessage({ id: 'common.supporting' }),
  }
}
