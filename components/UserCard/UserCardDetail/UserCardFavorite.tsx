import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { UserDetail } from 'dto'
import ROUTE from 'route'
import useDebounceCb from 'hooks/useDebounceCb'
import useSend from 'hooks/useSend'
import { useSnackbar } from 'hooks/useSnackbar'
import AppEmoji from 'components/UI/AppEmoji'

type UserCardFavoriteProps = Pick<UserDetail, 'id' | 'favorite'>

const UserCardFavorite = ({ id, favorite: initial }: UserCardFavoriteProps): JSX.Element => {
  const url = ROUTE.getUserFavorite(id)
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()
  const [isFavorite, setIsFavorite] = useState(initial)
  const { send } = useSend({
    onSuccess() {
      enqueueSnackbar({ message: isFavorite ? 'Added to favorites' : 'Removed from favorites', severity: 'success' })
    },
    onError(_, favorite) {
      setIsFavorite(!favorite)
      enqueueSnackbar({ message: 'Something went wrong...', severity: 'error' })
    },
  })

  const mutateWithDebounce = useDebounceCb((data: boolean) => send({ url, method: 'put', data }), 500)

  const onClick = () => {
    setIsFavorite(!isFavorite)
    mutateWithDebounce(!isFavorite)
  }

  return (
    <IconButton title={`${isFavorite ? 'Remove from' : 'Add to'} favorite`} onClick={onClick}>
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
