import { useIntl } from 'react-intl'

export const useMessages = (open: boolean) => {
  const { formatMessage } = useIntl()

  return {
    buttonText: formatMessage({ id: `common.show-${open ? 'less' : 'more'}` }),
  }
}
