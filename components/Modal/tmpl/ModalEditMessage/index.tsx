import { FocusEvent } from 'react'
import { Field, Form, FormikProvider } from 'formik'
import { Box, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { MessageDto } from 'dto'
import Action from 'components/Action'
import AppModal from 'components/UI/AppModal'
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
        <Action tmpl="close" onClick={onClose} />,
        <Action
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
          <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
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
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    message: {
      color: theme.palette.zen.sand,
    },
  }),
)
