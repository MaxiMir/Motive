import { useIntl } from 'react-intl'

export const useMessages = (stages: string[], dayStage: number) => {
  const { formatMessage } = useIntl()
  const isFinal = stages.length === dayStage

  return {
    title: formatMessage(
      { id: 'page.user.modal-stage.title', defaultMessage: '' },
      { value: stages[dayStage] },
    ),
    behind: formatMessage({ id: 'page.user.modal-stage.behind' }),
    button: formatMessage({ id: 'common.complete' }),
    buttonLoading: formatMessage({ id: 'common.completing' }),
    nextTitle: formatMessage({ id: `page.user.modal-stage.title-${isFinal ? 'final' : 'next'}` }),
  }
}
