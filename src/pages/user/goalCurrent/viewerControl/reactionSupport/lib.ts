import { useIntl } from 'react-intl'

export const useMessages = (ownerName: string) => {
  const { formatMessage } = useIntl()
  const supportingText = formatMessage({ id: 'common.supporting' })

  return {
    title: `${supportingText} ${ownerName}`,
  }
}
