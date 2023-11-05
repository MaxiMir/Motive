import { Box, Stack } from '@mui/material'
import { Field, Form, FormikProvider } from 'formik'
import { useIntl } from 'react-intl'
import { useDeviceContext } from 'entities/device'
import { SupportRules } from 'entities/discussion'
import { Emoji } from 'shared/config'
import Accordion from 'shared/ui/accordion'
import CancelButton from 'shared/ui/cancel-button'
import FadeTypography from 'shared/ui/fade-typography'
import Icon from 'shared/ui/icon'
import Input from 'shared/ui/input'
import Modal from 'shared/ui/modal'
import SubmitButton from 'shared/ui/submit-button'
import { useCreateTopicForm } from './model'

interface SupportUserModalProps {
  dayId: number
  ownerName: string
  onClose: () => void
}

function SupportUserModal({ dayId, ownerName, onClose }: SupportUserModalProps) {
  const { formatMessage } = useIntl()
  const { isMobile } = useDeviceContext()
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
      fullScreen={isMobile}
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
          <Stack alignItems="center" gap={3}>
            <FadeTypography>{Emoji.support}</FadeTypography>
            <Field name="text" label={label} color="primary" multiline rows={3} component={Input} />
            <Box width="100%">
              <Accordion
                iconStart={<Icon name="ev_shadow_add" color="primary.dark" />}
                summary={header}
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
