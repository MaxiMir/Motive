import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.upload-photo' }),
    description: formatMessage({ id: 'common.photo-description' }),
    typesText: formatMessage({ id: 'common.photo-types' }),
    selectText: formatMessage({ id: 'common.select-file' }),
    hintText: formatMessage({ id: 'common.photo-hint' }),
  }
}
