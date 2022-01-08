import React, { ChangeEvent, useRef } from 'react'
import { Field, FieldArray, Form, FormikProvider, useFormik } from 'formik'
import { Button, IconButton, makeStyles } from '@material-ui/core'
import ModalAction from 'components/ModalAction'
import AppModal from 'components/UI/AppModal'
import AppTypography from 'components/UI/AppTypography'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppHeader from 'components/UI/AppHeader'
import Image from './components/Image'

interface ModalProps {
  onClose: () => void
}

export default function Modal({ onClose }: ModalProps): JSX.Element {
  const classes = useStyles()
  const photoInputRef = useRef<HTMLInputElement>(null)
  const formik = useFormik({
    initialValues: {
      text: '',
      photos: [],
    },
    // validationSchema: schema,
    async onSubmit(data) {
      console.log('data', data)
    },
  })
  const { values, setFieldValue, handleSubmit } = formik

  const isLoading = false

  const onAddPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!e.target.files) {
      return
    }

    if (e.target.files.length > 10) {
      // error
    }

    file && setFieldValue('photos', [...values.photos, file])
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
                        <AppTypography color="secondary">+</AppTypography>
                        <AppEmoji name="tape" variant="h1" />
                      </AppBox>
                    </Button>
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      className={classes.input}
                      multiple
                      onChange={onAddPhoto}
                    />
                    {values.photos.map((file, index) => (
                      <Button color="secondary" variant="outlined" className={classes.button} key={index}>
                        <div className={classes.buttonContent}>
                          <Image file={file} />
                          <IconButton onClick={() => remove(index)} />
                        </div>
                      </Button>
                    ))}
                  </AppBox>
                )}
              </FieldArray>
            </AppBox>
            <AppBox flexDirection="column" spacing={2} width="100%">
              <AppHeader name="video" variant="h6" component="h2" color="primary">
                Videos
              </AppHeader>
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
    width: 'calc((100% - 32px) / 3)',
    height: 0,
    paddingBottom: 'calc((100% - 32px) / 3)',
  },
  buttonContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
