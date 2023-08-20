import { useIntl } from 'react-intl'

export function useMessages(stages: string[], dayStage: number) {
  const { formatMessage } = useIntl()
  const isFinal = stages.length === dayStage

  return {
    title: formatMessage(
      { id: 'page.user.modal-stage.title', defaultMessage: '' },
      { value: stages[dayStage] },
    ),
    behind: formatMessage({ id: 'page.user.modal-stage.behind' }),
    buttonText: formatMessage({ id: 'common.complete' }),
    loadingText: formatMessage({ id: 'common.completing' }),
    nextTitle: formatMessage({ id: `page.user.modal-stage.title-${isFinal ? 'final' : 'next'}` }),
  }
}
