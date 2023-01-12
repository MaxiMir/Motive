import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    signInText: formatMessage({ id: 'common.sign-in' }),
    withText: formatMessage({ id: 'common.with' }),
  }
}
