import { useIntl } from 'react-intl'

export const useMessages = (feedbackAdded: boolean) => {
  const { formatMessage } = useIntl()

  return {
    title: !feedbackAdded && formatMessage({ id: 'component.tooltip.feedback' }),
    doneButtonText: formatMessage({ id: 'common.done' }),
    nextButtonText: formatMessage({ id: 'common.next' }),
  }
}
