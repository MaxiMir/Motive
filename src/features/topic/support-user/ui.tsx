import { Box, Stack } from '@mui/material'
import { Field, Form, FormikProvider } from 'formik'
import { SupportRules } from 'entities/characteristic'
import Accordion from 'shared/ui/Accordion'
import CancelButton from 'shared/ui/CancelButton'
import FadeTypography from 'shared/ui/FadeTypography'
import Input from 'shared/ui/Input'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { useMessages } from './lib'
import { useCreateTopicForm } from './model'

interface SupportUserModalProps {
  dayId: number
  ownerName: string
  onClose: () => void
}

function SupportUserModal({ dayId, ownerName, onClose }: SupportUserModalProps) {
  const messages = useMessages()
  const form = useCreateTopicForm(dayId, onClose)
  const { isSubmitting, handleSubmit } = form
  const title = `${messages.title} ${ownerName}`

  return (
    <Modal
      title={title}
      maxWidth="xs"
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          disabled={isSubmitting}
          text={messages.buttonText}
          loadingText={messages.loadingText}
          emoji="🙏"
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form>
          <Stack alignItems="center" gap={3}>
            <FadeTypography>🙏</FadeTypography>
            <Field
              name="text"
              label={messages.label}
              color="primary"
              multiline
              rows={3}
              component={Input}
            />
            <Box width="100%">
              <Accordion
                emoji="⛑️"
                header={messages.header}
                id="support"
                details={<SupportRules />}
              />
            </Box>
          </Stack>
        </Form>
      </FormikProvider>
    </Modal>
  )
}

export default SupportUserModal
