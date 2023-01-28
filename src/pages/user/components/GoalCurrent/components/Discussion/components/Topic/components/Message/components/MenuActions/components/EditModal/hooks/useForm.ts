import { useFormik } from 'formik'
import produce from 'immer'
import { useIntl } from 'react-intl'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { useSnackbar } from 'entities/snackbar'
import { MessageDto, TopicDto, topicSchema, updateTopic } from 'shared/api'

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

export const useForm = (initialValues: MessageDto, onSuccess: () => void) => {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation(({ id, text }: MessageDto) => updateTopic(id, { text }), {
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
    validationSchema: topicSchema,
    async onSubmit(data) {
      await mutateAsync(data)
    },
  })
}
