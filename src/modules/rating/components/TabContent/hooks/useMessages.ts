import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    userText: formatMessage({ id: 'common.user' }),
    lvlText: formatMessage({ id: 'common.lvl' }),
  }
}
