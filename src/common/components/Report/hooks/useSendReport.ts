import { AxiosError } from 'axios'
import { useIntl } from 'react-intl'
import { useMutation } from 'react-query'
import { CreateReportDto, ReportType } from '@dto'
import ReportService from '@services/report'
import useSnackbar from '@hooks/useSnackbar'
import useClient from '@hooks/useClient'
import useOpenSignIn from '@hooks/useOpenSignIn'

const useSendReport = (entityId: number, type: ReportType, onSettled: () => void) => {
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

export default useSendReport
