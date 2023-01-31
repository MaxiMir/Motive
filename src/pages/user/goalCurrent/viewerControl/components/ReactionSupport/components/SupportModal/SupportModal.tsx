import { Box, Stack, Typography } from '@mui/material'
import { Field, Form, FormikProvider } from 'formik'
import { UserBaseDto } from 'shared/api'
import Accordion from 'shared/ui/Accordion'
import CancelButton from 'shared/ui/CancelButton'
import FadeTypography from 'shared/ui/FadeTypography'
import Input from 'shared/ui/Input'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import { useForm } from './hooks/useForm'
import { useMessages } from './hooks/useMessages'

interface SupportModalProps {
  owner: UserBaseDto
  onClose: () => void
}

function SupportModal({ owner, onClose }: SupportModalProps) {
  const messages = useMessages()
  const form = useForm(onClose)
  const { isSubmitting, handleSubmit } = form

  return (
    <Modal
      title={
        <>
          {messages.title} <br />
          <Box component="span" color="zen.sand">
            {owner.name}
          </Box>
        </>
      }
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
          <Stack alignItems="center" spacing={3}>
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
                details={
                  <Box color="zen.silent">
                    <Typography>{messages.accordionGoal} 💎.</Typography>
                    <Typography>{messages.accordionTired} 😮‍💨.</Typography>
                    <Typography>{messages.accordionTherefore}:</Typography>
                    <Typography>&#9679; {messages.accordionAdvice};</Typography>
                    <Typography>&#9679; {messages.accordionEncouragement}.</Typography>
                  </Box>
                }
              />
            </Box>
          </Stack>
        </Form>
      </FormikProvider>
    </Modal>
  )
}

export default SupportModal
