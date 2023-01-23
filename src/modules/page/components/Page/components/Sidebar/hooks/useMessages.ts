import { useIntl } from 'react-intl'

export const useMessages = (open: boolean) => {
  const { formatMessage } = useIntl()

  return {
    ariaLabel: formatMessage({ id: open ? 'common.close' : 'common.open-menu' }),
  }
}
