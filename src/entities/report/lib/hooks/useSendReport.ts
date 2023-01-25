import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import useClient from '@lib/hooks/useClient'
import { useSnackbar } from '@entities/snackbar'
import { ReportType } from '@entities/report/model/dto'
import { useOpenSignIn } from '@entities/signin'
import { createReport } from '@entities/report/api/createReport'

export const useSendReport = (entityId: number, type: ReportType, onSettled: () => void) => {
  const { formatMessage } = useIntl()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const { enqueueSnackbar } = useSnackbar()
  const { mutate } = useMutation(createReport, {
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
