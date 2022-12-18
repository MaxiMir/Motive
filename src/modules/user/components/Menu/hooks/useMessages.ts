import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.open-menu' }),
    ariaControls: formatMessage({ id: 'common.menu' }),
  }
}
