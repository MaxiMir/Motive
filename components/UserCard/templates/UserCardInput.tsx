import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import clsx from 'clsx'
import { IconButton, makeStyles, TextField } from '@material-ui/core'
import { Topic, TopicType, UserBase } from 'dto'
import DayService from 'services/DayService'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import UserCardAvatar from 'components/UserCard/templates/UserCardAvatar'
import AppBox from 'components/UI/AppBox'

const CircularProgress = dynamic(() => import('@material-ui/core/CircularProgress'))

export interface UserCardInputProps {
  type: 'input'
  dayId: string
  user: UserBase
  answer?: boolean
  onAdd: (topic: Topic) => void
}

export default function UserCardInput({ dayId, user, answer, onAdd }: UserCardInputProps): JSX.Element {
  const classes = useStyles()
  const [message, setMessage] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const { isLoading, send } = useSend(DayService.createTopic, {
    onSuccess(topic) {
      enqueueSnackbar({ message: 'Question added', severity: 'success', icon: 'robot' })
      setMessage('')
      onAdd(topic)
    },
  })

  const onClick = () => send({ dayId, message, type: TopicType.QUESTION })

  return (
    <form>
      <AppBox spacing={2} flex={1} mb={2} height={56}>
        <AppBox width={40} height={40}>
          <UserCardAvatar type="avatar" {...user} size={40} />
        </AppBox>
        <TextField
          placeholder={`Your ${answer ? 'answer' : 'question'}`}
          variant="standard"
          color="secondary"
          InputLabelProps={{ shrink: false }}
          value={message}
          className={classes.input}
          disabled={isLoading}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton className={classes.button} disabled={isLoading || !message} onClick={onClick}>
          {isLoading ? (
            <CircularProgress size="0.9rem" color="primary" />
          ) : (
            <span className={clsx('material-icons', classes.icon)}>send</span>
          )}
        </IconButton>
      </AppBox>
    </form>
  )
}

const useStyles = makeStyles({
  input: {
    flexGrow: 1,
  },
  button: {
    width: 40,
    height: 40,
  },
  icon: {
    paddingLeft: '3px',
  },
})
