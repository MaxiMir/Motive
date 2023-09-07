import {
  Box,
  Button,
  FormControl,
  Stack,
  Typography,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { styled } from '@mui/system'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { useId } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useDetectMobile } from 'entities/device'
import { TaskField } from 'entities/task'
import { FRONTEND_ID } from 'shared/config'
import { useFocus } from 'shared/lib/hooks'
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
  const mobile = useDetectMobile()
  const [hashtagsRef, setHashtagsFocus] = useFocus()
  const form = useCreateGoalForm(onClose)
  const spheres = useSpheresList()
  const { isSubmitting, values, touched, errors, setFieldValue, handleSubmit } = form
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
  const tasksHeader = formatMessage({ id: 'common.days-tasks' })
  const addTaskText = formatMessage({ id: 'common.task-add' })
  const deleteText = formatMessage({ id: 'common.delete' })
  const sphereError = Boolean(errors.sphere && touched.sphere)

  const onAddHashtag = () => {
    setFieldValue('hashtags', !values.hashtags ? '#' : `${values.hashtags} #`)
    setHashtagsFocus()
  }

  const onChangeSphere = (e: SelectChangeEvent) => {
    setFieldValue('sphere', e.target.value)
  }

  const onChangeDate = (date: Date | null) => {
    if (!date) return

    setFieldValue('started', date)
  }

  return (
    <Modal
      title={title}
      maxWidth="xs"
      fullScreen={mobile}
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
            <StyledFormControl fullWidth>
              <InputLabel id={sphereLabelId}>{spheres.label}</InputLabel>
              <Select
                name="sphere"
                value={values.sphere}
                label={spheres.label}
                size="small"
                labelId={sphereLabelId}
                onChange={onChangeSphere}
              >
                {spheres.list.map(({ name, icon, value }) => (
                  <MenuItem value={value} key={name}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Icon name={icon} fontSize={16} />
                      {name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={sphereError}>{errors.sphere}</FormHelperText>
            </StyledFormControl>
            <DatePicker
              label={startHeader}
              value={values.started}
              disablePast
              views={['day']}
              renderInput={(inputProps) => (
                <TextField size="small" {...inputProps} variant="outlined" />
              )}
              onChange={onChangeDate}
            />
            <Stack gap={1}>
              <Stack direction="row" alignItems="center" gap={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Icon name="rocket_launch" color="primary.dark" />
                  <Typography variant="h6" component="p">
                    {stagesHeader}
                  </Typography>
                </Box>
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
                            <Icon name="delete" />
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
            <Stack gap={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <Icon name="assignment" color="error.light" />
                <Typography variant="h6" component="p">
                  {tasksHeader}
                </Typography>
              </Box>
              <FieldArray name="tasks">
                {({ push, remove }) => (
                  <>
                    {values.tasks.map((task, index) => (
                      <TaskField
                        task={task}
                        date={values.started}
                        index={index}
                        taskCount={values.tasks.length}
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
  '& [data-shrink=false]': {
    top: -7,
  },
})

export default CreateGoalModal
