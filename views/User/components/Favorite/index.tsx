import React from 'react'
import clsx from 'clsx'
import { makeStyles, IconButton } from '@material-ui/core'
import AppEmoji from 'components/UI/AppEmoji'
import useUserFollowing from './hook'

interface FavoriteProps {
  id: number
  isFollowing: boolean
  isAuthorized: boolean
}

export default function Favorite({ id, isFollowing: initial, isAuthorized }: FavoriteProps): JSX.Element {
  const classes = useStyles()
  const [isFollowing, setIsFollowing] = useUserFollowing(id, initial, isAuthorized)

  return (
    <IconButton title={`${isFollowing ? 'Remove from' : 'Add to'} favorite`} onClick={setIsFollowing}>
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
