import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { createStyles, Grid, makeStyles } from '@material-ui/core'
import { GoalDto } from 'dto'
import useSelectPhoto from 'hooks/useSelectPhoto'
import Action from 'components/Action'
import AppModal from 'components/UI/AppModal'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'
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
          <AppBox flexDirection="column" alignItems="center" spacing={3}>
            <AppBox flexDirection="column" alignItems="center" spacing={1}>
              <AppShakeIcon name="congratulations" />
              <AppTypography variant="subtitle1" className={classes.congratulations}>
                Impressive! One step closer to your goal!
              </AppTypography>
            </AppBox>
            <Field name="text" label="How it went" color="secondary" multiline rows={3} component={AppInput} />
            {!!values.photos.length && (
              <AppBox flexDirection="column" spacing={2} width="100%">
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
              </AppBox>
            )}
            {values.video && (
              <AppBox flexDirection="column" spacing={2} width="100%">
                <AppTitle name="video" variant="h6" component="h2" color="primary">
                  Video
                </AppTitle>
                <Video
                  tmpl="preview"
                  video={values.video}
                  disabled={isSubmitting}
                  onRemove={() => setFieldValue('video', null)}
                />
              </AppBox>
            )}
            <AppBox spacing={2} width="100%">
              <Photo tmpl="input" multiple disabled={isSubmitting} onSelect={onSelectPhoto} />
              <Video tmpl="input" disabled onSelect={onSelectVideo} />
            </AppBox>
          </AppBox>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    congratulations: {
      color: theme.palette.info.main,
    },
  }),
)
