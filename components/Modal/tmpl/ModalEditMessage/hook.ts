import { AxiosError } from 'axios'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { FormikProps, useFormik } from 'formik'
import { MessageDto, TopicDto } from 'dto'
import useSnackbar from 'hooks/useSnackbar'
import TopicService from 'services/TopicService'
import schema from 'schemas/message'
import { getNextState } from './helper'

export default function useForm(initialValues: MessageDto, onSuccess: () => void): FormikProps<MessageDto> {
  const { mutateAsync } = useSendUpdateMessage()

  return useFormik<MessageDto>({
    initialValues,
    validationSchema: schema,
    async onSubmit(data) {
      await mutateAsync(data)
      onSuccess()
    },
  })
}

const useSendUpdateMessage = () => {
  const [enqueueSnackbar] = useSnackbar()
  const queryClient = useQueryClient()

  return useMutation<void, AxiosError, MessageDto>(({ id, text }) => TopicService.update(id, { text }), {
    onSuccess(_, message) {
      queryClient.setQueryData<InfiniteData<TopicDto[]> | undefined>(
        ['discussion', message.dayId],
        (prev) => prev && getNextState(prev, message),
      )
      enqueueSnackbar({
        message: 'Message successfully updated',
        severity: 'success',
        icon: 'speaker',
      })
    },
  })
}
