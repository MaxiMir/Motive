import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { CreateReportDto, ReportType, UserBaseDto } from 'dto'
import useSnackbar from 'hooks/useSnackbar'
import { ReportService } from 'services/ReportService'

type SendReport = (reason: string) => void

export default function useSendReport(
  entityId: number,
  type: ReportType,
  client: UserBaseDto | undefined,
  onSettled: () => void,
): SendReport {
  const { enqueueSnackbar } = useSnackbar()
  const { mutate } = useMutation<void, AxiosError, CreateReportDto>(ReportService.create, {
    onSuccess() {
      enqueueSnackbar({ message: 'The report was successfully sent', severity: 'success', icon: 'speaker' })
    },
    onSettled,
  })
  const isAuthorized = !!client // todo check on auth

  return (reason: string) => {
    if (!isAuthorized) {
      // TODO for not auth
      return
    }

    mutate({ entityId, type, reason })
  }
}
