import { FocusEvent } from 'react'
import { Field, Form, FormikProvider } from 'formik'
import { Box } from '@mui/material'
import { MessageDto } from '@features/topic'
import AppModal from '@ui/AppModal'
import AppInput from '@ui/AppInput'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
import { useMessages } from './hooks/useMessages'
import { useForm } from './hooks/useForm'

interface EditMessageModalProps {
  message: MessageDto
  onClose: () => void
}

function EditMessageModal({ message, onClose }: EditMessageModalProps) {
  const messages = useMessages()
  const form = useForm(message, onClose)
  const { isSubmitting, handleSubmit } = form

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
  }

  return (
    <AppModal
      title={
        <>
          {messages.title}{' '}
          <Box component="span" sx={{ color: 'zen.sand' }}>
            {messages.subtitle}
          </Box>
        </>
      }
      maxWidth="xs"
      actions={[
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          disabled={isSubmitting}
          text={messages.buttonText}
          loadingText={messages.loadingText}
          emoji="save"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <Field
              name="text"
              label={messages.label}
              multiline
              rows={3}
              inputRef={(input: HTMLInputElement | null) => input?.focus()}
              onFocus={onFocus}
              component={AppInput}
            />
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

export default EditMessageModal
