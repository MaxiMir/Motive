import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { useOpenSignIn } from 'entities/signin'
import { useClient } from 'entities/user'
import { ReportType, createReport } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'

export const useSendReport = (entityId: number, type: ReportType, onSettled: () => void) => {
  const { formatMessage } = useIntl()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const { enqueueSnackbar } = useSnackbar()
  const { mutate } = useMutation(createReport, {
    onSuccess() {
      const message = formatMessage({ id: 'component.report.message' })
      enqueueSnackbar({ message, severity: 'success', icon: '🧞‍♂️️‍' })
    },
    onSettled,
  })

  return (reason: string) => {
    if (!client) {
      openSignIn({ callbackUrl: window.location.href })
      return
    }

    mutate({ entityId, type, reason })
  }
}
