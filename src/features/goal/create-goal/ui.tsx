import {
  Box,
  Button,
  FormControl,
  Stack,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material'
import { styled } from '@mui/system'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { useIntl } from 'react-intl'
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
import { useCreateGoalForm } from './model'

const IconButton = dynamic(() => import('@mui/material/IconButton'))

interface CreateGoalModalProps {
  onClose: () => void
}

function CreateGoalModal({ onClose }: CreateGoalModalProps) {
  const { formatMessage } = useIntl()
  const [hashtagsRef, setHashtagsFocus] = useFocus()
  const form = useCreateGoalForm(onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const todayValue = getMidnightISO()
  const tomorrowValue = getTomorrowISO()
  const disabledHashtag = values.hashtags.endsWith('#')
  const title = formatMessage({ id: 'page.user.modal-goal.title' })
  const nameLabel = formatMessage({ id: 'page.user.modal-goal.name' })
  const hashtagText = formatMessage({ id: 'page.user.modal-goal.hashtag' })
  const hashtagsLabel = formatMessage({ id: 'page.user.modal-goal.hashtags' })
  const buttonText = formatMessage({ id: 'common.create' })
  const loadingText = formatMessage({ id: 'common.creating' })
  const stagesHeader = formatMessage({ id: 'page.user.modal-goal.stages' })
  const stageLabel = formatMessage({ id: 'page.user.modal-goal.stage' })
  const stageButtonText = formatMessage({ id: 'page.user.modal-goal.stage-button' })
  const stageHint = formatMessage({ id: 'page.user.modal-goal.stage-hint' })
  const startHeader = formatMessage({ id: 'page.user.modal-goal.start' })
  const startLabelledby = formatMessage({ id: 'page.user.modal-goal.start-labelledby' })
  const todayLabel = formatMessage({ id: 'common.today' })
  const tomorrowLabel = formatMessage({ id: 'common.tomorrow' })
  const tasksHeader = formatMessage({ id: 'page.user.modal-goal.tasks-header' })
  const addTaskText = formatMessage({ id: 'common.task-add' })
  const deleteText = formatMessage({ id: 'common.delete' })

  const onAddHashtag = () => {
    setFieldValue('hashtags', !values.hashtags ? '#' : `${values.hashtags} #`)
    setHashtagsFocus()
  }

  return (
    <Modal
      title={title}
      maxWidth="xs"
      actions={[
        <CancelButton key="cancel" onClick={onClose} />,
        <SubmitButton
          disabled={isSubmitting}
          text={buttonText}
          loadingText={loadingText}
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
            <Field name="name" label={nameLabel} required component={Input} />
            <Stack gap={1}>
              <Field
                name="hashtags"
                color="secondary"
                label={hashtagsLabel}
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
                # {hashtagText}
              </ButtonCompact>
            </Stack>
            <Stack gap={1}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h6" component="p">
                  <Icon name="rocket_launch" color="primary.dark" /> {stagesHeader}
                </Typography>
                <TooltipArrow title={stageHint}>
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
                          label={`${stageLabel} ${index + 1}`}
                          autoFocus={index === values.stages.length - 1}
                          color="warning"
                          component={Input}
                        />
                        <Box display="flex" alignSelf="flex-start">
                          <IconButton
                            aria-label={deleteText}
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
                      + {stageButtonText}
                    </ButtonCompact>
                  </>
                )}
              </FieldArray>
            </Stack>
            <FormControl variant="standard">
              <Typography variant="h6" component="label">
                {startHeader}
              </Typography>
              <RadioGroup
                name="started"
                value={values.started}
                aria-labelledby={startLabelledby}
                row
                onChange={(e) => setFieldValue('started', e.target.value)}
              >
                <FormControlLabel label={todayLabel} value={todayValue} control={<Radio />} />
                <FormControlLabel label={tomorrowLabel} value={tomorrowValue} control={<Radio />} />
              </RadioGroup>
            </FormControl>
            <Stack gap={2}>
              <Typography variant="h6" component="p">
                <Icon name="keep_public" color="error.dark" /> {tasksHeader}
              </Typography>
              <FieldArray name="tasks">
                {({ push, remove }) => (
                  <>
                    {values.tasks.map(({ key, date }, index) => (
                      <TaskField
                        taskCount={values.tasks.length}
                        date={values.started}
                        remind={date}
                        index={index}
                        key={key}
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
                      {addTaskText}
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
