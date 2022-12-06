import dynamic from 'next/dynamic'
import { v4 as uuidV4 } from 'uuid'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { Box, Button, Typography, FormControl, Tooltip, FormControlLabel, RadioGroup, Radio } from '@mui/material'
import { styled } from '@mui/system'
import { getMidnight, getTomorrow } from '@lib/date'
import useFocus from '@hooks/useFocus'
import AppModal from '@ui/AppModal/AppModal'
import AppHeader from '@ui/AppHeader'
import AppInput from '@ui/AppInput'
import AppIcon from '@ui/AppIcon'
import AppDot from '@ui/AppDot'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
import TaskField from '@components/Task/TaskField/TaskField'
import useForm from './hooks/useForm'
import useMessages from './hooks/useMessages'

const IconButton = dynamic(() => import('@mui/material/IconButton'))

interface ModalGoalProps {
  onClose: () => void
}

function ModalGoal({ onClose }: ModalGoalProps) {
  const messages = useMessages()
  const [hashtagsRef, setHashtagsFocus] = useFocus()
  const form = useForm(onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const todayValue = getMidnight().toISOString()
  const tomorrowValue = getTomorrow().toISOString()

  const onAddHashtag = () => {
    setFieldValue('hashtags', !values.hashtags ? '#' : `${values.hashtags} #`)
    setHashtagsFocus()
  }

  return (
    <AppModal
      title={messages.title}
      maxWidth="xs"
      actions={[
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          disabled={isSubmitting}
          text={messages.buttonText}
          loadingText={messages.loadingText}
          emoji="goal"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <Box display="flex" flexDirection="column" gap={2}>
            <Field name="name" label={messages.nameLabel} component={AppInput} />
            <Box display="flex" flexDirection="column" gap={1}>
              <Field
                name="hashtags"
                color="secondary"
                label={messages.hashtagsLabel}
                inputRef={hashtagsRef}
                component={AppInput}
              />
              <ButtonCompact variant="outlined" color="secondary" size="small" onClick={onAddHashtag}>
                # {messages.hashtagText}
              </ButtonCompact>
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" gap={1}>
                <AppHeader name="stage" variant="h6" component="h4" color="primary">
                  {messages.stagesHeader}
                </AppHeader>
                <Tooltip
                  title={
                    <>
                      <Typography>{messages.stageHintStart}.</Typography>
                      <Typography>{messages.stageHintEnd}.</Typography>
                    </>
                  }
                >
                  <span>
                    <IconButton color="info">
                      <AppIcon name="help_outline" />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
              <FieldArray name="stages">
                {({ push, remove }) => (
                  <>
                    {values.stages.map(({ id }, index) => (
                      <Box display="flex" gap={1} key={id}>
                        <Box display="flex" height={40} alignItems="center" alignSelf="flex-start">
                          <AppDot size={10} />
                        </Box>
                        <Field
                          name={`stages.${index}.name`}
                          label={`${messages.stageLabel} ${index + 1}`}
                          autoFocus={index === values.stages.length - 1}
                          color="warning"
                          component={AppInput}
                        />
                        <Box display="flex" alignSelf="flex-start">
                          <IconButton disableFocusRipple onClick={() => remove(index)}>
                            <AppIcon name="close" />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                    <ButtonCompact
                      variant="outlined"
                      color="warning"
                      size="small"
                      onClick={() => push({ id: uuidV4(), name: '' })}
                    >
                      + {messages.stageButtonText}
                    </ButtonCompact>
                  </>
                )}
              </FieldArray>
            </Box>
            <FormControl variant="standard">
              <AppHeader name="clock" variant="h6" component="label">
                {messages.startHeader}
              </AppHeader>
              <RadioGroup
                name="started"
                value={values.started}
                aria-labelledby={messages.startLabelledby}
                row
                onChange={(e) => setFieldValue('started', e.target.value)}
              >
                <FormControlLabel label={messages.todayLabel} value={todayValue} control={<Radio />} />
                <FormControlLabel label={messages.tomorrowLabel} value={tomorrowValue} control={<Radio />} />
              </RadioGroup>
            </FormControl>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" gap={1}>
                <AppHeader name="task" variant="h6" component="h4" color="primary">
                  {messages.tasksHeader}
                </AppHeader>
              </Box>
              <FieldArray name="tasks">
                {({ push, remove }) => (
                  <>
                    {values.tasks.map(({ id, date }, index) => (
                      <TaskField
                        taskCount={values.tasks.length}
                        date={values.started}
                        remind={date}
                        index={index}
                        key={id}
                        setFieldValue={setFieldValue}
                        onRemove={() => remove(index)}
                      />
                    ))}
                    <ButtonCompact
                      variant="outlined"
                      size="small"
                      onClick={() => push({ id: uuidV4(), name: '', date: undefined })}
                    >
                      {messages.addTaskText}
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

export default ModalGoal
