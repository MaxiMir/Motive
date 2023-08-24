import { useIntl } from 'react-intl'
import { PRIORITIES } from 'shared/api'

export function usePriorityList() {
  const { formatMessage } = useIntl()
  const label = formatMessage({ id: 'common.priority' })
  const list = PRIORITIES.map((priority) => ({
    name: formatMessage({ id: `common.${priority}` }),
    value: priority.toLowerCase(),
  }))

  return { label, list }
}
