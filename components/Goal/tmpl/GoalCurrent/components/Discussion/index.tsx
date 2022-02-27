import dynamic from 'next/dynamic'
import { RoleDto, TopicDto, MessageType, UserBaseDto, ClientDto } from 'dto'
import useClient from 'hooks/useClient'
import AppBox from 'components/UI/AppBox'
import { AppListProps } from 'components/UI/AppList'
import { useDiscussion, useAddMessage } from './hook'

const User = dynamic(() => import('components/User'))
const AppList = dynamic<AppListProps<TopicDto>>(() => import('components/UI/AppList'))
const AppTypography = dynamic(() => import('components/UI/AppTypography'))
const Loader = dynamic(() => import('./components/Loader'))
const Topic = dynamic(() => import('./components/Topic'))

interface DiscussionProps {
  dayId: number
  role: RoleDto
  owner: UserBaseDto
  count: number
}

export default function Discussion({ dayId, role, owner, count }: DiscussionProps): JSX.Element {
  const client = useClient()
  const { isLoading, topics, checkOnLoadMore, fetchNextPage } = useDiscussion(dayId, count)
  const onAdd = useAddMessage()
  const withInput = !!client && (!count || !!topics.length) && role !== 'OWNER'
  const height = !count ? undefined : 496 + (!withInput ? 0 : 56)

  return (
    <AppBox flexDirection="column" spacing={2} flex={1} height={height}>
      <>
        {withInput && (
          <User tmpl="input" dayId={dayId} user={client as ClientDto} type={MessageType.QUESTION} onAdd={onAdd} />
        )}
        {!count ? (
          <AppTypography>Nothing so far...</AppTypography>
        ) : (
          <>
            {isLoading ? (
              <Loader count={count} withInput={role !== 'OWNER'} />
            ) : (
              <AppBox display="block" maxHeight={524} pr={2} overflow="auto">
                <AppList
                  elements={topics}
                  keyGetter={(topic) => topic.id}
                  spacing={2}
                  render={(topic, index) => (
                    <Topic
                      topic={topic}
                      role={role}
                      owner={owner}
                      inView={checkOnLoadMore(index)}
                      onView={fetchNextPage}
                      onAdd={onAdd}
                    />
                  )}
                />
              </AppBox>
            )}
          </>
        )}
      </>
    </AppBox>
  )
}
