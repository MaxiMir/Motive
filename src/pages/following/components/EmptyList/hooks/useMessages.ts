import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.empty' }),
    hint: formatMessage({ id: 'page.following.list.hint' }),
  }
}