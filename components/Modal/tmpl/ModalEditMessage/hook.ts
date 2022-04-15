import { AxiosError } from 'axios'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { FormikProps, useFormik } from 'formik'
import { MessageDto, TopicDto } from 'dto'
import schema from 'schemas/message'
import useLocale from 'hooks/useLocale'
import useSnackbar from 'hooks/useSnackbar'
import TopicService from 'services/TopicService'
import { getNextState } from './helper'
import i18n from './i18n'

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
  const { locale } = useLocale()
  const [enqueueSnackbar] = useSnackbar()
  const queryClient = useQueryClient()
  const { message } = i18n[locale]

  return useMutation<void, AxiosError, MessageDto>(({ id, text }) => TopicService.update(id, { text }), {
    onSuccess(_, updatedMessage) {
      queryClient.setQueryData<InfiniteData<TopicDto[]> | undefined>(
        ['discussion', updatedMessage.dayId],
        (prev) => prev && getNextState(prev, updatedMessage),
      )
      enqueueSnackbar({
        message,
        severity: 'success',
        icon: 'speaker',
      })
    },
  })
}
