import produce from 'immer'
import { useIntl } from 'react-intl'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { useFormik } from 'formik'
import { MessageDto, TopicDto } from '@dto'
import messageSchema from '@schemas/message'
import TopicService from '@services/topic'
import useSnackbar from '@hooks/useSnackbar'

const getNextState = (discussion: InfiniteData<TopicDto[]>, message: MessageDto) => {
  const { id, parentId, text } = message
  const searchId = parentId || id

  return produce(discussion, (draft) => {
    const draftTopic = draft.pages.flat().find((t) => t.id === searchId)

    if (!draftTopic) return

    if (parentId && draftTopic.answer) {
      draftTopic.answer.text = text
      draftTopic.answer.edited = true
      return
    }

    draftTopic.text = text
    draftTopic.edited = true
  })
}

const useForm = (initialValues: MessageDto, onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const [enqueueSnackbar] = useSnackbar()
  const queryClient = useQueryClient()
  const { mutate } = useMutation(({ id, text }: MessageDto) => TopicService.update(id, { text }), {
    onSuccess(_, updatedMessage) {
      const message = formatMessage({ id: 'common.message-updated' })
      queryClient.setQueryData<InfiniteData<TopicDto[]> | undefined>(
        ['discussion', updatedMessage.dayId],
        (prev) => prev && getNextState(prev, updatedMessage),
      )
      enqueueSnackbar({ message, severity: 'success', icon: 'speaker' })
      onSuccess()
    },
  })

  return useFormik<MessageDto>({
    initialValues,
    validationSchema: messageSchema,
    onSubmit(data) {
      mutate(data)
    },
  })
}

export default useForm
