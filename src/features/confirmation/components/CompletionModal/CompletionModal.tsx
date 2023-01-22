import dynamic from 'next/dynamic'
import { ErrorMessage, Field, FieldArray, Form, FormikProvider } from 'formik'
import { Grid, Box, Typography, Stack } from '@mui/material'
import useSelectPhoto from '@hooks/useSelectPhoto'
import Modal from '@ui/Modal'
import Accordion from '@ui/Accordion'
import Input from '@ui/Input'
import EmojiHeader from '@ui/EmojiHeader'
import SpinEmoji from '@ui/SpinEmoji'
import SubmitButton from '@ui/SubmitButton'
import CancelButton from '@ui/CancelButton'
import PhotoInput from '@components/Photo/PhotoInput/PhotoInput'
import PhotoButton from '@components/Photo/PhotoButton'
import VideoPreview from '@components/Video/VideoPreview/VideoPreview'
import VideoInput from '@components/Video/VideoInput/VideoInput'
import { useMessages } from './hooks/useMessages'
import { useForm } from './hooks/useForm'

const Alert = dynamic(() => import('@mui/material/Alert'))

interface CompletionModalProps {
  onClose: () => void
}

function CompletionModal({ onClose }: CompletionModalProps) {
  const messages = useMessages()
  const form = useForm(onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form

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
          emoji="completed"
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form>
          <Stack alignItems="center" spacing={3}>
            <Stack alignItems="center" spacing={1}>
              <SpinEmoji name="completed" />
              <Typography variant="subtitle1" sx={{ color: '#ffa300' }}>
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
              <PhotoInput disabled={isSubmitting} multiple onSelect={onSelectPhoto} />
              <VideoInput disabled onSelect={onSelectVideo} />
            </Stack>
            <ErrorMessage name="photos">
              {(msg) => (
                <Alert severity="error" variant="outlined" sx={{ width: '100%' }}>
                  {msg}
                </Alert>
              )}
            </ErrorMessage>
            <Box width="100%">
              <Accordion
                name="switch"
                header={messages.accordionHeader}
                id="goal"
                details={
                  <Box color="zen.silent">
                    <Typography>
                      {messages.detailsStart}{' '}
                      <Box component="b" color="text.primary">
                        5
                      </Box>{' '}
                      {messages.detailsEnd}.
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Stack>
        </Form>
      </FormikProvider>
    </Modal>
  )
}

export default CompletionModal
