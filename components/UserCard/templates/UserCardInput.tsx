import { useState } from 'react'
import dynamic from 'next/dynamic'
import clsx from 'clsx'
import { Fade, TextField, makeStyles, IconButton } from '@material-ui/core'
import { UserBase } from 'dto'
import UserCardAvatar from 'components/UserCard/templates/UserCardAvatar'
import AppBox from 'components/UI/AppBox'

const AppSupportSign = dynamic(() => import('components/UI/AppSupportSign'))

export interface UserCardInputProps {
  type: 'input'
  user: UserBase
  answer?: boolean
}

export default function UserCardInput({ user, answer }: UserCardInputProps): JSX.Element {
  const [value, setValue] = useState('')
  const classes = useStyles()

  return (
    <AppBox spacing={2} flexGrow={1} pb={2}>
      <AppBox position="relative" height={40}>
        <UserCardAvatar type="avatar" {...user} size={40} />
        {answer && <AppSupportSign answer={answer} />}
      </AppBox>
      <TextField
        placeholder={`Your ${answer ? 'answer' : 'question'}`}
        variant="standard"
        color="secondary"
        InputLabelProps={{ shrink: false }}
        value={value}
        className={classes.input}
        onChange={(e) => setValue(e.target.value)}
      />
      <Fade in={!!value}>
        <IconButton className={classes.button}>
          <span className={clsx('material-icons', classes.icon)}>send</span>
        </IconButton>
      </Fade>
    </AppBox>
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
