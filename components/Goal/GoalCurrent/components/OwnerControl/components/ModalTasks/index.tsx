import { FieldArray, Form, FormikProvider } from 'formik'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { GoalDto } from 'dto'
import useLocale from 'hooks/useLocale'
import { getToday, getTomorrow } from 'helpers/date'
import AppIcon from 'components/ui/AppIcon'
import AppTitle from 'components/ui/AppTitle'
import { PaulIcon } from 'components/ui/icons'
import AppModal from 'components/ui/AppModal'
import ActionSubmit from 'components/Action/ActionSubmit'
import ActionClose from 'components/Action/ActionClose'
import OptionalTooltip from 'components/OptionalTooltip'
import TaskField from 'components/Task/TaskField'
import OldPittRules from 'components/OldPitt/OldPittRules'
import useForm from './hook'
import i18n from './i18n'

export interface ModalTasksProps {
  goal: GoalDto
  onClose: () => void
}

export default function ModalTasks({ goal, onClose }: ModalTasksProps) {
  const { locale } = useLocale()
  const form = useForm(goal, onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const todayValue = getToday().toISOString()
  const tomorrowValue = getTomorrow().toISOString()
  const todayDisabled = todayValue === goal.day.date
  const {
    title,
    subtitle,
    addTask,
    button,
    buttonLoading,
    doIt,
    doItLabelledby,
    today,
    tomorrow,
    pitt,
    pittAria,
    tooltipToday,
  } = i18n[locale]

  return (
    <AppModal
      title={
        <>
          {title}{' '}
          <Box component="span" sx={{ color: 'zen.sand' }}>
            {subtitle}
          </Box>
        </>
      }
      maxWidth="xs"
      actions={[
        <ActionClose onClick={onClose} />,
        <ActionSubmit
          isLoading={isSubmitting}
          name={button}
          nameLoading={buttonLoading}
          emoji="task"
          onClick={handleSubmit}
        />,
      ]}
      onClose={onClose}
    >
      <Box display="flex" flexDirection="column" gap={3}>
        <FormikProvider value={form}>
          <Form autoComplete="off">
            <Box display="flex" flexDirection="column" gap={3}>
              <Box>
                <FieldArray name="tasks">
                  {({ push, remove }) => (
                    <>
                      {values.tasks.map((task, index) => (
                        <TaskField
                          index={index}
                          taskCount={values.tasks.length}
                          date={task.date}
                          locale={locale}
                          key={`tasks.${index}`}
                          onRemove={() => remove(index)}
                          onToggleDate={(isChecked) =>
                            setFieldValue(`tasks.${index}.date`, isChecked ? values.date : undefined)
                          }
                        />
                      ))}
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ alignSelf: 'baseline', textTransform: 'none' }}
                        onClick={() => push({ name: '', date: undefined })}
                      >
                        {addTask}
                      </Button>
                    </>
                  )}
                </FieldArray>
              </Box>
              <FormControl variant="standard">
                <AppTitle name="clock" variant="h6" component="label">
                  {doIt}
                </AppTitle>
                <RadioGroup
                  name="date"
                  value={values.date}
                  aria-labelledby={doItLabelledby}
                  row
                  onChange={(e) => setFieldValue('date', e.target.value)}
                >
                  <OptionalTooltip tmpl="custom" custom={tooltipToday} wrap={todayDisabled} followCursor>
                    <FormControlLabel label={today} value={todayValue} disabled={todayDisabled} control={<Radio />} />
                  </OptionalTooltip>
                  <FormControlLabel label={tomorrow} value={tomorrowValue} control={<Radio />} />
                </RadioGroup>
              </FormControl>
            </Box>
          </Form>
        </FormikProvider>
        <Accordion>
          <AccordionSummary expandIcon={<AppIcon name="expand_more" />} aria-controls={pittAria} id="old-pitt-note">
            <Box display="flex" alignItems="center" gap={1}>
              <PaulIcon />
              <Typography variant="h6" component="h3">
                {pitt}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <OldPittRules />
          </AccordionDetails>
        </Accordion>
      </Box>
    </AppModal>
  )
}