import { useFormik } from 'formik'
import { produce } from 'immer'
import { useIntl } from 'react-intl'
import { InfiniteData, useMutation, useQueryClient } from 'react-query'
import { MessageDto, TopicDto, updateTopic } from 'shared/api'
import { useSnackbar } from 'shared/ui/snackbar'
import { TopicSchema } from './schema'

export function useUpdateTopicForm(initialValues: MessageDto, onSuccess: () => void) {
  const { formatMessage } = useIntl()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation(({ id, text }: MessageDto) => updateTopic(id, { text }), {
    onSuccess(_, req) {
      const message = formatMessage({ id: 'common.message-updated' })
      queryClient.setQueryData<InfiniteData<TopicDto[]> | undefined>(
        ['discussion', req.dayId],
        (prev) =>
          prev &&
          produce(prev, (draft) => {
            const searchId = req.parentId || req.id
            const draftTopic = draft.pages.flat().find((t) => t.id === searchId)

            if (!draftTopic) return

            if (req.parentId && draftTopic.answer) {
              draftTopic.answer.text = req.text
              draftTopic.answer.edited = true
              return
            }

            draftTopic.text = req.text
            draftTopic.edited = true
          }),
      )
      enqueueSnackbar(message, { severity: 'success', icon: '🧞‍♂️️‍' })
      onSuccess()
    },
  })

  return useFormik<MessageDto>({
    initialValues,
    validationSchema: TopicSchema,
    onSubmit(data) {
      return mutateAsync(data)
    },
  })
}
