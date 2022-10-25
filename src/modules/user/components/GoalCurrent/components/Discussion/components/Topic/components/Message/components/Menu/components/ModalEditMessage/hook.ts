import { AxiosError } from 'axios'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { FormikProps, useFormik } from 'formik'
import { useIntl } from 'react-intl'
import { MessageDto, TopicDto } from 'src/common/dto'
import validationSchema from 'src/common/schemas/message'
import useSnackbar from 'src/common/hooks/useSnackbar'
import { TopicService } from 'src/common/services/topic'
import { getNextState } from './helper'
import i18n from './i18n'

export default function useForm(initialValues: MessageDto, onSuccess: () => void): FormikProps<MessageDto> {
  const { mutateAsync } = useSendUpdateMessage()

  return useFormik<MessageDto>({
    initialValues,
    validationSchema,
    async onSubmit(data) {
      await mutateAsync(data)
      onSuccess()
    },
  })
}

const useSendUpdateMessage = () => {
  const { locale } = useIntl()
  const [enqueueSnackbar] = useSnackbar()
  const queryClient = useQueryClient()
  const { message } = i18n[locale]

  return useMutation<void, AxiosError, MessageDto>(({ id, text }) => TopicService.update(id, { text }), {
    onSuccess(_, updatedMessage) {
      queryClient.setQueryData<InfiniteData<TopicDto[]> | undefined>(
        ['discussion', updatedMessage.dayId],
        (prev) => prev && getNextState(prev, updatedMessage),
      )
      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
    },
  })
}
