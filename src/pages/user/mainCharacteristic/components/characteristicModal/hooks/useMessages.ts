import { useIntl } from 'react-intl'
import { MainCharacteristicName } from 'shared/api'

export const useMessages = (name: MainCharacteristicName) => {
  const { formatMessage } = useIntl()
  const completion = name === MainCharacteristicName.Motivation

  return {
    title: formatMessage({ id: `common.${name}` }),
    header: formatMessage({ id: `page.user.modal-characteristic.${name}.header` }),
    points: formatMessage({ id: `page.user.modal-characteristic.${name}.points` }),
    completion: completion && formatMessage({ id: 'common.goal-completion' }),
  }
}
