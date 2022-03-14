import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { CreateReportDto, ReportType } from 'dto'
import useSnackbar from 'hooks/useSnackbar'
import useClient from 'hooks/useClient'
import useOpenSignIn from 'hooks/useOpenSignIn'
import { ReportService } from 'services/ReportService'

type SendReport = (reason: string) => void

export default function useSendReport(entityId: number, type: ReportType, onSettled: () => void): SendReport {
  const client = useClient()
  const openSignIn = useOpenSignIn()
  const [enqueueSnackbar] = useSnackbar()
  const { mutate } = useMutation<void, AxiosError, CreateReportDto>(ReportService.create, {
    onSuccess() {
      enqueueSnackbar({ message: 'The report was successfully sent', severity: 'success', icon: 'speaker' })
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
