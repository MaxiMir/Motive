import { Field, FieldArray, Form, FormikProvider, useFormik } from 'formik'
import { makeStyles } from '@material-ui/core'
import { GoalDto } from 'dto'
import useSelectPhoto from 'hooks/useSelectPhoto'
import ModalAction from 'components/ModalAction'
import AppModal from 'components/UI/AppModal'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppHeader from 'components/UI/AppHeader'
import AppSpinIcon from 'components/UI/AppSpinIcon'
import Photo from 'components/Photo'
import Video from 'components/Video'

export interface ModalCompleteProps {
  tmpl: 'complete'
  goal: GoalDto
  onClose: () => void
}

export default function ModalComplete({ goal, onClose }: ModalCompleteProps): JSX.Element {
  const classes = useStyles()
  const isLoading = false
  const formik = useFormik({
    initialValues: {
      id: goal.id,
      photos: [],
      video: '',
    },
    // validationSchema: schema,
    async onSubmit(data) {
      console.log(data)
      // send(data)
    },
  })

  const { values, setFieldValue, handleSubmit } = formik

  const onSelectPhoto = useSelectPhoto(formik)

  const onSelectVideo = (file: File) => setFieldValue('video', file)

  return (
    <AppModal
      title="Completing the goal"
      maxWidth="xs"
      actions={[
        <ModalAction tmpl="close" onClick={onClose} />,
        <ModalAction
          tmpl="submit"
          isLoading={isLoading}
          name="Save"
          nameLoading="Saving"
          emoji="completed"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off">
          <AppBox flexDirection="column" alignItems="center" spacing={3}>
            <AppBox flexDirection="column" alignItems="center" spacing={1}>
              <AppSpinIcon name="completed" />
              <AppTypography className={classes.congratulations}>Congratulations, you did it!</AppTypography>
            </AppBox>
            <Field name="text" label="How was it" color="secondary" multiline rows={3} component={AppInput} />
            {!!values.photos.length && (
              <AppBox flexDirection="column" spacing={2} width="100%">
                <AppHeader name="photo" variant="h6" component="h2" color="primary">
                  Photos
                </AppHeader>
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
                <AppHeader name="video" variant="h6" component="h2" color="primary">
                  Video
                </AppHeader>
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

const useStyles = makeStyles({
  congratulations: {
    color: '#ffa300',
  },
})
