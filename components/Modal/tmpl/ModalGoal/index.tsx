import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import {
  Box,
  Button,
  Typography,
  IconButton,
  FormControl,
  Tooltip,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material'
import { styled } from '@mui/system'
import useFocus from 'hooks/useFocus'
import { Locale } from 'hooks/useLocale'
import { getToday, getTomorrow } from 'helpers/date'
import AppModal from 'components/UI/AppModal'
import AppTitle from 'components/UI/AppTitle'
import AppInput from 'components/UI/AppInput'
import AppIcon from 'components/UI/AppIcon'
import AppDot from 'components/UI/AppDot'
import Action from 'components/Action'
import Task from 'components/Task'
import useForm from './hook'
import i18n from './i18n'

const AppIconButton = dynamic(() => import('components/UI/AppIconButton'))

export interface ModalGoalProps {
  tmpl: 'goal'
  locale: Locale
  onClose: () => void
}

export default function ModalGoal({ locale, onClose }: ModalGoalProps): JSX.Element {
  const [hashtagsRef, setHashtagsFocus] = useFocus()
  const form = useForm(onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const todayValue = getToday().toISOString()
  const tomorrowValue = getTomorrow().toISOString()
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
    stageHints,
    start,
    startLabelledby,
    today,
    tomorrow,
    tasksTitle,
    addTask,
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
          <Box display="flex" flexDirection="column" gap={2}>
            <Field name="name" label={name} component={AppInput} />
            <Box display="flex" flexDirection="column" gap={1}>
              <Field name="hashtags" color="secondary" label={hashtags} inputRef={hashtagsRef} component={AppInput} />
              <ButtonCompact variant="outlined" color="secondary" size="small" onClick={onAddHashtag}>
                # {hashtag}
              </ButtonCompact>
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" gap={1}>
                <AppTitle name="stage" variant="h6" component="h4" color="primary">
                  {stages}
                </AppTitle>
                <Tooltip
                  title={
                    <>
                      {stageHints.map((hint, key) => (
                        <Typography key={key}>{hint}.</Typography>
                      ))}
                    </>
                  }
                >
                  <IconButton color="info">
                    <AppIcon name="help_outline" />
                  </IconButton>
                </Tooltip>
              </Box>
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
            <FormControl variant="standard">
              <AppTitle name="clock" variant="h6" component="label">
                {start}
              </AppTitle>
              <RadioGroup
                name="started"
                value={values.started}
                aria-labelledby={startLabelledby}
                row
                onChange={(e) => setFieldValue('started', e.target.value)}
              >
                <FormControlLabel label={today} value={todayValue} control={<Radio />} />
                <FormControlLabel label={tomorrow} value={tomorrowValue} control={<Radio />} />
              </RadioGroup>
            </FormControl>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" gap={1}>
                <AppTitle name="task" variant="h6" component="h4" color="primary">
                  {tasksTitle}
                </AppTitle>
              </Box>
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
                          setFieldValue(`tasks.${index}.date`, isChecked ? values.started : undefined)
                        }
                      />
                    ))}
                    <ButtonCompact variant="outlined" size="small" onClick={() => push({ name: '', date: undefined })}>
                      {addTask}
                    </ButtonCompact>
                  </>
                )}
              </FieldArray>
            </Box>
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
