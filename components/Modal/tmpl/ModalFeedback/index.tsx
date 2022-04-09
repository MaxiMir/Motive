import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { Grid, Box, Typography, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { GoalDto } from 'dto'
import useSelectPhoto from 'hooks/useSelectPhoto'
import Action from 'components/Action'
import AppModal from 'components/UI/AppModal'
import AppInput from 'components/UI/AppInput'
import AppTitle from 'components/UI/AppTitle'
import AppShakeIcon from 'components/UI/AppShakeIcon'
import Photo from 'components/Photo'
import Video from 'components/Video'
import useForm from './hook'

export interface ModalFeedbackProps {
  tmpl: 'feedback'
  goal: GoalDto
  onClose: () => void
}

export default function ModalFeedback({ goal, onClose }: ModalFeedbackProps): JSX.Element {
  const classes = useStyles()
  const form = useForm(goal, onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form

  const onSelectPhoto = useSelectPhoto(form)

  const onSelectVideo = (file: File) => setFieldValue('video', file)

  return (
    <AppModal
      title="Adding feedback"
      maxWidth="xs"
      actions={[
        <Action tmpl="close" onClick={onClose} />,
        <Action
          tmpl="submit"
          isLoading={isSubmitting}
          name="Add"
          nameLoading="Adding"
          emoji="feedback"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
              <AppShakeIcon name="congratulations" />
              <Typography variant="subtitle1" className={classes.congratulations}>
                Impressive! One step closer to your goal!
              </Typography>
            </Box>
            <Field name="text" label="How it went" color="secondary" multiline rows={3} component={AppInput} />
            {!!values.photos.length && (
              <Box display="flex" flexDirection="column" gap={2} width="100%">
                <AppTitle name="photo" variant="h6" component="h2" color="primary">
                  Photos
                </AppTitle>
                <FieldArray name="photos">
                  {({ remove }) => (
                    <Grid container spacing={2}>
                      {values.photos.map((file, index) => (
                        <Grid item xs={4} key={index}>
                          <Photo tmpl="button" image={file} disabled={isSubmitting} onClick={() => remove(index)} />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </FieldArray>
              </Box>
            )}
            {values.video && (
              <Box display="flex" flexDirection="column" gap={2} width="100%">
                <AppTitle name="video" variant="h6" component="h2" color="primary">
                  Video
                </AppTitle>
                <Video
                  tmpl="preview"
                  video={values.video}
                  disabled={isSubmitting}
                  onRemove={() => setFieldValue('video', null)}
                />
              </Box>
            )}
            <Box display="flex" gap={2} width="100%">
              <Photo tmpl="input" multiple disabled={isSubmitting} onSelect={onSelectPhoto} />
              <Video tmpl="input" disabled onSelect={onSelectVideo} />
            </Box>
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    congratulations: {
      color: theme.palette.support.main,
    },
  }),
)
