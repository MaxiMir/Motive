import { FocusEvent } from 'react'
import { Field, Form, FormikProvider } from 'formik'
import { Box } from '@mui/material'
import { MessageDto } from 'dto'
import useLocale from 'hooks/useLocale'
import ActionSubmit from 'components/Action/ActionSubmit'
import ActionClose from 'components/Action/ActionClose'
import AppModal from 'components/ui/AppModal'
import AppInput from 'components/ui/AppInput'
import useForm from './hook'
import i18n from './i18n'

export interface ModalEditMessageProps {
  message: MessageDto
  onClose: () => void
}

export default function ModalEditMessage({ message, onClose }: ModalEditMessageProps) {
  const { locale } = useLocale()
  const form = useForm(message, onClose)
  const { isSubmitting, handleSubmit } = form
  const { title, subtitle, button, buttonLoading, label } = i18n[locale]

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
        <ActionClose onClick={onClose} />,
        <ActionSubmit
          isLoading={isSubmitting}
          name={button}
          nameLoading={buttonLoading}
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
