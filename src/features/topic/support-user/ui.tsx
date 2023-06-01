import { Box, Stack } from '@mui/material'
import { Field, Form, FormikProvider } from 'formik'
import { useIntl } from 'react-intl'
import { SupportRules } from 'entities/characteristic'
import Accordion from 'shared/ui/Accordion'
import CancelButton from 'shared/ui/CancelButton'
import FadeTypography from 'shared/ui/FadeTypography'
import Input from 'shared/ui/Input'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { useCreateTopicForm } from './model'

interface SupportUserModalProps {
  dayId: number
  ownerName: string
  onClose: () => void
}

function SupportUserModal({ dayId, ownerName, onClose }: SupportUserModalProps) {
  const { formatMessage } = useIntl()
  const supportingText = formatMessage({ id: 'common.supporting' })
  const header = formatMessage({ id: 'common.about-support' })
  const buttonText = formatMessage({ id: 'common.supporting' })
  const label = formatMessage({ id: 'common.your-message' })
  const loadingText = formatMessage({ id: 'common.sending' })
  const form = useCreateTopicForm(dayId, onClose)
  const { isSubmitting, handleSubmit } = form
  const title = `${supportingText} ${ownerName}`

  return (
    <Modal
      title={title}
      maxWidth="xs"
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          disabled={isSubmitting}
          text={buttonText}
          loadingText={loadingText}
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
            <Field name="text" label={label} color="primary" multiline rows={3} component={Input} />
            <Box width="100%">
              <Accordion emoji="⛑️" header={header} id="support" details={<SupportRules />} />
            </Box>
          </Stack>
        </Form>
      </FormikProvider>
    </Modal>
  )
}

export default SupportUserModal
