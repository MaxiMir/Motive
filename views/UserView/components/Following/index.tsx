import clsx from 'clsx'
import { makeStyles, IconButton } from '@material-ui/core'
import AppEmoji from 'components/UI/AppEmoji'
import useSetFollowing from './hook'

interface FollowingProps {
  id: number
  following: boolean
}

export default function Following({ id, following }: FollowingProps): JSX.Element {
  const classes = useStyles()
  const setFollowing = useSetFollowing(id, following)

  return (
    <IconButton title={`${following ? 'Remove' : 'Add'} following`} className={classes.button} onClick={setFollowing}>
      <AppEmoji name="following" variant="h5" className={clsx([classes.emoji, !following && classes.emojiNotActive])} />
    </IconButton>
  )
}

const useStyles = makeStyles({
  button: {
    height: 48,
  },
  emoji: {
    lineHeight: '28px',
  },
  emojiNotActive: {
    filter: 'grayscale(1)',
  },
})
