import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    goalText: formatMessage({ id: 'component.support-rules-goal' }),
    tiredText: formatMessage({ id: 'component.support-rules-tired' }),
    thereforeText: formatMessage({ id: 'component.support-rules-therefore' }),
    adviceText: formatMessage({ id: 'component.support-rules-advice' }),
    wordsText: formatMessage({ id: 'component.support-rules-words' }),
  }
}
