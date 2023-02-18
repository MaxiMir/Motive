import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.support' }),
    header: formatMessage({ id: 'common.support' }),
    buttonText: formatMessage({ id: 'common.supporting' }),
    label: formatMessage({ id: 'common.your-message' }),
    loadingText: formatMessage({ id: 'common.sending' }),
    goalText: formatMessage({ id: 'component.support-rules-goal' }),
    tiredText: formatMessage({ id: 'component.support-rules-tired' }),
    thereforeText: formatMessage({ id: 'component.support-rules-therefore' }),
    adviceText: formatMessage({ id: 'component.support-rules-advice' }),
    wordsText: formatMessage({ id: 'component.support-rules-words' }),
  }
}
