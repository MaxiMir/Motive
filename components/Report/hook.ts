import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { CreateReportDto, ReportType } from 'dto'
import useSnackbar from 'hooks/useSnackbar'
import useClient from 'hooks/useClient'
import useSignInModal from 'hooks/useSignInModal'
import { ReportService } from 'services/ReportService'

type SendReport = (reason: string) => void

export default function useSendReport(entityId: number, type: ReportType, onSettled: () => void): SendReport {
  const client = useClient()
  const signIn = useSignInModal()
  const { enqueueSnackbar } = useSnackbar()
  const { mutate } = useMutation<void, AxiosError, CreateReportDto>(ReportService.create, {
    onSuccess() {
      enqueueSnackbar({ message: 'The report was successfully sent', severity: 'success', icon: 'speaker' })
    },
    onSettled,
  })

  return (reason: string) => {
    if (!client) {
      signIn()
      return
    }

    mutate({ entityId, type, reason })
  }
}
