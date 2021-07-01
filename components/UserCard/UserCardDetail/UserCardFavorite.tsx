import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import AppEmoji from 'components/UI/AppEmoji'

interface UserCardFavoriteProps {
  isFavorite: boolean
}

const UserCardFavorite = ({ isFavorite: initial }: UserCardFavoriteProps): JSX.Element => {
  const [isFavorite, setIsFavorite] = useState(initial)
  const classes = useStyles()

  return (
    <IconButton title={`${isFavorite ? 'remove from' : 'add to'} favorite`} onClick={() => setIsFavorite(!isFavorite)}>
      <AppEmoji name={!isFavorite ? 'favorite' : 'favorite-active'} variant="h5" className={classes.emoji} />
    </IconButton>
  )
}

const useStyles = makeStyles({
  emoji: {
    lineHeight: '28px',
  },
})

export default UserCardFavorite
