import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    lvlText: formatMessage({ id: 'common.lvl-short' }),
  }
}
