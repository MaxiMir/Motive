import { Grid, Typography, Stack } from '@mui/material'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { useSelectPhoto } from 'features/select-photo'
import CancelButton from 'shared/ui/CancelButton'
import EmojiHeader from 'shared/ui/EmojiHeader'
import Input from 'shared/ui/Input'
import Modal from 'shared/ui/Modal'
import PhotoButton from 'shared/ui/photoButton'
import PhotoInput from 'shared/ui/photoInput'
import ShakeEmoji from 'shared/ui/ShakeEmoji'
import SubmitButton from 'shared/ui/SubmitButton'
import VideoInput from 'shared/ui/videoInput/ui'
import VideoPreview from 'shared/ui/videoPreview/ui'
import { useForm } from './hooks/useForm'
import { useMessages } from './hooks/useMessages'

interface AddingModalProps {
  onClose: () => void
}

function AddingModal({ onClose }: AddingModalProps) {
  const messages = useMessages()
  const form = useForm(onClose)
  const { isSubmitting, values, setFieldValue, submitForm } = form

  const onSelectPhoto = useSelectPhoto(form)

  const onSelectVideo = (file: File) => setFieldValue('video', file)

  return (
    <Modal
      title={messages.title}
      maxWidth="xs"
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          disabled={isSubmitting}
          text={messages.buttonText}
          loadingText={messages.loadingText}
          emoji="feedback"
          key="submit"
          onClick={submitForm}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form>
          <Stack alignItems="center" spacing={3}>
            <Stack alignItems="center" spacing={1}>
              <ShakeEmoji name="congratulations" />
              <Typography variant="subtitle1" sx={{ color: 'support.main' }}>
                {messages.subtitle}
              </Typography>
            </Stack>
            <Field
              name="text"
              label={messages.label}
              color="warning"
              multiline
              rows={3}
              component={Input}
            />
            {!!values.photos.length && (
              <Stack spacing={2} width="100%">
                <EmojiHeader name="photo" variant="h6" component="h2" color="primary">
                  {messages.photoTitle}
                </EmojiHeader>
                <FieldArray name="photos">
                  {({ remove }) => (
                    <Grid container spacing={2}>
                      {values.photos.map((file, index) => (
                        <Grid item xs={4} key={file.name}>
                          <PhotoButton
                            image={file}
                            disabled={isSubmitting}
                            onClick={() => remove(index)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </FieldArray>
              </Stack>
            )}
            {values.video && (
              <Stack spacing={2} width="100%">
                <EmojiHeader name="video" variant="h6" component="h2" color="primary">
                  {messages.videoTitle}
                </EmojiHeader>
                <VideoPreview
                  video={values.video}
                  disabled={isSubmitting}
                  onRemove={() => setFieldValue('video', null)}
                />
              </Stack>
            )}
            <Stack direction="row" spacing={2} width="100%">
              <PhotoInput multiple disabled={isSubmitting} onSelect={onSelectPhoto} />
              <VideoInput disabled onSelect={onSelectVideo} />
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </Modal>
  )
}

export default AddingModal
