import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    openText: formatMessage({ id: 'common.open' }),
    editText: formatMessage({ id: 'common.edit' }),
    deleteText: formatMessage({ id: 'common.delete' }),
  }
}
