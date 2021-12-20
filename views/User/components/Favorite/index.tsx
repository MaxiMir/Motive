import React, { useMemo } from 'react'
import clsx from 'clsx'
import { makeStyles, IconButton } from '@material-ui/core'
import { UserBase } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'
import useUserFavorite from './hook'

interface FavoriteProps {
  clientId: number
  following: UserBase[]
  userId: number
}

export default function Favorite({ clientId, userId, following }: FavoriteProps): JSX.Element {
  const classes = useStyles()
  const initial = useMemo(checkOnFollowing, [clientId, following])
  const [isFollowing, setIsFollowing] = useUserFavorite(clientId, userId, initial)

  function checkOnFollowing() {
    return Boolean(clientId && following.some((f) => f.id === clientId))
  }

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
