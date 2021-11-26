import React, { Fragment, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { object, string, array, SchemaOf } from 'yup'
import { Field, FieldArray, Form, FormikProvider, useFormik } from 'formik'
import { addDays } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import {
  Accordion,
  AccordionDetails,
  FormControlLabel,
  Switch,
  AccordionSummary,
  Button,
  IconButton,
  createStyles,
} from '@material-ui/core'
import { Goal, GoalCreation } from 'dto'
import GoalService from 'services/GoalService'
import useSend from 'hooks/useSend'
import useFocus from 'hooks/useFocus'
import AppModal from 'components/UI/AppModal'
import AppHeader from 'components/UI/AppHeader'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import AppTypography from 'components/UI/AppTypography'
import AppGradientButton from 'components/UI/AppGradientButton'
import AppIcon from 'components/UI/AppIcon'
import AppEmoji from 'components/UI/AppEmoji'
import { PaulIcon } from 'components/UI/icons'

const CircularProgress = dynamic(() => import('@material-ui/core/CircularProgress'))
const KeyboardTimePicker = dynamic(() =>
  import('formik-material-ui-pickers').then(
    (m) => m.KeyboardTimePicker,
    () => null as never,
  ),
)

interface ModalProps {
  onSuccess: (goal: Goal) => void
  onClose: () => void
}

const schema: SchemaOf<GoalCreation> = object({
  name: string().trim().required('Goal name needed').min(5, "It's too short.").max(35, "It's so long."),
  hashtags: string().trim().max(150, "It's so long."),
  tasks: array().of(
    object({
      name: string().trim().required('Task content needed').min(5, "It's too short.").max(255, "It's too long."),
      date: string(),
    }),
  ),
})

// TODO: focus error fields
export default function Modal({ onSuccess, onClose }: ModalProps): JSX.Element {
  const classes = useStyles()
  const [hashtagsRef, setHashtagsFocus] = useFocus()
  const tomorrow = useMemo(() => addDays(new Date(), 1), [])
  const { isLoading, send } = useSend<GoalCreation, Goal>(GoalService.create, {
    onSuccess: (r) => onSuccess(r),
  })
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

  return (
    <AppModal
      title="Creating a new goal"
      actions={[
        <AppGradientButton startIcon={<AppEmoji name="cancel" onlyEmoji />} onClick={onClose}>
          Cancel
        </AppGradientButton>,
        <AppGradientButton
          type="submit"
          disabled={isLoading}
          startIcon={
            isLoading ? <CircularProgress size="0.9rem" color="primary" /> : <AppEmoji name="goal" onlyEmoji />
          }
          onClick={() => handleSubmit()}
        >
          {isLoading ? 'Creating' : 'Create'}
        </AppGradientButton>,
      ]}
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
              <Button
                className={classes.button}
                variant="outlined"
                size="small"
                onClick={() => {
                  setFieldValue('hashtags', !values.hashtags ? '#' : [values.hashtags, '#'].join(' '))
                  setHashtagsFocus()
                }}
              >
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
                    <Fragment key={`tasks.${index}`}>
                      <AppBox alignItems="center" spacing={1}>
                        <Field
                          name={`tasks.${index}.name`}
                          label="Task *"
                          color="secondary"
                          placeholder="What should be done"
                          multiline
                          rows={3}
                          component={AppInput}
                          autoFocus={!!index && index === values.tasks.length - 1}
                        />
                        <IconButton
                          disableFocusRipple
                          aria-label="remove task"
                          disabled={values.tasks.length === 1}
                          onClick={() => remove(index)}
                          className={classes.iconCloseBtn}
                        >
                          <AppIcon>close</AppIcon>
                        </IconButton>
                      </AppBox>
                      <AppBox height={48} alignItems="center" pl={1} spacing={1}>
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              onChange={(_, isChecked) =>
                                setFieldValue(`tasks.${index}.date`, isChecked ? tomorrow : undefined)
                              }
                            />
                          }
                          label="remind me"
                        />
                        {task.date && (
                          <Field
                            name={`tasks.${index}.date`}
                            ampm={false}
                            className={classes.timepicker}
                            keyboardIcon={<span className="material-icons">query_builder</span>}
                            component={KeyboardTimePicker}
                          />
                        )}
                      </AppBox>
                    </Fragment>
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
    timepicker: {
      width: 100,
    },
    iconCloseBtn: {
      color: theme.text.silent,
    },
  }),
)
