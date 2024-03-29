import { Stack } from '@mui/material'
import { Field, Form, FormikProvider } from 'formik'
import { FocusEvent } from 'react'
import { useIntl } from 'react-intl'
import { MessageDto } from 'shared/api'
import CancelButton from 'shared/ui/cancel-button'
import Input from 'shared/ui/input'
import Modal from 'shared/ui/modal'
import SubmitButton from 'shared/ui/submit-button'
import { useUpdateTopicForm } from './model'

interface EditTopicModalProps {
  message: MessageDto
  onClose: () => void
}

function EditTopicModal({ message, onClose }: EditTopicModalProps) {
  const { formatMessage } = useIntl()
  const form = useUpdateTopicForm(message, onClose)
  const { isSubmitting, handleSubmit } = form
  const title = formatMessage({ id: 'common.editing-message' })
  const buttonText = formatMessage({ id: 'common.save' })
  const loadingText = formatMessage({ id: 'common.saving' })
  const label = formatMessage({ id: 'common.your-message' })

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
  }

  return (
    <Modal
      title={title}
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          text={buttonText}
          loadingText={loadingText}
          isLoading={isSubmitting}
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form>
          <Stack alignItems="center" gap={3}>
            <Field
              name="text"
              label={label}
              multiline
              rows={3}
              inputRef={(input: HTMLInputElement | null) => input?.focus()}
              onFocus={onFocus}
              component={Input}
            />
          </Stack>
        </Form>
      </FormikProvider>
    </Modal>
  )
}

export default EditTopicModal
