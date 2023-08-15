import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useViewerAct } from 'entities/viewer'
import { ReportType, createReport } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

export function useSendReport(entityId: number, type: ReportType, onSettled: () => void) {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const { mutate } = useMutation(createReport, {
    onSuccess() {
      const message = formatMessage({ id: 'component.report.message' })
      enqueueSnackbar(message, { severity: 'success', icon: '🧞‍♂️️‍' })
    },
    onSettled,
  })

  return useViewerAct((reason: string) => mutate({ entityId, type, reason }))
}
