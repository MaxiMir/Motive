import React, { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { UserDetail } from 'dto'
import FavoriteService from 'services/FavoriteService'
import useDebounceCb from 'hooks/useDebounceCb'
import useSend from 'hooks/useSend'
import { useSnackbar } from 'hooks/useSnackbar'
import AppEmoji from 'components/UI/AppEmoji'

type FavoriteProps = Pick<UserDetail, 'id' | 'favorite'>

export default function Favorite({ id, favorite: initial }: FavoriteProps): JSX.Element {
  const { enqueueSnackbar } = useSnackbar()
  const classes = useStyles()
  const lastLoadedRef = useRef(initial)
  const [favorite, setFavorite] = useState(initial)
  const { send } = useSend(FavoriteService.setUser, {
    onSuccess(_, data) {
      lastLoadedRef.current = data.favorite

      enqueueSnackbar({
        message: data.favorite ? 'Added to favorites' : 'Removed from favorites',
        severity: 'success',
        icon: data.favorite ? 'robot' : 'ninja',
      })
    },
    onError(_, data) {
      setFavorite(!data.favorite)
    },
  })

  const mutateWithDebounce = useDebounceCb((value: boolean) => {
    lastLoadedRef.current !== value && send({ id, favorite: value })
  })

  const onClick = () => {
    setFavorite(!favorite)
    mutateWithDebounce(!favorite)
  }

  return (
    <IconButton title={`${favorite ? 'Remove from' : 'Add to'} favorite`} onClick={onClick}>
      <AppEmoji name={!favorite ? 'favorite' : 'favorite-active'} variant="h5" className={classes.emoji} />
    </IconButton>
  )
}

const useStyles = makeStyles({
  emoji: {
    lineHeight: '28px',
  },
})
