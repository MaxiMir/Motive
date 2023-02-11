import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'page.user.modal-tasks.title' }),
    addTaskText: formatMessage({ id: 'common.task-add' }),
    buttonText: formatMessage({ id: 'common.create' }),
    loadingText: formatMessage({ id: 'common.creating' }),
    doItText: formatMessage({ id: 'page.user.modal-tasks.do-it' }),
    doItLabelledby: formatMessage({ id: 'page.user.modal-tasks.do-it-labelledby' }),
    todayText: formatMessage({ id: 'common.today' }),
    tomorrowText: formatMessage({ id: 'common.tomorrow' }),
    pittText: formatMessage({ id: 'page.user.modal-tasks.pitt' }),
    tooltipText: formatMessage({ id: 'page.user.modal-tasks.tooltip' }),
  }
}
