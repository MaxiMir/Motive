import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    ariaLabel: formatMessage({ id: 'component.gallery-photo.aria' }),
  }
}
