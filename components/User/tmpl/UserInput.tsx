import { useState } from 'react'
import dynamic from 'next/dynamic'
import { IconButton, makeStyles, TextField } from '@material-ui/core'
import { TopicDto, TopicType, UserBaseDto } from 'dto'
import DayService from 'services/DayService'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import UserAvatar from 'components/User/tmpl/UserAvatar'
import AppBox from 'components/UI/AppBox'

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
  const [message, setMessage] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const messageType = answer ? 'Answer' : 'Question'

  const { isLoading, send } = useSend(DayService.createTopic, {
    onSuccess(response) {
      enqueueSnackbar({ message: `${messageType} added`, severity: 'success', icon: 'speaker' })
      setMessage('')
      onAdd(response)
    },
  })

  const onClick = () => send({ id: dayId, message, type: answer ? TopicType.SUPPORT : TopicType.QUESTION })

  return (
    <form>
      <AppBox spacing={2} flex={1} mb={2} pr={2}>
        <UserAvatar tmpl="avatar" user={user} size={32} />
        <TextField
          placeholder={`Your ${messageType.toLowerCase()}`}
          variant="standard"
          color="secondary"
          InputLabelProps={{ shrink: false }}
          value={message}
          disabled={isLoading}
          className={classes.input}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton className={classes.button} disabled={isLoading || !message} onClick={onClick}>
          {!isLoading ? (
            <AppIcon name="send" className={classes.icon} />
          ) : (
            <CircularProgress size="0.9rem" color="primary" />
          )}
        </IconButton>
      </AppBox>
    </form>
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
