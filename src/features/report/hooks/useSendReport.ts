import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { ReportType } from '@features/report/dto'
import { ReportService } from '@features/report/service'
import { useOpenSignIn } from '@features/signin'
import useSnackbar from '@hooks/useSnackbar'
import useClient from '@hooks/useClient'

export const useSendReport = (entityId: number, type: ReportType, onSettled: () => void) => {
  const { formatMessage } = useIntl()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [enqueueSnackbar] = useSnackbar()
  const { mutate } = useMutation(ReportService.create, {
    onSuccess() {
      const message = formatMessage({ id: 'component.report.message' })
      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
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
