import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { UserDetail } from 'dto'
import ROUTE from 'route'
import Axios from 'lib/axios'
import useDebounceCb from 'hooks/useDebounceCb'
import AppEmoji from 'components/UI/AppEmoji'

const AppSnackbar = dynamic(() => import('components/UI/AppSnackbar'))

type UserCardFavoriteProps = Pick<UserDetail, 'id' | 'favorite'>

const UserCardFavorite = ({ id, favorite: initial }: UserCardFavoriteProps): JSX.Element => {
  const classes = useStyles()
  const [isFavorite, setIsFavorite] = useState(initial)
  const [severity, setSeverity] = useState<'success' | 'error'>()
  const { mutate } = useMutation((favorite: boolean) => Axios.put(ROUTE.getUserFavorite(id), favorite), {
    onError: (_, favorite) => {
      setIsFavorite(!favorite)
    },
    onSettled: (_, error) => {
      setSeverity(!error ? 'success' : 'error')
    },
  })
  const mutateWithDebounce = useDebounceCb(mutate, 500)
  const severityText = getSeverityText()

  const onClick = () => {
    setSeverity(undefined)
    setIsFavorite(!isFavorite)
    mutateWithDebounce(!isFavorite)
  }

  function getSeverityText() {
    if (severity === 'error') {
      return 'Something went wrong...'
    }

    return isFavorite ? 'Added to favorites' : 'Removed from favorites'
  }

  return (
    <>
      <IconButton title={`${isFavorite ? 'Remove from' : 'Add to'} favorite`} onClick={onClick}>
        <AppEmoji name={!isFavorite ? 'favorite' : 'favorite-active'} variant="h5" className={classes.emoji} />
      </IconButton>
      {severity && (
        <AppSnackbar severity={severity} autoHideDuration={3000} onClose={() => setSeverity(undefined)}>
          {severityText}
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
