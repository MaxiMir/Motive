import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    editedText: formatMessage({ id: 'common.edited' }),
    replyText: formatMessage({ id: 'common.reply' }),
  }
}
