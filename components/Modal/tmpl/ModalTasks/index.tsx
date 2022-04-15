import { FieldArray, Form, FormikProvider } from 'formik'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Typography } from '@mui/material'
import { GoalDto, MainCharacteristicName } from 'dto'
import useLocale from 'hooks/useLocale'
import AppIcon from 'components/UI/AppIcon'
import { PaulIcon } from 'components/UI/icons'
import AppDecorEmoji from 'components/UI/AppDecorEmoji'
import AppModal from 'components/UI/AppModal'
import Action from 'components/Action'
import Task from 'components/Task'
import useForm from './hook'
import i18n from './i18n'

const CHARACTERISTIC_NAMES: MainCharacteristicName[] = ['motivation', 'creativity', 'support']

export interface ModalTasksProps {
  tmpl: 'tasks'
  goal: GoalDto
  onClose: () => void
}

export default function ModalTasks({ goal, onClose }: ModalTasksProps): JSX.Element {
  const { locale } = useLocale()
  const form = useForm(goal, onClose)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const { title, subtitle, addTask, button, buttonLoading, pitt, pittAria, pittHints } = i18n[locale]

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
        <Action tmpl="close" onClick={onClose} />,
        <Action
          tmpl="submit"
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
            <Typography color="gray">
              {pittHints[0]}.
              <br />
              {pittHints[1]} <AppDecorEmoji name="web" />.
              <br />
              {pittHints[2]} <AppDecorEmoji name="blood" />.
              <br />
              {pittHints[3]}{' '}
              {CHARACTERISTIC_NAMES.map((characteristic) => (
                <AppDecorEmoji name={characteristic} key={characteristic} />
              ))}
              {pittHints[4]}.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </AppModal>
  )
}
