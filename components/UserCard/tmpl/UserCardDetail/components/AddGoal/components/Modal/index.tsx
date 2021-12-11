import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Field, FieldArray, Form, FormikProvider, useFormik } from 'formik'
import { addDays } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import { Accordion, AccordionDetails, AccordionSummary, Button, createStyles } from '@material-ui/core'
import { Goal, GoalCreation } from 'dto'
import GoalService from 'services/GoalService'
import useSend from 'hooks/useSend'
import useFocus from 'hooks/useFocus'
import AppModal from 'components/UI/AppModal'
import AppHeader from 'components/UI/AppHeader'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppTypography from 'components/UI/AppTypography'
import AppIcon from 'components/UI/AppIcon'
import { PaulIcon } from 'components/UI/icons'
import { schema } from './helper'
import SubmitButton from './components/SubmitButton'
import CloseButton from './components/CloseButton'

const TaskField = dynamic(() => import('./components/TaskField'))

interface ModalProps {
  onSuccess: (goal: Goal) => void
  onClose: () => void
}

// TODO: focus error fields
export default function Modal({ onSuccess, onClose }: ModalProps): JSX.Element {
  const classes = useStyles()
  const [hashtagsRef, setHashtagsFocus] = useFocus()
  const tomorrow = useMemo(() => addDays(new Date(), 1), [])
  const { isLoading, send } = useSend<GoalCreation, Goal>(GoalService.create, { onSuccess })
  const formik = useFormik({
    initialValues: {
      name: '',
      hashtags: '',
      tasks: [{ name: '', date: undefined }],
    },
    validationSchema: schema,
    async onSubmit(data) {
      send(data)
    },
  })
  const { values, setFieldValue, handleSubmit } = formik

  const onAddHashtag = () => {
    setFieldValue('hashtags', !values.hashtags ? '#' : [values.hashtags, '#'].join(' '))
    setHashtagsFocus()
  }

  return (
    <AppModal
      title="Creating a new goal"
      actions={[<CloseButton onClick={onClose} />, <SubmitButton isLoading={isLoading} onClick={handleSubmit} />]}
      onClose={onClose}
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off">
          <AppBox flexDirection="column" spacing={3}>
            <Field name="name" label="Name *" color="secondary" component={AppInput} />
            <AppBox flexDirection="column" spacing={1}>
              <Field
                name="hashtags"
                label="Hashtags"
                color="secondary"
                multiline
                rows={2}
                inputRef={hashtagsRef}
                component={AppInput}
              />
              <Button className={classes.button} variant="outlined" size="small" onClick={onAddHashtag}>
                # Hashtag
              </Button>
            </AppBox>
            <FieldArray name="tasks">
              {({ push, remove }) => (
                <AppBox flexDirection="column" spacing={2}>
                  <AppHeader name="task" variant="h6" component="h2" color="primary">
                    Tasks for tomorrow
                  </AppHeader>
                  {values.tasks.map((task, index) => (
                    <TaskField
                      index={index}
                      taskCount={values.tasks.length}
                      date={task.date}
                      key={`tasks.${index}`}
                      onRemove={() => remove(index)}
                      onToggleDate={(isChecked) =>
                        setFieldValue(`tasks.${index}.date`, isChecked ? tomorrow : undefined)
                      }
                    />
                  ))}
                  <Button
                    startIcon={<AppIcon color="secondary">add</AppIcon>}
                    className={classes.button}
                    onClick={() => push({ name: '', date: undefined })}
                  >
                    <AppTypography color="secondary">add task</AppTypography>
                  </Button>
                </AppBox>
              )}
            </FieldArray>
            <AppBox flexDirection="column" spacing={2}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<AppIcon color="primary">expand_more</AppIcon>}
                  aria-controls="old-pitt-note"
                  id="old-pitt-note"
                >
                  <AppBox alignItems="center" spacing={1}>
                    <PaulIcon />
                    <AppTypography variant="h6" component="h3" color="primary">
                      Remember Old Pitt!
                    </AppTypography>
                  </AppBox>
                </AccordionSummary>
                <AccordionDetails>
                  <AppTypography className={classes.hint}>
                    He hunts for abandoned goals.
                    <br />
                    On the 14th day they get covered with 🕸.
                    <br />
                    On the 28th day he eats them.
                    <br />
                    And people have to start all over again.
                  </AppTypography>
                </AccordionDetails>
              </Accordion>
            </AppBox>
          </AppBox>
        </Form>
      </FormikProvider>
    </AppModal>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      alignSelf: 'baseline',
      textTransform: 'none',
    },
    hint: {
      fontSize: '0.9rem',
      color: theme.text.silent,
    },
  }),
)
