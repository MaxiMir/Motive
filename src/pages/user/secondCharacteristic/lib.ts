import { useIntl } from 'react-intl'
import { SecondCharacteristicName } from 'shared/api'
import { getWordDeclination } from 'shared/lib/helpers'

export const useWordDeclination = (name: SecondCharacteristicName, value: number) => {
  const { formatMessage } = useIntl()
  const singleText = formatMessage({ id: `common.${name}-single` })
  const doubleText = formatMessage({ id: `common.${name}-double` })
  const multipleGenitiveText = formatMessage({ id: `common.${name}-genitive` })

  return getWordDeclination(value, [singleText, doubleText, multipleGenitiveText])
}
