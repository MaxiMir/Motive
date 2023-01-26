import { useIntl } from 'react-intl'
import { MainCharacteristicName } from '@shared/api/dto'

export const useMessages = (name: MainCharacteristicName) => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: `common.${name}` }),
    header: formatMessage({ id: `page.user.modal-characteristic.${name}.header` }),
    points: formatMessage({ id: `page.user.modal-characteristic.${name}.points` }),
    completion:
      name === MainCharacteristicName.Motivation && formatMessage({ id: 'common.goal-completion' }),
  }
}
