import { Field, FieldArray, Form, FormikProvider, useFormik } from 'formik'
import produce from 'immer'
import { makeStyles } from '@material-ui/core'
import { GoalDto } from 'dto'
import useSend from 'hooks/useSend'
import { useMutateGoals } from 'views/User/hook'
import DayService from 'services/DayService'
import useSnackbar from 'hooks/useSnackbar'
import ModalAction from 'components/ModalAction'
import AppModal from 'components/UI/AppModal'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppHeader from 'components/UI/AppHeader'
import AppSpinIcon from 'components/UI/AppSpinIcon'
import Photo from 'components/Photo'
import Video from 'components/Video'
import schema from './schema'

const PHOTO_LIMIT = 10

export interface ModalFeedbackProps {
  tmpl: 'feedback'
  goal: GoalDto
  onClose: () => void
}

export default function ModalFeedback({ goal, onClose }: ModalFeedbackProps): JSX.Element {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [goals, mutateGoals] = useMutateGoals()
  const { isLoading, send } = useSend(DayService.createFeedback, {
    onSuccess: ({ feedback }) => {
      mutateGoals(
        produce(goals, (draft: GoalDto[]) => {
          const draftGoal = draft[draft.findIndex((g) => g.id === goal.id)]
          const [draftDay] = draftGoal.days

          draftDay.feedback = feedback
        }),
      )

      onClose()
      enqueueSnackbar({ message: 'Feedback successfully added', severity: 'success', icon: 'feedback' })
    },
  })
  const formik = useFormik({
    initialValues: {
      text: '',
      photos: [],
      video: '',
    },
    validationSchema: schema,
    async onSubmit(data) {
      const formData = new FormData()

      formData.append('text', data.text.trim())
      data.photos.forEach((photo) => formData.append('photos', photo))
      send({ id: goal.days[0].id, body: formData })
    },
  })
  const { values, setFieldValue, handleSubmit } = formik

  const onSelectPhoto = (files: File[]) => {
    const photos = [...values.photos, ...files]

    if (photos.length > PHOTO_LIMIT) {
      enqueueSnackbar({ message: `You cannot add more than ${PHOTO_LIMIT} photos`, severity: 'error' })
    }

    setFieldValue('photos', photos.slice(0, PHOTO_LIMIT))
  }

  const onSelectVideo = (file: File) => {
    setFieldValue('video', file)
  }

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
              <AppSpinIcon name="congratulations" />
              <AppTypography className={classes.congratulations}>
                Impressive! One step closer to your goal!
              </AppTypography>
            </AppBox>
            <Field name="text" label="How did today's" color="secondary" multiline rows={3} component={AppInput} />
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
    color: '#0386F4',
  },
})
