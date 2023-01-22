import { FocusEvent } from 'react'
import { Field, Form, FormikProvider } from 'formik'
import { Box, Stack } from '@mui/material'
import { MessageDto } from '@features/topic'
import AppModal from '@ui/AppModal'
import AppInput from '@ui/AppInput'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
import { useMessages } from './hooks/useMessages'
import { useForm } from './hooks/useForm'

interface EditModalProps {
  message: MessageDto
  onClose: () => void
}

function EditModal({ message, onClose }: EditModalProps) {
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
          <Box component="span" color="zen.sand">
            {messages.subtitle}
          </Box>
        </>
      }
      maxWidth="xs"
      actions={[
        <ActionCancel key="cancel" onClick={onClose} />,
        <ActionSubmit
          disabled={isSubmitting}
          text={messages.buttonText}
          loadingText={messages.loadingText}
          emoji="save"
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form>
          <Stack alignItems="center" spacing={3}>
            <Field
              name="text"
              label={messages.label}
              multiline
              rows={3}
              inputRef={(input: HTMLInputElement | null) => input?.focus()}
              onFocus={onFocus}
              component={AppInput}
            />
          </Stack>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

export default EditModal
