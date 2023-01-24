import { useIntl } from 'react-intl'
import { SecondCharacteristicName } from '@entities/characteristic'

export const useMessages = (name: SecondCharacteristicName) => {
  const { formatMessage } = useIntl()

  return {
    singleText: formatMessage({ id: `common.${name}-single` }),
    doubleText: formatMessage({ id: `common.${name}-double` }),
    multipleGenitiveText: formatMessage({ id: `common.${name}-genitive` }),
  }
}
