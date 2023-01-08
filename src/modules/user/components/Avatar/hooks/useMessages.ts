import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.open-photo' }),
    openText: formatMessage({ id: 'common.open' }),
    editText: formatMessage({ id: 'common.edit' }),
    deleteText: formatMessage({ id: 'common.delete' }),
    cancelText: formatMessage({ id: 'common.cancel' }),
  }
}