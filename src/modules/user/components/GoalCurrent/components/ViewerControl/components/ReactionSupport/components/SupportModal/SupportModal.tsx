import { Field, Form, FormikProvider } from 'formik'
import { Box, Typography } from '@mui/material'
import { UserBaseDto } from '@features/user'
import AppModal from '@ui/AppModal'
import AppFadeIcon from '@ui/AppFadeIcon'
import AppInput from '@ui/AppInput'
import AppAccordion from '@ui/AppAccordion'
import AppDecorEmoji from '@ui/AppDecorEmoji'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
import { useMessages } from './hooks/useMessages'
import { useForm } from './hooks/useForm'

interface SupportModalProps {
  owner: UserBaseDto
  onClose: () => void
}

function SupportModal({ owner, onClose }: SupportModalProps) {
  const messages = useMessages()
  const form = useForm(onClose)
  const { isSubmitting, handleSubmit } = form

  return (
    <AppModal
      title={
        <>
          {messages.title} <br />
          <Box component="span" sx={{ color: 'zen.sand' }}>
            {owner.name}
          </Box>
        </>
      }
      maxWidth="xs"
      actions={[
        <ActionCancel key="cancel" onClick={onClose} />,
        <ActionSubmit
          disabled={isSubmitting}
          text={messages.buttonText}
          loadingText={messages.loadingText}
          emoji="support"
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <AppFadeIcon name="support" />
            <Field
              name="text"
              label={messages.label}
              color="primary"
              multiline
              rows={3}
              component={AppInput}
            />
            <Box sx={{ width: '100%' }}>
              <AppAccordion
                name="helmet"
                header={messages.header}
                id="support"
                details={
                  <Box sx={{ color: 'zen.silent' }}>
                    <Typography>
                      {messages.accordionGoal}
                      <AppDecorEmoji name="goal" />.
                    </Typography>
                    <Typography>
                      {messages.accordionTired}
                      <AppDecorEmoji name="tired" />.
                    </Typography>
                    <Typography>{messages.accordionTherefore}:</Typography>
                    <Typography>&#9679; {messages.accordionAdvice};</Typography>
                    <Typography>&#9679; {messages.accordionEncouragement}.</Typography>
                  </Box>
                }
              />
            </Box>
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

export default SupportModal
