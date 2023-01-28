import { Box, InputAdornment, Stack } from '@mui/material'
import { Field, Form, FormikProvider } from 'formik'
import CancelButton from 'shared/ui/CancelButton'
import Input from 'shared/ui/Input'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { useMessages } from './hooks/useMessages'
import { useUpdateUser } from './hooks/useUpdateUser'

interface EditModalProps {
  onClose: () => void
}

function EditModal({ onClose }: EditModalProps) {
  const messages = useMessages()
  const form = useUpdateUser(onClose)
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
