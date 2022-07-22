import dynamic from 'next/dynamic'
import { UserDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppTitle from 'components/ui/AppTitle'
import AppContainer from 'components/ui/AppContainer'
import i18n from './i18n'

const EmptyList = dynamic(() => import('./components/EmptyList'))
const UserList = dynamic(() => import('./components/UserList'))

interface FollowingViewProps {
  users: UserDto[]
  locale: Locale
}

export default function FollowingView({ users, locale }: FollowingViewProps) {
  const { header } = i18n[locale]

  return (
    <AppContainer>
      <AppTitle name="following" mb={4}>
        {header}
      </AppTitle>
      {!users.length ? <EmptyList locale={locale} /> : <UserList users={users} />}
    </AppContainer>
  )
}
