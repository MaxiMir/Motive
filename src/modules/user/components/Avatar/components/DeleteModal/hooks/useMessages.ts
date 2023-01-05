import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.warning' }),
    description: formatMessage({ id: 'common.delete-warning' }),
    deleteText: formatMessage({ id: 'common.delete' }),
    deletingText: formatMessage({ id: 'common.deleting' }),
  }
}
