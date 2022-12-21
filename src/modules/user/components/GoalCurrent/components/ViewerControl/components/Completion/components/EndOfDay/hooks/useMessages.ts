import { useIntl } from 'react-intl'

export const useMessages = (title: boolean) => {
  const { formatMessage } = useIntl()

  return {
    title: !title ? '' : formatMessage({ id: 'component.tooltip.tomorrow' }),
    buttonText: formatMessage({ id: 'common.next' }),
  }
}
