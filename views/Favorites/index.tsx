import React from 'react'
import dynamic from 'next/dynamic'
import { User } from 'dto'
import AppHeader from 'components/UI/AppHeader'
import AppContainer from 'components/UI/AppContainer'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface FavoritesProps {
  favorites: User[]
  mutate: (users: User[]) => void
}

export default function Favorites({ favorites, mutate }: FavoritesProps): JSX.Element {
  return (
    <AppContainer withFlexColumn>
      <AppHeader name="favorite" mb={4}>
        Favorites
      </AppHeader>
      {!favorites.length ? <EmptyList /> : <UserList users={favorites} mutate={mutate} />}
    </AppContainer>
  )
}
