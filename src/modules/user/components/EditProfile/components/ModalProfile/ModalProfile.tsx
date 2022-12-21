import { Field, Form, FormikProvider } from 'formik'
import { Box, InputAdornment } from '@mui/material'
import AppModal from '@ui/AppModal/AppModal'
import AppInput from '@ui/AppInput'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
import { useForm, useMessages } from './hooks'

interface ModalProfileProps {
  onClose: () => void
}

function ModalProfile({ onClose }: ModalProfileProps) {
  const messages = useMessages()
  const form = useForm(onClose)
  const { isSubmitting, handleSubmit } = form

  return (
    <AppModal
      title={
        <>
          {messages.title}{' '}
          <Box component="span" sx={{ color: 'zen.sand' }}>
            {messages.profile}
          </Box>
        </>
      }
      maxWidth="xs"
      actions={[
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          disabled={isSubmitting}
          text={messages.buttonText}
          loadingText={messages.buttonLoading}
          emoji="followers"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <Box display="flex" flexDirection="column" gap={3}>
            <Field name="name" label={messages.nameLabel} color="primary" component={AppInput} />
            <Field
              name="nickname"
              label={messages.nicknameLabel}
              color="primary"
              InputProps={{
                startAdornment: <InputAdornment position="start">https://2bebetter.pro/</InputAdornment>,
              }}
              component={AppInput}
            />
            <Field name="motto" label={messages.mottoLabel} color="primary" component={AppInput} />
            <Field name="location" label={messages.locationLabel} color="primary" component={AppInput} />
            <Field name="bio" multiline label={messages.bioLabel} color="primary" component={AppInput} />
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

export default ModalProfile
