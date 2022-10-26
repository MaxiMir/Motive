import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { useIntl } from 'react-intl'
import { CreateReportDto, ReportType } from '@dto'
import useSnackbar from '@hooks/useSnackbar'
import useClient from '@hooks/useClient'
import useOpenSignIn from '@hooks/useOpenSignIn'
import { ReportService } from '@services/report'

type SendReport = (reason: string) => void

export default function useSendReport(entityId: number, type: ReportType, onSettled: () => void): SendReport {
  const { formatMessage } = useIntl()
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [enqueueSnackbar] = useSnackbar()
  const { mutate } = useMutation<void, AxiosError, CreateReportDto>(ReportService.create, {
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
