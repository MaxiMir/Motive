import { useIntl } from 'react-intl'

const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'common.support' }),
    header: formatMessage({ id: 'common.support' }),
    buttonText: formatMessage({ id: 'common.supporting' }),
    label: formatMessage({ id: 'common.your-message' }),
    loadingText: formatMessage({ id: 'common.sending' }),
    ariaControls: formatMessage({ id: 'component.modal-support.aria' }),
    accordionGoal: formatMessage({ id: 'component.modal-support.accordion-goal' }),
    accordionTired: formatMessage({ id: 'component.modal-support.accordion-tired' }),
    accordionTherefore: formatMessage({ id: 'component.modal-support.accordion-therefore' }),
    accordionAdvice: formatMessage({ id: 'component.modal-support.accordion-advice' }),
    accordionEncouragement: formatMessage({ id: 'component.modal-support.accordion-encouragement' }),
  }
}

export default useMessages
