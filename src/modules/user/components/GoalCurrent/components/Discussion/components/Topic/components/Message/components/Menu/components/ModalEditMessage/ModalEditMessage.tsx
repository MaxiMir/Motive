import { FocusEvent } from 'react'
import { Field, Form, FormikProvider } from 'formik'
import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import { MessageDto } from '@dto'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel'
import AppModal from '@ui/AppModal'
import AppInput from '@ui/AppInput'
import useForm from './hook'

interface ModalEditMessageProps {
  message: MessageDto
  onClose: () => void
}

export default function ModalEditMessage({ message, onClose }: ModalEditMessageProps) {
  const { formatMessage } = useIntl()
  const form = useForm(message, onClose)
  const { isSubmitting, handleSubmit } = form
  const title = formatMessage({ id: 'common.editing' })
  const subtitle = formatMessage({ id: 'common.message' })
  const buttonText = formatMessage({ id: 'common.save' })
  const loadingText = formatMessage({ id: 'common.saving' })
  const label = formatMessage({ id: 'common.your-message' })

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
  }

  return (
    <AppModal
      title={
        <>
          {title}{' '}
          <Box component="span" sx={{ color: 'zen.sand' }}>
            {subtitle}
          </Box>
        </>
      }
      maxWidth="xs"
      actions={[
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          disabled={isSubmitting}
          text={buttonText}
          loadingText={loadingText}
          emoji="save"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <Field
              name="text"
              label={label}
              multiline
              rows={3}
              inputRef={(input: HTMLInputElement | null) => input?.focus()}
              onFocus={onFocus}
              component={AppInput}
            />
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}
