import { useIntl } from 'react-intl'
import { GoalCharacteristicName } from '@shared/api/characteristic'

export const useMessages = (name: GoalCharacteristicName | 'runningDays') => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: `component.characteristic-goal.${name}` }),
  }
}
