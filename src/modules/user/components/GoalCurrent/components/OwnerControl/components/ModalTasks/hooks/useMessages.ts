import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    titleText: formatMessage({ id: 'page.user.modal-tasks.title' }),
    subtitleText: formatMessage({ id: 'page.user.modal-tasks.subtitle' }),
    addTaskText: formatMessage({ id: 'common.task-add' }),
    buttonText: formatMessage({ id: 'common.create' }),
    loadingText: formatMessage({ id: 'common.creating' }),
    doItText: formatMessage({ id: 'page.user.modal-tasks.do-it' }),
    doItLabelledby: formatMessage({ id: 'page.user.modal-tasks.do-it-labelledby' }),
    todayText: formatMessage({ id: 'common.today' }),
    tomorrowText: formatMessage({ id: 'common.tomorrow' }),
    pittText: formatMessage({ id: 'page.user.modal-tasks.pitt' }),
    pittAria: formatMessage({ id: 'page.user.modal-tasks.pitt-aria' }),
    tooltipText: formatMessage({ id: 'page.user.modal-tasks.tooltip' }),
  }
}
