import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { Grid, Box, Typography } from '@mui/material'
import useSelectPhoto from '@hooks/useSelectPhoto'
import AppModal from '@ui/AppModal'
import AppAccordion from '@ui/AppAccordion'
import AppInput from '@ui/AppInput'
import AppHeader from '@ui/AppHeader'
import AppSpinIcon from '@ui/AppSpinIcon'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
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
  const { isSubmitting, values, touched, errors, setFieldValue, handleSubmit } = form
  const photoError = !Array.isArray(errors.photos) ? errors.photos : errors.photos.join(', ')

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
          emoji="completed"
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
              <AppSpinIcon name="completed" />
              <Typography variant="subtitle1" sx={{ color: '#ffa300' }}>
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
                <AppHeader name="photo" variant="h6" component="h2" color="primary">
                  {messages.photoTitle}
                </AppHeader>
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
                <AppHeader name="video" variant="h6" component="h2" color="primary">
                  {messages.videoTitle}
                </AppHeader>
                <VideoPreview
                  video={values.video}
                  disabled={isSubmitting}
                  onRemove={() => setFieldValue('video', null)}
                />
              </Box>
            )}
            <Box display="flex" gap={2} width="100%">
              <PhotoInput disabled={isSubmitting} multiple onSelect={onSelectPhoto} />
              <VideoInput disabled onSelect={onSelectVideo} />
            </Box>
            {touched.photos && photoError && (
              <Alert severity="error" variant="outlined" sx={{ width: '100%' }}>
                {photoError}
              </Alert>
            )}
            <Box sx={{ width: '100%' }}>
              <AppAccordion
                name="switch"
                header={messages.accordionHeader}
                id="goal"
                details={
                  <Box sx={{ color: 'zen.silent' }}>
                    <Typography>
                      {messages.detailsStart}{' '}
                      <Box component="b" sx={{ color: 'text.primary' }}>
                        5
                      </Box>{' '}
                      {messages.detailsEnd}.
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

export default CompletionModal
