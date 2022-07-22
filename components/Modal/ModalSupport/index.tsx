import { Field, Form, FormikProvider } from 'formik'
import { Box, Typography } from '@mui/material'
import { GoalDto, UserBaseDto } from 'dto'
import useLocale from 'hooks/useLocale'
import ActionSubmit from 'components/Action/ActionSubmit'
import ActionClose from 'components/Action/ActionClose'
import AppModal from 'components/ui/AppModal'
import AppFadeIcon from 'components/ui/AppFadeIcon'
import AppInput from 'components/ui/AppInput'
import AppAccordion from 'components/ui/AppAccordion'
import AppDecorEmoji from 'components/ui/AppDecorEmoji'
import useForm from './hook'
import i18n from './i18n'

export interface ModalSupportProps {
  goal: GoalDto
  owner: UserBaseDto
  onClose: () => void
}

export default function ModalSupport({ goal, owner, onClose }: ModalSupportProps) {
  const { locale } = useLocale()
  const form = useForm(goal, onClose)
  const { isSubmitting, handleSubmit } = form
  const { title, header, label, button, buttonLoading, ariaControls, accordion } = i18n[locale]

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
        <ActionClose onClick={onClose} />,
        <ActionSubmit
          isLoading={isSubmitting}
          name={button}
          nameLoading={buttonLoading}
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
                      {accordion[0]}
                      <AppDecorEmoji name="goal" />.
                    </Typography>
                    <Typography>
                      {accordion[1]}
                      <AppDecorEmoji name="tired" />.
                    </Typography>
                    <Typography>{accordion[2]}</Typography>
                    <Typography>&#9679; {accordion[3]}</Typography>
                    <Typography>&#9679; {accordion[4]}</Typography>
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
