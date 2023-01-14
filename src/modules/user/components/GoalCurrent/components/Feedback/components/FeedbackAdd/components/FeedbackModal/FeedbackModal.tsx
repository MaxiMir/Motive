import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { Grid, Box, Typography } from '@mui/material'
import useSelectPhoto from '@hooks/useSelectPhoto'
import AppModal from '@ui/AppModal'
import AppInput from '@ui/AppInput'
import EmojiHeader from '@ui/EmojiHeader'
import AppShakeIcon from '@ui/AppShakeIcon'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
import PhotoInput from '@components/Photo/PhotoInput/PhotoInput'
import PhotoButton from '@components/Photo/PhotoButton'
import VideoPreview from '@components/Video/VideoPreview/VideoPreview'
import VideoInput from '@components/Video/VideoInput/VideoInput'
import { useMessages } from './hooks/useMessages'
import { useForm } from './hooks/useForm'

interface FeedbackModalProps {
  onClose: () => void
}

function ModalFeedback({ onClose }: FeedbackModalProps) {
  const messages = useMessages()
  const form = useForm(onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form

  const onSelectPhoto = useSelectPhoto(form)

  const onSelectVideo = (file: File) => setFieldValue('video', file)

  return (
    <AppModal
      title={messages.title}
      maxWidth="xs"
      actions={[
        <ActionCancel key="cancel" onClick={onClose} />,
        <ActionSubmit
          disabled={isSubmitting}
          text={messages.buttonText}
          loadingText={messages.loadingText}
          emoji="feedback"
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form>
          <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
              <AppShakeIcon name="congratulations" />
              <Typography variant="subtitle1" sx={{ color: 'support.main' }}>
                {messages.subtitle}
              </Typography>
            </Box>
            <Field
              name="text"
              label={messages.label}
              color="warning"
              multiline
              rows={3}
              component={AppInput}
            />
            {!!values.photos.length && (
              <Box display="flex" flexDirection="column" gap={2} width="100%">
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
              </Box>
            )}
            {values.video && (
              <Box display="flex" flexDirection="column" gap={2} width="100%">
                <EmojiHeader name="video" variant="h6" component="h2" color="primary">
                  {messages.videoTitle}
                </EmojiHeader>
                <VideoPreview
                  video={values.video}
                  disabled={isSubmitting}
                  onRemove={() => setFieldValue('video', null)}
                />
              </Box>
            )}
            <Box display="flex" gap={2} width="100%">
              <PhotoInput multiple disabled={isSubmitting} onSelect={onSelectPhoto} />
              <VideoInput disabled onSelect={onSelectVideo} />
            </Box>
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

export default ModalFeedback
