import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import FavoriteService from 'services/FavoriteService'
import useDebounceCb from 'hooks/useDebounceCb'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import AppEmoji from 'components/UI/AppEmoji'

interface FavoriteProps {
  id: string
  favorite: boolean
}

export default function Favorite({ id, favorite: initial }: FavoriteProps): JSX.Element {
  const classes = useStyles()
  const lastLoadedRef = useRef(initial)
  const [favorite, setFavorite] = useState(initial)
  const { enqueueSnackbar } = useSnackbar()
  const { send } = useSend(FavoriteService.setUser, {
    onSuccess(_, data) {
      lastLoadedRef.current = data.favorite

      enqueueSnackbar({
        message: data.favorite ? 'Added to favorites' : 'Removed from favorites',
        severity: 'success',
        icon: data.favorite ? 'speaker' : 'ninja',
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
