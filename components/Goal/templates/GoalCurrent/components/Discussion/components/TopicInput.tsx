import { useState } from 'react'
import clsx from 'clsx'
import { Fade, TextField, makeStyles, IconButton } from '@material-ui/core'
import { UserBase } from 'dto'
import UserCard from 'components/UserCard'
import AppBox from 'components/UI/AppBox'

interface TopicInputProps {
  user: UserBase
}

export default function TopicInput({ user }: TopicInputProps): JSX.Element {
  const [value, setValue] = useState('')
  const classes = useStyles()

  return (
    <AppBox spacing={2} flexGrow={1} pb={2}>
      <UserCard type="avatar" {...user} size={40} />
      <TextField
        placeholder="Your question"
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
