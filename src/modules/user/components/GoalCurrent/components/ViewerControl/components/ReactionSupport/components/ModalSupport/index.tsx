import { useIntl } from 'react-intl'
import { Field, Form, FormikProvider } from 'formik'
import { Box, Typography } from '@mui/material'
import { GoalDto, UserBaseDto } from '@dto'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel'
import AppModal from '@ui/AppModal'
import AppFadeIcon from '@ui/AppFadeIcon'
import AppInput from '@ui/AppInput'
import AppAccordion from '@ui/AppAccordion'
import AppDecorEmoji from '@ui/AppDecorEmoji'
import useForm from './hook'

interface ModalSupportProps {
  goal: GoalDto
  owner: UserBaseDto
  onClose: () => void
}

export default function ModalSupport({ goal, owner, onClose }: ModalSupportProps) {
  const { formatMessage } = useIntl()
  const form = useForm(goal, onClose)
  const { isSubmitting, handleSubmit } = form
  const title = formatMessage({ id: 'common.support' })
  const header = formatMessage({ id: 'common.support' })
  const buttonText = formatMessage({ id: 'common.supporting' })
  const label = formatMessage({ id: 'common.your-message' })
  const loadingText = formatMessage({ id: 'common.sending' })
  const ariaControls = formatMessage({ id: 'component.modal-support.aria' })
  const accordionGoal = formatMessage({ id: 'component.modal-support.accordion-goal' })
  const accordionTired = formatMessage({ id: 'component.modal-support.accordion-tired' })
  const accordionTherefore = formatMessage({ id: 'component.modal-support.accordion-therefore' })
  const accordionAdvice = formatMessage({ id: 'component.modal-support.accordion-advice' })
  const accordionEncouragement = formatMessage({ id: 'component.modal-support.accordion-encouragement' })

  return (
    <AppModal
      title={
        <>
          {title} <br />
          <Box component="span" sx={{ color: 'zen.sand' }}>
            {owner.name}
          </Box>
        </>
      }
      maxWidth="xs"
      actions={[
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          isLoading={isSubmitting}
          text={buttonText}
          loadingText={loadingText}
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
            <Field name="text" label={label} color="primary" multiline rows={3} component={AppInput} />
            <Box sx={{ width: '100%' }}>
              <AppAccordion
                name="helmet"
                header={header}
                id="support"
                ariaControls={ariaControls}
                details={
                  <Box sx={{ color: 'zen.silent' }}>
                    <Typography>
                      {accordionGoal}
                      <AppDecorEmoji name="goal" />.
                    </Typography>
                    <Typography>
                      {accordionTired}
                      <AppDecorEmoji name="tired" />.
                    </Typography>
                    <Typography>{accordionTherefore}:</Typography>
                    <Typography>&#9679; {accordionAdvice};</Typography>
                    <Typography>&#9679; {accordionEncouragement}.</Typography>
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
