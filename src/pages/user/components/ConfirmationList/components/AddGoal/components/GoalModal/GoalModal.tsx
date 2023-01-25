import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { Box, Button, FormControl, Stack, FormControlLabel, RadioGroup, Radio } from '@mui/material'
import { styled } from '@mui/system'
import { getMidnightISO, getTomorrowISO } from '@shared/lib/utils/date'
import useFocus from '@shared/lib/hooks/useFocus'
import { TaskField } from '@entities/task'
import Modal from '@shared/ui/Modal'
import EmojiHeader from '@shared/ui/EmojiHeader'
import Input from '@shared/ui/Input'
import Icon from '@shared/ui/Icon'
import TooltipArrow from '@shared/ui/styled/TooltipArrow'
import SubmitButton from '@shared/ui/SubmitButton'
import CancelButton from '@shared/ui/CancelButton'
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
  const disabledHashtag = values.hashtags.endsWith('#')

  const onAddHashtag = () => {
    setFieldValue('hashtags', !values.hashtags ? '#' : `${values.hashtags} #`)
    setHashtagsFocus()
  }

  return (
    <Modal
      title={messages.title}
      maxWidth="xs"
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
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
            <Field name="name" label={messages.nameLabel} component={Input} />
            <Stack spacing={1}>
              <Field
                name="hashtags"
                color="secondary"
                label={messages.hashtagsLabel}
                inputRef={hashtagsRef}
                component={Input}
              />
              <ButtonCompact
                size="small"
                variant="outlined"
                color="secondary"
                disabled={disabledHashtag}
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
                    <Icon name="help_outline" />
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
                          component={Input}
                        />
                        <Box display="flex" alignSelf="flex-start">
                          <IconButton
                            aria-label={messages.deleteText}
                            disableFocusRipple
                            sx={{ color: 'zen.silent' }}
                            onClick={() => remove(index)}
                          >
                            <Icon name="close" />
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
                      startIcon={<Icon name="add" />}
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
    </Modal>
  )
}

const ButtonCompact = styled(Button)({
  alignSelf: 'baseline',
})

export default GoalModal
