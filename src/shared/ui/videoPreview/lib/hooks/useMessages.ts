import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    removeText: formatMessage({ id: 'component.video-preview.label' }),
  }
}
