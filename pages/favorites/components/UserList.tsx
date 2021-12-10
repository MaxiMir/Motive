import React, { useRef } from 'react'
import { Button } from '@material-ui/core'
import { User } from 'dto'
import FavoriteService from 'services/FavoriteService'
import useSend from 'hooks/useSend'
import useSnackbar from 'hooks/useSnackbar'
import UserCard from 'components/UserCard'
import AppList from 'components/UI/AppList'

interface FavoriteListProps {
  users: User[]
  mutate: (users: User[]) => void
}

export default function UserList({ users, mutate }: FavoriteListProps): JSX.Element {
  const prevUsersRef = useRef(users)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { send } = useSend(FavoriteService.setUser, {
    onSuccess: (_, { id, favorite }) => {
      prevUsersRef.current = users

      favorite &&
        enqueueSnackbar({
          message: 'Removed from favorites',
          severity: 'success',
          action: <Button onClick={() => onUndo(id)}>Undo</Button>,
          icon: 'ninja',
        })
    },
    onError: () => {
      mutate(prevUsersRef.current)
    },
  })

  const onRemove = (id: string) => {
    prevUsersRef.current = users

    mutate(users.filter((f) => f.id !== id))
    send({ id, favorite: true })
  }

  function onUndo(id: string) {
    mutate(prevUsersRef.current)
    closeSnackbar()
    send({ id, favorite: false })
  }

  return (
    <AppList
      elements={users}
      spacing={4}
      render={(user) => <UserCard type="favorite" user={user} onRemove={() => onRemove(user.id)} />}
      keyGetter={(user) => user.id}
    />
  )
}
