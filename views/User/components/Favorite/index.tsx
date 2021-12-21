import React from 'react'
import clsx from 'clsx'
import { makeStyles, IconButton } from '@material-ui/core'
import AppEmoji from 'components/UI/AppEmoji'
import useUserFavorite from './hook'

interface FavoriteProps {
  clientId: number
  favorite: boolean
  userId: number
}

export default function Favorite({ clientId, userId, favorite: initial }: FavoriteProps): JSX.Element {
  const classes = useStyles()
  const [isFollowing, setIsFollowing] = useUserFavorite(clientId, userId, initial)

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
