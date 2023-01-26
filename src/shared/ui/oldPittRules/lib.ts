import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()
  const coversMessageTmpl = formatMessage({ id: 'component.old-pitt-rules.covers' })
  const eatsMessageTmpl = formatMessage({ id: 'component.old-pitt-rules.eats' })

  return {
    huntsText: formatMessage({ id: 'component.old-pitt-rules.hunts' }),
    burnText: formatMessage({ id: 'component.old-pitt-rules.burn' }),
    coversText: coversMessageTmpl.replace('$0', process.env.NEXT_PUBLIC_SHOW_WEB_AFTER_DAYS || ''),
    eatsText: eatsMessageTmpl.replace('$0', process.env.NEXT_PUBLIC_EAT_AFTER_DAYS || ''),
  }
}
