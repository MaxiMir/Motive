import { FocusEvent } from 'react'
import { Field, Form, FormikProvider } from 'formik'
import { createStyles, makeStyles } from '@material-ui/core'
import { MessageDto } from 'dto'
import ModalAction from 'components/ModalAction'
import AppModal from 'components/UI/AppModal'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import useForm from './hook'

export interface ModalEditMessageProps {
  tmpl: 'edit-message'
  message: MessageDto
  onClose: () => void
}

export default function ModalEditMessage({ message, onClose }: ModalEditMessageProps): JSX.Element {
  const classes = useStyles()
  const form = useForm(message, onClose)
  const { isSubmitting, handleSubmit } = form

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
  }

  return (
    <AppModal
      title={
        <>
          Editing the <span className={classes.message}>message</span>
        </>
      }
      maxWidth="xs"
      actions={[
        <ModalAction tmpl="close" onClick={onClose} />,
        <ModalAction
          tmpl="submit"
          isLoading={isSubmitting}
          name="Save"
          nameLoading="Saving"
          emoji="save"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <AppBox flexDirection="column" alignItems="center" spacing={3}>
            <Field
              name="text"
              label="Your message"
              color="secondary"
              multiline
              rows={3}
              inputRef={(input: HTMLInputElement | null) => input?.focus()}
              onFocus={onFocus}
              component={AppInput}
            />
          </AppBox>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    message: {
      color: theme.text.sand,
    },
  }),
)
