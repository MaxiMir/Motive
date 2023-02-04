import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    huntsText: formatMessage({ id: 'component.old-pitt-rules.hunts' }),
    burnText: formatMessage({ id: 'component.old-pitt-rules.burn' }),
    coversText: formatMessage(
      { id: 'component.old-pitt-rules.covers', defaultMessage: '' },
      { day: process.env.NEXT_PUBLIC_SHOW_WEB_AFTER_DAYS },
    ),
    eatsText: formatMessage(
      { id: 'component.old-pitt-rules.eats', defaultMessage: '' },
      { day: process.env.NEXT_PUBLIC_EAT_AFTER_DAYS },
    ),
  }
}
