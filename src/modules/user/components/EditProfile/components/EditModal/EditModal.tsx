import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { Box, IconButton, InputAdornment } from '@mui/material'
import AppModal from '@ui/AppModal'
import AppInput from '@ui/AppInput'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
import dynamic from 'next/dynamic'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'
import { useForm } from './hooks/useForm'

const Button = dynamic(() => import('@mui/material/Button'))

interface EditModalProps {
  onClose: () => void
}

function EditModal({ onClose }: EditModalProps) {
  const messages = useMessages()
  const form = useForm(onClose)
  const { values, isSubmitting, handleSubmit } = form

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
        <ActionCancel key="cancel" onClick={onClose} />,
        <ActionSubmit
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
          <Box display="flex" flexDirection="column" gap={3}>
            <Field name="name" label={messages.nameLabel} color="primary" component={AppInput} />
            <Field
              name="nickname"
              label={messages.nicknameLabel}
              color="primary"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">https://2bebetter.pro/</InputAdornment>
                ),
              }}
              component={AppInput}
            />
            <Field name="motto" label={messages.mottoLabel} color="primary" component={AppInput} />
            <Field
              name="location"
              label={messages.locationLabel}
              color="primary"
              component={AppInput}
            />
            <Field
              name="bio"
              multiline
              label={messages.bioLabel}
              color="primary"
              component={AppInput}
            />
            <FieldArray name="links">
              {({ push, remove }) => (
                <>
                  {values.links?.map(({ href }, index) => (
                    <Box display="flex" alignItems="center" gap={1} key={href}>
                      <Box display="flex" flexDirection="column" gap={1} flex={1}>
                        <Field
                          name={`stages.${index}.href`}
                          label="Url"
                          color="primary"
                          component={AppInput}
                        />
                        <Field
                          name={`stages.${index}.url`}
                          label="Title"
                          color="primary"
                          component={AppInput}
                        />
                      </Box>
                      <IconButton aria-label="" disableFocusRipple onClick={() => remove(index)}>
                        <AppIcon name="close" />
                      </IconButton>
                    </Box>
                  ))}
                  <Button onClick={push}>1</Button>
                </>
              )}
            </FieldArray>
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

export default EditModal
