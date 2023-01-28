import { useIntl } from 'react-intl'

export const useMessages = (name: string) => {
  const { formatMessage } = useIntl()

  return {
    lvlText: formatMessage({ id: 'common.lvl-short' }),
    header: formatMessage({ id: `common.${name}` }),
  }
}
