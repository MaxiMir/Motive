import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'page.user.modal-goal.title' }),
    nameLabel: formatMessage({ id: 'page.user.modal-goal.name' }),
    hashtagText: formatMessage({ id: 'page.user.modal-goal.hashtag' }),
    hashtagsLabel: formatMessage({ id: 'page.user.modal-goal.hashtags' }),
    buttonText: formatMessage({ id: 'common.create' }),
    loadingText: formatMessage({ id: 'common.creating' }),
    stagesHeader: formatMessage({ id: 'page.user.modal-goal.stages' }),
    stageLabel: formatMessage({ id: 'page.user.modal-goal.stage' }),
    stageButtonText: formatMessage({ id: 'page.user.modal-goal.stage-button' }),
    stageHint: formatMessage({ id: 'page.user.modal-goal.stage-hint' }),
    startHeader: formatMessage({ id: 'page.user.modal-goal.start' }),
    startLabelledby: formatMessage({ id: 'page.user.modal-goal.start-labelledby' }),
    todayLabel: formatMessage({ id: 'common.today' }),
    tomorrowLabel: formatMessage({ id: 'common.tomorrow' }),
    tasksHeader: formatMessage({ id: 'page.user.modal-goal.tasks-header' }),
    addTaskText: formatMessage({ id: 'common.task-add' }),
    deleteText: formatMessage({ id: '"common.delete"' }),
  }
}
