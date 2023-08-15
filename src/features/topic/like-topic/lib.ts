import { useIntl } from 'react-intl'

export function useTitle(like: boolean | undefined, disabled: boolean) {
  const { formatMessage } = useIntl()

  if (disabled) {
    return formatMessage({ id: 'common.helpful' })
  }

  return formatMessage({ id: !like ? 'common.like' : 'common.unlike' })
}
