import React from 'react'
import clsx from 'clsx'
import { makeStyles, IconButton } from '@material-ui/core'
import AppEmoji from 'components/UI/AppEmoji'
import useSetFollowing from './hook'

interface FollowingProps {
  id: number
  isFollowing: boolean
  isAuthorized: boolean
}

export default function Following({ id, isFollowing, isAuthorized }: FollowingProps): JSX.Element {
  const classes = useStyles()
  const setIsFollowing = useSetFollowing(id, isFollowing, isAuthorized)

  return (
    <IconButton title={`${isFollowing ? 'Remove' : 'Add'} following`} onClick={setIsFollowing}>
      <AppEmoji
        name="following"
        variant="h5"
        className={clsx([classes.emoji, !isFollowing && classes.emojiNotActive])}
      />
    </IconButton>
  )
}

const useStyles = makeStyles({
  emoji: {
    lineHeight: '28px',
  },
  emojiNotActive: {
    filter: 'grayscale(1)',
  },
})
