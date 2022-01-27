import dynamic from 'next/dynamic'
import { Field, Form, FormikProvider } from 'formik'
import { IconButton, makeStyles } from '@material-ui/core'
import { TopicDto, UserBaseDto } from 'dto'
import UserAvatar from 'components/User/tmpl/UserAvatar'
import AppBox from 'components/UI/AppBox'
import AppInput from 'components/UI/AppInput'
import useForm from './hook'

const CircularProgress = dynamic(() => import('@material-ui/core/CircularProgress'))
const AppIcon = dynamic(() => import('components/UI/AppIcon'))

export interface UserInputProps {
  tmpl: 'input'
  dayId: number
  user: UserBaseDto
  answer?: boolean
  onAdd: (topic: TopicDto) => void
}

export default function UserInput({ dayId, user, answer, onAdd }: UserInputProps): JSX.Element {
  const classes = useStyles()
  const messageType = answer ? 'Answer' : 'Question'
  const { isLoading, formik } = useForm(dayId, answer, messageType, onAdd)
  const { values, handleSubmit } = formik

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off">
        <AppBox spacing={2} flex={1} mb={2} pr={2}>
          <UserAvatar tmpl="avatar" user={user} size={32} />
          <Field
            name="message"
            placeholder={`Your ${messageType.toLowerCase()}`}
            variant="standard"
            color="secondary"
            InputLabelProps={{ shrink: false }}
            disabled={isLoading}
            className={classes.input}
            component={AppInput}
          />
          <IconButton
            type="submit"
            className={classes.button}
            disabled={isLoading || !values.message}
            onClick={() => handleSubmit()}
          >
            {!isLoading ? (
              <AppIcon name="send" className={classes.icon} />
            ) : (
              <CircularProgress size="0.9rem" color="primary" />
            )}
          </IconButton>
        </AppBox>
      </Form>
    </FormikProvider>
  )
}

const useStyles = makeStyles({
  input: {
    flex: 1,
  },
  button: {
    width: 40,
    height: 40,
  },
  icon: {
    paddingLeft: '3px',
  },
})
