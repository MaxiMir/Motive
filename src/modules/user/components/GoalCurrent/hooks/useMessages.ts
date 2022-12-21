import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    stagesHeader: formatMessage({ id: 'page.user.goal-current.stages-header' }),
    stagesAria: formatMessage({ id: 'page.user.goal-current.stages-aria' }),
    tasksHeader: formatMessage({ id: 'page.user.goal-current.tasks-header' }),
    tasksAria: formatMessage({ id: 'page.user.goal-current.tasks-aria' }),
    feedbackHeader: formatMessage({ id: 'page.user.goal-current.feedback-header' }),
    feedbackAria: formatMessage({ id: 'page.user.goal-current.feedback-aria' }),
    discussionHeader: formatMessage({ id: 'page.user.goal-current.discussion-header' }),
    discussionAria: formatMessage({ id: 'page.user.goal-current.discussion-aria' }),
  }
}
