import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    label: formatMessage({ id: 'component.video-preview.label' }),
  }
}
