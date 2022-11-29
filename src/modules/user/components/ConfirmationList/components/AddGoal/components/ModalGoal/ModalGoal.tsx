import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider } from 'formik'
import { v4 as uuidV4 } from 'uuid'
import { useIntl } from 'react-intl'
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
import useFocus from '@hooks/useFocus'
import { getToday, getTomorrow } from '@utils/date'
import AppModal from '@ui/AppModal'
import AppHeader from '@ui/AppHeader'
import AppInput from '@ui/AppInput'
import AppIcon from '@ui/AppIcon'
import AppDot from '@ui/AppDot'
import ActionSubmit from '@components/Action/ActionSubmit'
import ActionCancel from '@components/Action/ActionCancel'
import TaskField from '@components/Task/TaskField'
import useForm from './hook'

const AppIconButton = dynamic(() => import('@ui/AppIconButton'))

interface ModalGoalProps {
  onClose: () => void
}

export default function ModalGoal({ onClose }: ModalGoalProps) {
  const { formatMessage } = useIntl()
  const [hashtagsRef, setHashtagsFocus] = useFocus()
  const form = useForm(onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const todayValue = getToday().toISOString()
  const tomorrowValue = getTomorrow().toISOString()
  const title = formatMessage({ id: 'page.user.modal-goal.title' })
  const nameLabel = formatMessage({ id: 'page.user.modal-goal.name' })
  const hashtagText = formatMessage({ id: 'page.user.modal-goal.hashtag' })
  const hashtagsLabel = formatMessage({ id: 'page.user.modal-goal.hashtags' })
  const buttonText = formatMessage({ id: 'common.create' })
  const loadingText = formatMessage({ id: 'common.creating' })
  const stagesHeader = formatMessage({ id: 'page.user.modal-goal.stages' })
  const stageLabel = formatMessage({ id: 'page.user.modal-goal.stage' })
  const stageButtonText = formatMessage({ id: 'page.user.modal-goal.stage-button' })
  const stageHintStart = formatMessage({ id: 'page.user.modal-goal.stage-hint-start' })
  const stageHintEnd = formatMessage({ id: 'page.user.modal-goal.stage-hint-end' })
  const startHeader = formatMessage({ id: 'page.user.modal-goal.start' })
  const startLabelledby = formatMessage({ id: 'page.user.modal-goal.start-labelledby' })
  const todayLabel = formatMessage({ id: 'common.today' })
  const tomorrowLabel = formatMessage({ id: 'common.tomorrow' })
  const tasksHeader = formatMessage({ id: 'page.user.modal-goal.tasks-header' })
  const addTaskText = formatMessage({ id: 'common.task-add' })

  const onAddHashtag = () => {
    setFieldValue('hashtags', !values.hashtags ? '#' : `${values.hashtags} #`)
    setHashtagsFocus()
  }

  return (
    <AppModal
      title={title}
      maxWidth="xs"
      actions={[
        <ActionCancel onClick={onClose} />,
        <ActionSubmit
          disabled={isSubmitting}
          text={buttonText}
          loadingText={loadingText}
          emoji="goal"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <FormikProvider value={form}>
        <Form autoComplete="off">
          <Box display="flex" flexDirection="column" gap={2}>
            <Field name="name" label={nameLabel} component={AppInput} />
            <Box display="flex" flexDirection="column" gap={1}>
              <Field
                name="hashtags"
                color="secondary"
                label={hashtagsLabel}
                inputRef={hashtagsRef}
                component={AppInput}
              />
              <ButtonCompact variant="outlined" color="secondary" size="small" onClick={onAddHashtag}>
                # {hashtagText}
              </ButtonCompact>
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" gap={1}>
                <AppHeader name="stage" variant="h6" component="h4" color="primary">
                  {stagesHeader}
                </AppHeader>
                <Tooltip
                  title={
                    <>
                      <Typography>{stageHintStart}.</Typography>
                      <Typography>{stageHintEnd}.</Typography>
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
                    {values.stages.map(({ id }, index) => (
                      <Box display="flex" gap={1} key={id}>
                        <Box display="flex" height={40} alignItems="center" alignSelf="flex-start">
                          <AppDot size={10} />
                        </Box>
                        <Field
                          name={`stages.${index}.name`}
                          label={`${stageLabel} ${index + 1}`}
                          autoFocus={index === values.stages.length - 1}
                          color="warning"
                          component={AppInput}
                        />
                        <Box display="flex" alignSelf="flex-start">
                          <AppIconButton name="close" onClick={() => remove(index)} />
                        </Box>
                      </Box>
                    ))}
                    <ButtonCompact
                      variant="outlined"
                      color="warning"
                      size="small"
                      onClick={() => push({ id: uuidV4(), name: '' })}
                    >
                      + {stageButtonText}
                    </ButtonCompact>
                  </>
                )}
              </FieldArray>
            </Box>
            <FormControl variant="standard">
              <AppHeader name="clock" variant="h6" component="label">
                {startHeader}
              </AppHeader>
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
            <Box display="flex" flexDirection="column" gap={2}>
              <Box display="flex" gap={1}>
                <AppHeader name="task" variant="h6" component="h4" color="primary">
                  {tasksHeader}
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
                      {addTaskText}
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
