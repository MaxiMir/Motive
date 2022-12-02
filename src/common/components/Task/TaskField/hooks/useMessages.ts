import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    label: formatMessage({ id: 'component.task-field.label' }),
    placeholder: formatMessage({ id: 'component.task-field.placeholder' }),
    closeText: formatMessage({ id: 'component.task-field.close' }),
    remindText: formatMessage({ id: 'component.task-field.remind' }),
    soonText: formatMessage({ id: 'common.soon' }),
  }
}

export default useMessages
