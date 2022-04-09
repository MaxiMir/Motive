import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { Box, AccordionSummary, Button, Typography, Accordion, AccordionDetails } from '@mui/material'
import { styled } from '@mui/system'
import { MainCharacteristicName } from 'dto'
import useFocus from 'hooks/useFocus'
import { Locale } from 'hooks/useLocale'
import AppDecorEmoji from 'components/UI/AppDecorEmoji'
import AppModal from 'components/UI/AppModal'
import AppTitle from 'components/UI/AppTitle'
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
          <Box display="flex" flexDirection="column" gap={3}>
            <Field name="name" label={name} component={AppInput} />
            <Box display="flex" flexDirection="column" gap={1}>
              <Field
                name="hashtags"
                color="secondary"
                label={hashtags}
                multiline
                rows={2}
                inputRef={hashtagsRef}
                component={AppInput}
              />
              <ButtonCompact variant="outlined" color="secondary" size="small" onClick={onAddHashtag}>
                # {hashtag}
              </ButtonCompact>
            </Box>
            <Box display="flex" flexDirection="column" gap={2}>
              <AppTitle name="stage" variant="h6" component="h2" color="primary">
                {stages}
              </AppTitle>
              <FieldArray name="stages">
                {({ push, remove }) => (
                  <>
                    {values.stages.map((_, index) => (
                      <Box display="flex" gap={1} key={index}>
                        <Box display="flex" height={40} alignItems="center" alignSelf="flex-start">
                          <AppDot size={10} />
                        </Box>
                        <Field
                          name={`stages.${index}`}
                          label={`${stage} ${index + 1}`}
                          autoFocus={index === values.stages.length - 1}
                          color="warning"
                          component={AppInput}
                        />
                        <Box display="flex" alignSelf="flex-start">
                          <AppIconButton name="close" onClick={() => remove(index)} />
                        </Box>
                      </Box>
                    ))}
                    <ButtonCompact variant="outlined" color="warning" size="small" onClick={() => push('')}>
                      + {stageButton}
                    </ButtonCompact>
                  </>
                )}
              </FieldArray>
            </Box>
            <Box display="flex" flexDirection="column" gap={2}>
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
                    <ButtonCompact variant="outlined" size="small" onClick={() => push({ name: '', date: undefined })}>
                      + {addTask}
                    </ButtonCompact>
                  </>
                )}
              </FieldArray>
            </Box>
            <div>
              <AppAccordion
                name="stage"
                header={stages}
                id="stage"
                ariaControls={stageAria}
                details={
                  <>
                    {stageHints.map((hint, key) => (
                      <Typography color="gray" key={key}>
                        {hint}
                      </Typography>
                    ))}
                  </>
                }
              />
              <Accordion>
                <AccordionSummary
                  expandIcon={<AppIcon name="expand_more" />}
                  aria-controls={pittAria}
                  id="old-pitt-note"
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <PaulIcon />
                    <Typography variant="h6" component="h3">
                      {pitt}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="gray">
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
          </Box>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

const ButtonCompact = styled(Button)({
  alignSelf: 'baseline',
  textTransform: 'none',
})
