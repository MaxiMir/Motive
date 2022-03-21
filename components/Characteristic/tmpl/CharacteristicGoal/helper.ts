import { GoalCharacteristicName } from 'dto'
import { toUpperFirstChar } from 'helpers/prepare'

export const getTitle = (name: GoalCharacteristicName | 'runs for days'): string => {
  switch (name) {
    case 'creativity':
    case 'motivation':
    case 'support':
      return `Goal's ${name} points`
    default:
      return toUpperFirstChar(name)
  }
}
