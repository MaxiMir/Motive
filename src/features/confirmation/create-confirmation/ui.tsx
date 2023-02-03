import { Grid, Box, Typography, Stack } from '@mui/material'
import { ErrorMessage, Field, FieldArray, Form, FormikProvider } from 'formik'
import dynamic from 'next/dynamic'
import { usePhotoLimit } from 'entities/confirmation'
import Accordion from 'shared/ui/Accordion'
import CancelButton from 'shared/ui/CancelButton'
import Input from 'shared/ui/Input'
import Modal from 'shared/ui/Modal'
import PhotoButton from 'shared/ui/photoButton'
import PhotoInput from 'shared/ui/PhotoInput'
import SpinTypography from 'shared/ui/SpinTypography'
import SubmitButton from 'shared/ui/SubmitButton'
import VideoInput from 'shared/ui/videoInput'
import VideoPreview from 'shared/ui/VideoPreview'
import { useMessages } from './lib'
import { useCreateConfirmationForm } from './model'

const Alert = dynamic(() => import('@mui/material/Alert'))

interface CreateConfirmationModalProps {
  goalId: number
  onClose: () => void
}

function CreateConfirmationModal({ goalId, onClose }: CreateConfirmationModalProps) {
  const messages = useMessages()
  const form = useCreateConfirmationForm(goalId, onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form

  const onSelectPhoto = usePhotoLimit(form)

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
          emoji="🏆"
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form>
          <Stack alignItems="center" gap={3}>
            <Stack alignItems="center" gap={1}>
              <SpinTypography>🏆</SpinTypography>
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
              <Stack gap={2} width="100%">
                <Typography variant="h6" color="primary" component="p">
                  📸 {messages.photoTitle}
                </Typography>
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
              <Stack gap={2} width="100%">
                <Typography variant="h6" color="primary" component="p">
                  🎬 {messages.videoTitle}
                </Typography>
                <VideoPreview
                  video={values.video}
                  disabled={isSubmitting}
                  onRemove={() => setFieldValue('video', null)}
                />
              </Stack>
            )}
            <Stack direction="row" gap={2} width="100%">
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
                emoji="🕹"
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

export default CreateConfirmationModal
