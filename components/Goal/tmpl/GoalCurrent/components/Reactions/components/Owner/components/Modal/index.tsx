import { ChangeEvent, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider, useFormik } from 'formik'
import { Button, Chip, makeStyles } from '@material-ui/core'
import { GoalDto } from 'dto'
import useSend from 'hooks/useSend'
import DayService from 'services/DayService'
import useSnackbar from 'hooks/useSnackbar'
import ModalAction from 'components/ModalAction'
import AppModal from 'components/UI/AppModal'
import AppTypography from 'components/UI/AppTypography'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppHeader from 'components/UI/AppHeader'
import AppVideo from 'components/UI/AppVideo'
import schema from './schema'

const IconButton = dynamic(() => import('@material-ui/core/IconButton'))
const Image = dynamic(() => import('./components/Image'))
const AppIcon = dynamic(() => import('components/UI/AppIcon'))

const PHOTO_LIMIT = 10

interface ModalProps {
  goal: GoalDto
  onClose: () => void
}

export default function Modal({ goal, onClose }: ModalProps): JSX.Element {
  const classes = useStyles()
  const photoInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const { enqueueSnackbar } = useSnackbar()
  const { isLoading, send } = useSend(DayService.createFeedback, {
    onSuccess: (data) => {
      console.log(data)
    },
  })
  const formik = useFormik({
    initialValues: {
      text: '',
      photos: [],
      video: null,
    },
    validationSchema: schema,
    onSubmit(data) {
      send({ id: goal.days[0].id, ...data })
    },
  })
  const { values, setFieldValue, handleSubmit } = formik

  const onAddPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }

    const photos = [...values.photos, ...Array.from(e.target.files).slice(0, PHOTO_LIMIT)]

    if (e.target.files.length > PHOTO_LIMIT) {
      enqueueSnackbar({ message: `You cannot add more than ${PHOTO_LIMIT} photos`, severity: 'error' })
    }

    setFieldValue('photos', photos)
  }

  const onAddVideo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    file && setFieldValue('video', file)
  }

  return (
    <AppModal
      title="Adding feedback"
      maxWidth="xs"
      actions={[
        <ModalAction tmpl="close" onClick={onClose} />,
        <ModalAction
          tmpl="submit"
          isLoading={isLoading} // todo change
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
              <AppEmoji name="congratulations" variant="h2" />
              <AppTypography className={classes.congratulations}>
                Impressive! One step closer to your goal!
              </AppTypography>
            </AppBox>
            <Field name="text" label="How did today's *" color="secondary" multiline rows={3} component={AppInput} />
            {!!values.photos.length && (
              <AppBox flexDirection="column" spacing={2} width="100%">
                <AppHeader name="photo" variant="h6" component="h2" color="primary">
                  Photos
                </AppHeader>
                <FieldArray name="photos">
                  {({ remove }) => (
                    <AppBox flexWrap="wrap" spacing={2}>
                      {values.photos.map((file, index) => (
                        <Button
                          color="secondary"
                          variant="outlined"
                          className={classes.photo}
                          component="div"
                          key={index}
                        >
                          <div className={classes.photoContent}>
                            <Image file={file} />
                            <IconButton
                              className={classes.remove}
                              aria-label="remove photo"
                              onClick={() => remove(index)}
                            >
                              <AppIcon name="cancel" color="secondary" />
                            </IconButton>
                          </div>
                        </Button>
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
                <div className={classes.video}>
                  <AppVideo video={URL.createObjectURL(values.video)} className={classes.videoPlayer} />
                  <IconButton
                    className={classes.remove}
                    aria-label="remove video"
                    onClick={() => setFieldValue('video', null)}
                  >
                    <AppIcon name="cancel" color="secondary" />
                  </IconButton>
                </div>
              </AppBox>
            )}
            <AppBox spacing={2} width="100%">
              <Button
                color="secondary"
                variant="outlined"
                className={classes.control}
                title="load photo"
                aria-label="load photo"
                disabled={isLoading}
                onClick={() => photoInputRef.current?.click()}
              >
                <AppEmoji name="tape" variant="h1" />
              </Button>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                multiple
                className={classes.input}
                onChange={onAddPhoto}
              />
              <Button
                color="secondary"
                variant="outlined"
                className={classes.control}
                title="load video"
                aria-label="load video"
                disabled
                onClick={() => videoInputRef.current?.click()}
              >
                <AppEmoji name="cassette" variant="h1" />
                <Chip label="Soon" size="small" className={classes.soon} />
              </Button>
              <input
                ref={videoInputRef}
                type="file"
                accept=".mov,.mp4"
                className={classes.input}
                onChange={onAddVideo}
              />
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
  input: {
    display: 'none',
  },
  photo: {
    position: 'relative',
    width: 'calc(25% - 12px)',
    height: 120,
  },
  photoContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  remove: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  video: {
    position: 'relative',
    background: '#000000',
  },
  videoPlayer: {
    border: '1px solid rgba(255, 224, 178, 0.5)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  control: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  soon: {
    position: 'absolute',
    top: -12,
    right: 12,
    borderColor: 'rgba(255, 167, 38, 0.7)',
    color: 'rgb(255, 167, 38)',
  },
})
