import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    agoText: formatMessage({ id: 'common.ago' }),
    editedText: formatMessage({ id: 'common.edited' }),
    replyText: formatMessage({ id: 'common.reply' }),
  }
}

export default useMessages
