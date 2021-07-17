import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import useFavorite from 'hooks/useFavorite'
import { UserDetail } from 'dto'
import AppEmoji from 'components/UI/AppEmoji'
import AppSnackbar from 'components/UI/AppSnackbar'

type UserCardFavoriteProps = Pick<UserDetail, 'id' | 'isFavorite'>

const UserCardFavorite = ({ id, isFavorite: initial }: UserCardFavoriteProps): JSX.Element => {
  const [isFavorite, onChange] = useFavorite(id, initial)
  const [message, setMessage] = useState<string>()
  const classes = useStyles()

  const onClick = () => {
    onChange()
    setMessage(isFavorite ? 'Removed from favorites' : 'Added to favorites')
  }

  return (
    <>
      <IconButton title={`${isFavorite ? 'Remove from' : 'Add to'} favorite`} onClick={onClick}>
        <AppEmoji name={!isFavorite ? 'favorite' : 'favorite-active'} variant="h5" className={classes.emoji} />
      </IconButton>
      {message && (
        <AppSnackbar severity="success" autoHideDuration={3000} onClose={() => setMessage(undefined)}>
          {message}
        </AppSnackbar>
      )}
    </>
  )
}

const useStyles = makeStyles({
  emoji: {
    lineHeight: '28px',
  },
})

export default UserCardFavorite
