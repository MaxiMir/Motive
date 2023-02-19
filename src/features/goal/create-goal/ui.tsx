import {
  Box,
  Button,
  FormControl,
  Stack,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import dynamic from 'next/dynamic'
import { TaskField } from 'entities/task'
import { useFocus } from 'shared/lib/hooks'
import { getMidnightISO, getTomorrowISO } from 'shared/lib/utils'
import CancelButton from 'shared/ui/CancelButton'
import Icon from 'shared/ui/Icon'
import Input from 'shared/ui/Input'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useMessages } from './lib'
import { useCreateGoalForm } from './model'

const IconButton = dynamic(() => import('@mui/material/IconButton'))

interface CreateGoalModalProps {
  onClose: () => void
}

function CreateGoalModal({ onClose }: CreateGoalModalProps) {
  const messages = useMessages()
  const [hashtagsRef, setHashtagsFocus] = useFocus()
  const form = useCreateGoalForm(onClose)
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
          emoji="💎"
          key="submit"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form>
          <Stack gap={2}>
            <Field name="name" label={messages.nameLabel} required component={Input} />
            <Stack gap={1}>
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
            <Stack gap={1}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h6" component="p">
                  🚀 {messages.stagesHeader}
                </Typography>
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
                      <Stack direction="row" gap={1} key={id}>
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
              <Typography variant="h6" component="label">
                🕰 {messages.startHeader}
              </Typography>
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
            <Stack gap={2}>
              <Typography variant="h6" component="p">
                📌 {messages.tasksHeader}
              </Typography>
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

export default CreateGoalModal
