import { AxiosError } from 'axios'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { useFormik } from 'formik'
import { MessageDto, TopicDto } from 'dto'
import { UseFormType } from 'types'
import useSnackbar from 'hooks/useSnackbar'
import TopicService from 'services/TopicService'
import schema from 'schemas/message'
import { getNextState } from './helper'

export default function useForm(initialValues: MessageDto, onSuccess: () => void): UseFormType<MessageDto> {
  const { isLoading, mutate } = useSendUpdateMessage(onSuccess)
  const formik = useFormik<MessageDto>({
    initialValues,
    validationSchema: schema,
    async onSubmit(data) {
      mutate(data)
    },
  })

  return { isLoading, formik }
}

const useSendUpdateMessage = (onSuccess: () => void) => {
  const { enqueueSnackbar } = useSnackbar()
  const setNextState = useSetNextState()

  return useMutation<void, AxiosError, MessageDto>(({ id, text }) => TopicService.update(id, { text }), {
    onSuccess(_, request) {
      setNextState(request)
      enqueueSnackbar({
        message: 'Message successfully updated',
        severity: 'success',
        icon: 'speaker',
      })
      onSuccess()
    },
  })
}

const useSetNextState = (): ((message: MessageDto) => void) => {
  const queryClient = useQueryClient()

  return (message) => {
    queryClient.setQueryData<InfiniteData<TopicDto[]> | undefined>(
      ['discussion', message.dayId],
      (prev) => prev && getNextState(prev, message),
    )
  }
}
