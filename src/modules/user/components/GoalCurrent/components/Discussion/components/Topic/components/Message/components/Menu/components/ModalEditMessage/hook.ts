import { AxiosError } from 'axios'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { FormikProps, useFormik } from 'formik'
import { useIntl } from 'react-intl'
import { MessageDto, TopicDto } from '@dto'
import { messageSchema } from '@schemas/message'
import { TopicService } from '@services/topic'
import useSnackbar from '@hooks/useSnackbar'
import { getNextState } from './helper'

export default function useForm(initialValues: MessageDto, onSuccess: () => void): FormikProps<MessageDto> {
  const { mutateAsync } = useSendUpdateMessage()

  return useFormik<MessageDto>({
    initialValues,
    validationSchema: messageSchema,
    async onSubmit(data) {
      await mutateAsync(data)
      onSuccess()
    },
  })
}

const useSendUpdateMessage = () => {
  const { formatMessage } = useIntl()
  const [enqueueSnackbar] = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation<void, AxiosError, MessageDto>(({ id, text }) => TopicService.update(id, { text }), {
    onSuccess(_, updatedMessage) {
      const message = formatMessage({ id: 'common.message-updated' })
      queryClient.setQueryData<InfiniteData<TopicDto[]> | undefined>(
        ['discussion', updatedMessage.dayId],
        (prev) => prev && getNextState(prev, updatedMessage),
      )
      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
    },
  })
}
