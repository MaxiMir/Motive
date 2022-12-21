import { useIntl } from 'react-intl'

export const useMessages = (ariaLabel: boolean) => {
  const { formatMessage } = useIntl()

  return {
    ariaLabel: !ariaLabel ? '' : formatMessage({ id: 'component.gallery-photo.aria' }),
  }
}
