import { useIntl } from 'react-intl'
import { OnlineIndexName } from 'shared/api'
import { getWordDeclination } from 'shared/lib/helpers'

export function useWordDeclination(name: OnlineIndexName | 'level', value: number) {
  const { formatMessage } = useIntl()
  const singleText = formatMessage({ id: `common.${name}-single` })
  const doubleText = formatMessage({ id: `common.${name}-double` })
  const multipleGenitiveText = formatMessage({ id: `common.${name}-genitive` })

  return getWordDeclination(value, [singleText, doubleText, multipleGenitiveText])
}
