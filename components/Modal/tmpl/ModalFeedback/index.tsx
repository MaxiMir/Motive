import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { createStyles, makeStyles } from '@material-ui/core'
import { GoalDto } from 'dto'
import useSelectPhoto from 'hooks/useSelectPhoto'
import ModalAction from 'components/ModalAction'
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
  const { isLoading, formik } = useForm(goal, onClose)
  const { values, setFieldValue, handleSubmit } = formik

  const onSelectPhoto = useSelectPhoto(formik)

  const onSelectVideo = (file: File) => setFieldValue('video', file)

  return (
    <AppModal
      title="Adding feedback"
      maxWidth="xs"
      actions={[
        <ModalAction tmpl="close" onClick={onClose} />,
        <ModalAction
          tmpl="submit"
          isLoading={isLoading}
          name="Add"
          nameLoading="Adding"
          emoji="feedback"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={formik}>
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
                    <AppBox flexWrap="wrap" spacing={2}>
                      {values.photos.map((file, index) => (
                        <Photo
                          tmpl="button"
                          file={file}
                          disabled={isLoading}
                          key={index}
                          onClick={() => remove(index)}
                        />
                      ))}
                    </AppBox>
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
                  disabled={isLoading}
                  onRemove={() => setFieldValue('video', null)}
                />
              </AppBox>
            )}
            <AppBox spacing={2} width="100%">
              <Photo tmpl="input" disabled={isLoading} onSelect={onSelectPhoto} />
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
