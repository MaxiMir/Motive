import { Box, InputAdornment, Stack } from '@mui/material'
import { Field, Form, FormikProvider } from 'formik'
import { UserPageDto } from 'shared/api'
import CancelButton from 'shared/ui/CancelButton'
import Input from 'shared/ui/Input'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { useMessages } from './lib'
import { useUpdateUserForm } from './model'

interface EditProfileModalProps {
  user: UserPageDto
  onClose: () => void
}

function EditProfileModal({ user, onClose }: EditProfileModalProps) {
  const messages = useMessages()
  const form = useUpdateUserForm(user, onClose)
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
          emoji="🥷"
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form>
          <Stack gap={3}>
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

export default EditProfileModal
