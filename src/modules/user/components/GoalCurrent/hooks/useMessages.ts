import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    stagesHeader: formatMessage({ id: 'page.user.goal-current.stages-header' }),
    tasksHeader: formatMessage({ id: 'page.user.goal-current.tasks-header' }),
    feedbackHeader: formatMessage({ id: 'page.user.goal-current.feedback-header' }),
    discussionHeader: formatMessage({ id: 'page.user.goal-current.discussion-header' }),
  }
}
