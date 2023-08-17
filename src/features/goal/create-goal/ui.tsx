import {
  Box,
  Button,
  FormControl,
  Stack,
  Typography,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  RadioGroup,
  Radio,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { styled } from '@mui/system'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { useId } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { TaskField } from 'entities/task'
import { FRONTEND_ID } from 'shared/config'
import { useFocus } from 'shared/lib/hooks'
import { getMidnightISO, getTomorrowISO } from 'shared/lib/utils'
import CancelButton from 'shared/ui/CancelButton'
import Icon from 'shared/ui/Icon'
import Input from 'shared/ui/Input'
import Modal from 'shared/ui/Modal'
import SubmitButton from 'shared/ui/SubmitButton'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useSpheresList } from './lib'
import { useCreateGoalForm } from './model'

const IconButton = dynamic(() => import('@mui/material/IconButton'))

interface CreateGoalModalProps {
  onClose: () => void
}

function CreateGoalModal({ onClose }: CreateGoalModalProps) {
  const sphereLabelId = useId()
  const { formatMessage } = useIntl()
  const [hashtagsRef, setHashtagsFocus] = useFocus()
  const form = useCreateGoalForm(onClose)
  const spheres = useSpheresList()
  const { isSubmitting, values, errors, setFieldValue, handleSubmit } = form
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
  const sphereError = Boolean(errors.sphere)

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
          text={buttonText}
          loadingText={loadingText}
          isLoading={isSubmitting}
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
                disabled={disabledHashtag}
                onClick={onAddHashtag}
              >
                # {hashtagText}
              </ButtonCompact>
            </Stack>
            <StyledFormControl fullWidth error={sphereError}>
              <InputLabel id={sphereLabelId}>{spheres.label}</InputLabel>
              <Select
                name="sphere"
                value={values.sphere}
                label={spheres.label}
                size="small"
                labelId={sphereLabelId}
                onChange={(e: SelectChangeEvent) => setFieldValue('sphere', e.target.value)}
              >
                {spheres.list.map(({ name, icon, value }) => (
                  <MenuItem value={value} key={name}>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      sx={{ '& span': { fontSize: 16 } }}
                    >
                      <Icon name={icon} />
                      {name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.sphere}</FormHelperText>
            </StyledFormControl>
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
                    {values.stages.map((stage, index) => (
                      <Stack direction="row" gap={1} key={stage[FRONTEND_ID]}>
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
                      onClick={() => push({ [FRONTEND_ID]: crypto.randomUUID(), name: '' })}
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
                    {values.tasks.map((task, index) => (
                      <TaskField
                        taskCount={values.tasks.length}
                        date={values.started}
                        remind={task.date}
                        index={index}
                        key={task[FRONTEND_ID]}
                        setFieldValue={setFieldValue}
                        onRemove={() => remove(index)}
                      />
                    ))}
                    <ButtonCompact
                      size="small"
                      variant="outlined"
                      startIcon={<Icon name="add" />}
                      onClick={() => {
                        push({ [FRONTEND_ID]: crypto.randomUUID(), name: '', date: undefined })
                      }}
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

const StyledFormControl = styled(FormControl)({
  marginTop: 8,
  '& label': {
    top: -7,
  },
})

export default CreateGoalModal
