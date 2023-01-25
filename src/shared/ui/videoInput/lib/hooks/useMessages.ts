import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'component.video-input.title' }),
    soonText: formatMessage({ id: 'common.soon' }),
  }
}
