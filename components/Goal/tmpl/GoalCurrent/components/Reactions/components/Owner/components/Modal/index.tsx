import { ChangeEvent, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider, useFormik } from 'formik'
import { Button, makeStyles } from '@material-ui/core'
import useSnackbar from 'hooks/useSnackbar'
import ModalAction from 'components/ModalAction'
import AppModal from 'components/UI/AppModal'
import AppTypography from 'components/UI/AppTypography'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppHeader from 'components/UI/AppHeader'
import AppVideo from 'components/UI/AppVideo'

const IconButton = dynamic(() => import('@material-ui/core/IconButton'))
const Image = dynamic(() => import('./components/Image'))
const AppIcon = dynamic(() => import('components/UI/AppIcon'))

const PHOTO_LIMIT = 10

interface ModalProps {
  onClose: () => void
}

export default function Modal({ onClose }: ModalProps): JSX.Element {
  const classes = useStyles()
  const photoInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const { enqueueSnackbar } = useSnackbar()
  const formik = useFormik({
    initialValues: {
      text: '',
      photos: [],
      video: null,
    },
    // validationSchema: schema,
    async onSubmit(data) {
      console.log('data', data)
    },
  })
  const { values, setFieldValue, handleSubmit } = formik

  const isLoading = false

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
              <AppEmoji name="congratulations" variant="h2" />
              <AppTypography className={classes.congratulations}>
                Impressive! One step closer to your goal!
              </AppTypography>
            </AppBox>
            <Field name="text" label="How did today's *" color="secondary" multiline rows={3} component={AppInput} />
            <AppBox flexDirection="column" spacing={2} width="100%">
              <AppHeader name="photo" variant="h6" component="h2" color="primary">
                Photos
              </AppHeader>
              <FieldArray name="photos">
                {({ remove }) => (
                  <AppBox flexWrap="wrap" spacing={2}>
                    <Button color="secondary" variant="outlined" className={classes.button} aria-label="load photo">
                      <AppBox
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        className={classes.buttonContent}
                        onClick={() => photoInputRef.current?.click()}
                      >
                        <AppTypography color="secondary">
                          <b>+</b>
                        </AppTypography>
                        <AppEmoji name="tape" variant="h1" />
                      </AppBox>
                    </Button>
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className={classes.input}
                      onChange={onAddPhoto}
                    />
                    {values.photos.map((file, index) => (
                      <Button
                        color="secondary"
                        variant="outlined"
                        className={classes.button}
                        component="div"
                        key={index}
                      >
                        <div className={classes.buttonContent}>
                          <Image file={file} />
                          <IconButton onClick={() => remove(index)} className={classes.remove}>
                            <AppIcon name="cancel" color="secondary" />
                          </IconButton>
                        </div>
                      </Button>
                    ))}
                  </AppBox>
                )}
              </FieldArray>
              <AppBox flexDirection="column" spacing={2} width="100%">
                <AppHeader name="video" variant="h6" component="h2" color="primary">
                  Video
                </AppHeader>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept=".mov,.mp4"
                  className={classes.input}
                  onChange={onAddVideo}
                />
                {values.video ? (
                  <div className={classes.video}>
                    <AppVideo video={URL.createObjectURL(values.video)} className={classes.videoPlayer} />
                    <IconButton onClick={() => setFieldValue('video', null)} className={classes.remove}>
                      <AppIcon name="cancel" color="secondary" />
                    </IconButton>
                  </div>
                ) : (
                  <Button color="secondary" variant="outlined" className={classes.button} aria-label="load video">
                    <AppBox
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      className={classes.buttonContent}
                      onClick={() => videoInputRef.current?.click()}
                    >
                      <AppTypography color="secondary">
                        <b>+</b>
                      </AppTypography>
                      <AppEmoji name="cassette" variant="h1" />
                    </AppBox>
                  </Button>
                )}
              </AppBox>
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
  button: {
    position: 'relative',
    width: 'calc((100% - 48px) / 4)',
    height: 0,
    paddingBottom: 'calc((100% - 48px) / 4)',
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
  buttonContent: {
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
})
