import { InputAdornment, Stack } from '@mui/material'
import { Field, Form, FormikProvider } from 'formik'
import { ChangeEvent } from 'react'
import { useIntl } from 'react-intl'
import { useDetectMobile } from 'entities/device'
import { UserPageDto } from 'shared/api'
import CancelButton from 'shared/ui/CancelButton'
import Input from 'shared/ui/Input'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { useEditProfileForm } from './model'

interface EditProfileModalProps {
  user: UserPageDto
  onClose: () => void
}

function EditProfileModal({ user, onClose }: EditProfileModalProps) {
  const { formatMessage } = useIntl()
  const mobile = useDetectMobile()
  const form = useEditProfileForm(user, onClose)
  const { setFieldValue, isSubmitting, handleSubmit } = form
  const title = formatMessage({ id: 'page.user.modal-profile.title' })
  const nameLabel = formatMessage({ id: 'page.user.modal-profile.name' })
  const nicknameLabel = formatMessage({ id: 'common.nickname' })
  const mottoLabel = formatMessage({ id: 'common.motto' })
  const locationLabel = formatMessage({ id: 'common.location' })
  const bioLabel = formatMessage({ id: 'common.bio' })
  const buttonText = formatMessage({ id: 'common.save' })
  const loadingText = formatMessage({ id: 'common.saving' })

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue('nickname', e.target.value.toLowerCase())
  }

  return (
    <Modal
      title={title}
      maxWidth="xs"
      fullScreen={mobile}
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          text={buttonText}
          loadingText={loadingText}
          isLoading={isSubmitting}
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form>
          <Stack gap={3}>
            <Field name="name" label={nameLabel} color="primary" component={Input} />
            <Field
              name="nickname"
              label={nicknameLabel}
              color="primary"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">https://2bebetter.pro/</InputAdornment>
                ),
              }}
              component={Input}
              onChange={onChangeNickname}
            />
            <Field name="motto" label={mottoLabel} color="primary" component={Input} />
            <Field name="location" label={locationLabel} color="primary" component={Input} />
            <Field name="bio" multiline label={bioLabel} color="primary" component={Input} />
          </Stack>
        </Form>
      </FormikProvider>
    </Modal>
  )
}

export default EditProfileModal
