import { Field, Form, FormikProvider } from 'formik'
import { Box, InputAdornment, Stack } from '@mui/material'
import Modal from '@ui/Modal'
import Input from '@ui/Input'
import SubmitButton from '@ui/SubmitButton'
import CancelButton from '@ui/CancelButton'
import { useMessages } from './hooks/useMessages'
import { useForm } from './hooks/useForm'

interface EditModalProps {
  onClose: () => void
}

function EditModal({ onClose }: EditModalProps) {
  const messages = useMessages()
  const form = useForm(onClose)
  const { isSubmitting, handleSubmit } = form

  return (
    <Modal
      title={
        <>
          {messages.title}{' '}
          <Box component="span" color="zen.sand">
            {messages.profile}
          </Box>
        </>
      }
      maxWidth="xs"
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          disabled={isSubmitting}
          text={messages.buttonText}
          loadingText={messages.buttonLoading}
          emoji="followers"
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form>
          <Stack spacing={3}>
            <Field name="name" label={messages.nameLabel} color="primary" component={Input} />
            <Field
              name="nickname"
              label={messages.nicknameLabel}
              color="primary"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">https://2bebetter.pro/</InputAdornment>
                ),
              }}
              component={Input}
            />
            <Field name="motto" label={messages.mottoLabel} color="primary" component={Input} />
            <Field
              name="location"
              label={messages.locationLabel}
              color="primary"
              component={Input}
            />
            <Field
              name="bio"
              multiline
              label={messages.bioLabel}
              color="primary"
              component={Input}
            />
          </Stack>
        </Form>
      </FormikProvider>
    </Modal>
  )
}

export default EditModal
