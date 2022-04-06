import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { AccordionSummary, Button, Typography, Accordion, AccordionDetails, Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { MainCharacteristicName } from 'dto'
import useFocus from 'hooks/useFocus'
import { Locale } from 'hooks/useLocale'
import AppDecorEmoji from 'components/UI/AppDecorEmoji'
import AppModal from 'components/UI/AppModal'
import AppTitle from 'components/UI/AppTitle'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppIcon from 'components/UI/AppIcon'
import AppDot from 'components/UI/AppDot'
import AppAccordion from 'components/UI/AppAccordion'
import { PaulIcon } from 'components/UI/icons'
import Action from 'components/Action'
import Task from 'components/Task'
import useForm from './hook'
import i18n from './i18n'

const AppIconButton = dynamic(() => import('components/UI/AppIconButton'))

const CHARACTERISTIC_NAMES: MainCharacteristicName[] = ['motivation', 'creativity', 'support']

export interface ModalGoalProps {
  tmpl: 'goal'
  locale: Locale
  onClose: () => void
}

export default function ModalGoal({ locale, onClose }: ModalGoalProps): JSX.Element {
  const classes = useStyles()
  const [hashtagsRef, setHashtagsFocus] = useFocus()
  const form = useForm(onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const {
    title,
    name,
    hashtag,
    hashtags,
    button,
    buttonLoading,
    stages,
    stage,
    stageButton,
    stageAria,
    stageHints,
    tasksTitle,
    addTask,
    pitt,
    pittAria,
    pittHints,
  } = i18n[locale]

  const onAddHashtag = () => {
    setFieldValue('hashtags', !values.hashtags ? '#' : [values.hashtags, '#'].join(' '))
    setHashtagsFocus()
  }

  return (
    <AppModal
      title={title}
      maxWidth="xs"
      actions={[
        <Action tmpl="close" onClick={onClose} />,
        <Action
          tmpl="submit"
          isLoading={isSubmitting}
          name={button}
          nameLoading={buttonLoading}
          emoji="goal"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <AppBox flexDirection="column" gap={3}>
            <Field name="name" label={name} color="secondary" component={AppInput} />
            <AppBox flexDirection="column" gap={1}>
              <Field
                name="hashtags"
                label={hashtags}
                color="secondary"
                multiline
                rows={3}
                inputRef={hashtagsRef}
                component={AppInput}
              />
              <Button variant="outlined" size="small" className={classes.button} onClick={onAddHashtag}>
                # {hashtag}
              </Button>
            </AppBox>
            <AppBox flexDirection="column" gap={2}>
              <AppTitle name="stage" variant="h6" component="h2" color="primary">
                {stages}
              </AppTitle>
              <FieldArray name="stages">
                {({ push, remove }) => (
                  <>
                    {values.stages.map((_, index) => (
                      <AppBox gap={1} key={index}>
                        <AppBox alignSelf="flex-start" mt={2}>
                          <AppDot size={10} />
                        </AppBox>
                        <Field
                          name={`stages.${index}`}
                          label={`${stage} ${index + 1}`}
                          autoFocus={index === values.stages.length - 1}
                          color="secondary"
                          component={AppInput}
                        />
                        <AppBox alignSelf="flex-start" mt="-4px">
                          <AppIconButton name="close" onClick={() => remove(index)} />
                        </AppBox>
                      </AppBox>
                    ))}
                    <Button variant="outlined" size="small" className={classes.button} onClick={() => push('')}>
                      + {stageButton}
                    </Button>
                  </>
                )}
              </FieldArray>
            </AppBox>
            <AppBox flexDirection="column" gap={2}>
              <AppTitle name="task" variant="h6" component="h2" color="primary">
                {tasksTitle}
              </AppTitle>
              <FieldArray name="tasks">
                {({ push, remove }) => (
                  <>
                    {values.tasks.map((task, index) => (
                      <Task
                        tmpl="field"
                        index={index}
                        taskCount={values.tasks.length}
                        date={task.date}
                        locale={locale}
                        key={`tasks.${index}`}
                        onRemove={() => remove(index)}
                        onToggleDate={(isChecked) =>
                          setFieldValue(`tasks.${index}.date`, isChecked ? values.tasksDate : undefined)
                        }
                      />
                    ))}
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={() => push({ name: '', date: undefined })}
                    >
                      + {addTask}
                    </Button>
                  </>
                )}
              </FieldArray>
            </AppBox>
            <div>
              <AppAccordion
                name="stage"
                header={stages}
                id="stage"
                ariaControls={stageAria}
                details={
                  <div className={classes.hint}>
                    {stageHints.map((hint, key) => (
                      <Typography key={key}>{hint}</Typography>
                    ))}
                  </div>
                }
              />
              <Accordion>
                <AccordionSummary
                  expandIcon={<AppIcon name="expand_more" color="primary" />}
                  aria-controls={pittAria}
                  id="old-pitt-note"
                >
                  <AppBox alignItems="center" gap={1}>
                    <PaulIcon />
                    <Typography variant="h6" component="h3" color="primary">
                      {pitt}
                    </Typography>
                  </AppBox>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.hint}>
                    {pittHints[0]}
                    <br />
                    {pittHints[1]} <AppDecorEmoji name="web" />.
                    <br />
                    {pittHints[2]} <AppDecorEmoji name="blood" />.
                    <br />
                    {pittHints[3]}{' '}
                    {CHARACTERISTIC_NAMES.map((characteristic) => (
                      <AppDecorEmoji name={characteristic} key={characteristic} />
                    ))}
                    {pittHints[4]}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </AppBox>
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
    hint: {
      color: theme.text.silent,
    },
  }),
)
