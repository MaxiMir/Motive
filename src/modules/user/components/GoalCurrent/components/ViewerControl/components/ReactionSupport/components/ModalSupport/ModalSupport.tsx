import { Field, Form, FormikProvider } from 'formik'
import { Box, Typography } from '@mui/material'
import { GoalDto, UserBaseDto } from '@dto'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
import AppModal from '@ui/AppModal/AppModal'
import AppFadeIcon from '@ui/AppFadeIcon'
import AppInput from '@ui/AppInput'
import AppAccordion from '@ui/AppAccordion'
import AppDecorEmoji from '@ui/AppDecorEmoji'
import useForm from './hooks/useForm'
import useMessages from './hooks/useMessages'

interface ModalSupportProps {
  goal: GoalDto
  owner: UserBaseDto
  onClose: () => void
}

function ModalSupport({ goal, owner, onClose }: ModalSupportProps) {
  const messages = useMessages()
  const form = useForm(goal, onClose)
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
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          disabled={isSubmitting}
          text={messages.buttonText}
          loadingText={messages.loadingText}
          emoji="support"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <AppFadeIcon name="support" />
            <Field name="text" label={messages.label} color="primary" multiline rows={3} component={AppInput} />
            <Box sx={{ width: '100%' }}>
              <AppAccordion
                name="helmet"
                header={messages.header}
                id="support"
                ariaControls={messages.ariaControls}
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

export default ModalSupport
