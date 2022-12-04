import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    editedText: formatMessage({ id: 'common.edited' }),
    replyText: formatMessage({ id: 'common.reply' }),
  }
}

export default useMessages
