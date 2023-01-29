import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'page.user.modal-join.title' }),
    subtitle: formatMessage({ id: 'page.user.modal-join.subtitle' }),
    buttonText: formatMessage({ id: 'common.join' }),
    loadingText: formatMessage({ id: 'common.joining' }),
    beginLabel: formatMessage({ id: 'page.user.modal-join.begin-label' }),
    dayLabel: formatMessage({ id: 'page.user.modal-join.day-label' }),
    accordionHeader: formatMessage({ id: 'page.user.modal-join.accordion-header' }),
    accordingMotivation: formatMessage({ id: 'page.user.modal-join.according-motivation' }),
    accordingCreative: formatMessage({ id: 'page.user.modal-join.according-creative' }),
    accordingSupport: formatMessage({ id: 'page.user.modal-join.according-support' }),
    accordingNeeded: formatMessage({ id: 'page.user.modal-join.according-needed' }),
    accordingQuestions: formatMessage({ id: 'page.user.modal-join.according-questions' }),
  }
}
