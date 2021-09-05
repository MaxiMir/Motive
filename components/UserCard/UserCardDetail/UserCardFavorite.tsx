import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { UserDetail } from 'dto'
import ROUTE from 'route'
import Axios from 'lib/axios'
import useDebounceCb from 'hooks/useDebounceCb'
import { useSnackbar } from 'hooks/useSnackbar'
import AppEmoji from 'components/UI/AppEmoji'

type UserCardFavoriteProps = Pick<UserDetail, 'id' | 'favorite'>

const UserCardFavorite = ({ id, favorite: initial }: UserCardFavoriteProps): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()
  const [isFavorite, setIsFavorite] = useState(initial)
  const { mutate } = useMutation((favorite: boolean) => Axios.put(ROUTE.getUserFavorite(id), favorite), {
    onError(_, favorite) {
      setIsFavorite(!favorite)
      enqueueSnackbar({ message: 'Something went wrong...', severity: 'error' })
    },
    onSuccess() {
      enqueueSnackbar({ message: isFavorite ? 'Added to favorites' : 'Removed from favorites', severity: 'success' })
    },
  })
  const mutateWithDebounce = useDebounceCb(mutate, 500)

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
