import React from 'react'
import clsx from 'clsx'
import { makeStyles, IconButton } from '@material-ui/core'
import AppEmoji from 'components/UI/AppEmoji'
import useUserFavorite from './hook'

interface FavoriteProps {
  userId: number
  favorite: boolean
}

export default function Favorite({ userId, favorite: initial }: FavoriteProps): JSX.Element {
  const classes = useStyles()
  const [favorite, setFavorite] = useUserFavorite(userId, initial)
  // TODO modal for not register
  return (
    <IconButton title={`${favorite ? 'Remove from' : 'Add to'} favorite`} onClick={setFavorite}>
      <AppEmoji name="favorite" variant="h5" className={clsx([classes.emoji, !favorite && classes.emojiNotActive])} />
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
