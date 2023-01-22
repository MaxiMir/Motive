import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { Box, Button, FormControl, Stack, FormControlLabel, RadioGroup, Radio } from '@mui/material'
import { styled } from '@mui/system'
import { getMidnightISO, getTomorrowISO } from '@lib/date'
import useFocus from '@hooks/useFocus'
import AppModal from '@ui/AppModal'
import EmojiHeader from '@ui/EmojiHeader'
import AppInput from '@ui/AppInput'
import AppIcon from '@ui/AppIcon'
import TooltipArrow from '@ui/styled/TooltipArrow'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel/ActionCancel'
import TaskField from '@components/Task/TaskField/TaskField'
import { useMessages } from './hooks/useMessages'
import { useForm } from './hooks/useForm'

const IconButton = dynamic(() => import('@mui/material/IconButton'))

interface GoalModalProps {
  onClose: () => void
}

function GoalModal({ onClose }: GoalModalProps) {
  const messages = useMessages()
  const [hashtagsRef, setHashtagsFocus] = useFocus()
  const form = useForm(onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const todayValue = getMidnightISO()
  const tomorrowValue = getTomorrowISO()

  const onAddHashtag = () => {
    setFieldValue('hashtags', !values.hashtags ? '#' : `${values.hashtags} #`)
    setHashtagsFocus()
  }

  return (
    <AppModal
      title={messages.title}
      maxWidth="xs"
      actions={[
        <ActionCancel key="cancel" onClick={onClose} />,
        <ActionSubmit
          disabled={isSubmitting}
          text={messages.buttonText}
          loadingText={messages.loadingText}
          emoji="goal"
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form>
          <Stack spacing={2}>
            <Field name="name" label={messages.nameLabel} component={AppInput} />
            <Stack spacing={1}>
              <Field
                name="hashtags"
                color="secondary"
                label={messages.hashtagsLabel}
                inputRef={hashtagsRef}
                component={AppInput}
              />
              <ButtonCompact
                size="small"
                variant="outlined"
                color="secondary"
                onClick={onAddHashtag}
              >
                # {messages.hashtagText}
              </ButtonCompact>
            </Stack>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1}>
                <EmojiHeader name="stage" variant="h6" component="h4" color="primary">
                  {messages.stagesHeader}
                </EmojiHeader>
                <TooltipArrow title={messages.stageHint}>
                  <IconButton color="info">
                    <AppIcon name="help_outline" />
                  </IconButton>
                </TooltipArrow>
              </Stack>
              <FieldArray name="stages">
                {({ push, remove }) => (
                  <>
                    {values.stages.map(({ id }, index) => (
                      <Stack direction="row" spacing={1} key={id}>
                        <Field
                          name={`stages.${index}.name`}
                          label={`${messages.stageLabel} ${index + 1}`}
                          autoFocus={index === values.stages.length - 1}
                          color="warning"
                          component={AppInput}
                        />
                        <Box display="flex" alignSelf="flex-start">
                          <IconButton
                            aria-label={messages.deleteText}
                            disableFocusRipple
                            sx={{ color: 'zen.silent' }}
                            onClick={() => remove(index)}
                          >
                            <AppIcon name="close" />
                          </IconButton>
                        </Box>
                      </Stack>
                    ))}
                    <ButtonCompact
                      size="small"
                      variant="outlined"
                      color="warning"
                      onClick={() => push({ id: crypto.randomUUID(), name: '' })}
                    >
                      + {messages.stageButtonText}
                    </ButtonCompact>
                  </>
                )}
              </FieldArray>
            </Stack>
            <FormControl variant="standard">
              <EmojiHeader name="clock" variant="h6" component="label">
                {messages.startHeader}
              </EmojiHeader>
              <RadioGroup
                name="started"
                value={values.started}
                aria-labelledby={messages.startLabelledby}
                row
                onChange={(e) => setFieldValue('started', e.target.value)}
              >
                <FormControlLabel
                  label={messages.todayLabel}
                  value={todayValue}
                  control={<Radio />}
                />
                <FormControlLabel
                  label={messages.tomorrowLabel}
                  value={tomorrowValue}
                  control={<Radio />}
                />
              </RadioGroup>
            </FormControl>
            <Stack spacing={2}>
              <EmojiHeader name="task" variant="h6" component="h4" color="primary">
                {messages.tasksHeader}
              </EmojiHeader>
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
                      size="small"
                      variant="outlined"
                      startIcon={<AppIcon name="add" />}
                      onClick={() => push({ id: crypto.randomUUID(), name: '', date: undefined })}
                    >
                      {messages.addTaskText}
                    </ButtonCompact>
                  </>
                )}
              </FieldArray>
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

const ButtonCompact = styled(Button)({
  alignSelf: 'baseline',
})

export default GoalModal
