import { Field, Form, FormikProvider } from 'formik'
import { Box, Typography, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { GoalDto, UserBaseDto } from 'dto'
import useLocale from 'hooks/useLocale'
import Action from 'components/Action'
import AppModal from 'components/UI/AppModal'
import AppFadeIcon from 'components/UI/AppFadeIcon'
import AppInput from 'components/UI/AppInput'
import AppAccordion from 'components/UI/AppAccordion'
import AppDecorEmoji from 'components/UI/AppDecorEmoji'
import useForm from './hook'
import i18n from './i18n'

export interface ModalSupportProps {
  tmpl: 'support'
  goal: GoalDto
  owner: UserBaseDto
  onClose: () => void
}

export default function ModalSupport({ goal, owner, onClose }: ModalSupportProps): JSX.Element {
  const classes = useStyles()
  const { locale } = useLocale()
  const form = useForm(goal, onClose)
  const { isSubmitting, handleSubmit } = form
  const { title, header, label, button, buttonLoading, ariaControls, accordion } = i18n[locale]

  return (
    <AppModal
      title={
        <>
          {title} <span className={classes.owner}>{owner.name}</span>
        </>
      }
      maxWidth="xs"
      actions={[
        <Action tmpl="close" onClick={onClose} />,
        <Action
          tmpl="submit"
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
            <Field name="text" label={label} color="secondary" multiline rows={3} component={AppInput} />
            <div className={classes.accordionWrap}>
              <AppAccordion
                name="helmet"
                header={header}
                id="support"
                ariaControls={ariaControls}
                details={
                  <div className={classes.hint}>
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
                  </div>
                }
              />
            </div>
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      alignSelf: 'baseline',
      textTransform: 'none',
    },
    accordionWrap: {
      width: '100%',
    },
    owner: {
      color: theme.palette.zen.sand,
    },
    hint: {
      color: theme.palette.zen.silent,
    },
  }),
)
