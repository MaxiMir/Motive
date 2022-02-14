import dynamic from 'next/dynamic'
import { RoleDto, TopicDto, TopicType, UserBaseDto } from 'dto'
import AppBox from 'components/UI/AppBox'
import { AppListProps } from 'components/UI/AppList'
import { useDiscussion, useAddTopic } from './hook'

const User = dynamic(() => import('components/User'))
const AppList = dynamic<AppListProps<TopicDto>>(() => import('components/UI/AppList'))
const AppTypography = dynamic(() => import('components/UI/AppTypography'))
const Loader = dynamic(() => import('./components/Loader'))
const Topic = dynamic(() => import('./components/Topic'))

interface DiscussionProps {
  goalId: number
  dayId: number
  role: RoleDto
  owner: UserBaseDto
  client?: UserBaseDto
  count: number
}

export default function Discussion({ goalId, dayId, role, owner, client, count }: DiscussionProps): JSX.Element {
  const { isLoading, topics, checkOnLoadMore, fetchNextPage } = useDiscussion(dayId, count)
  const onAdd = useAddTopic(goalId, dayId)
  const notOwner = !!client && client.id !== owner.id
  const withInput = (!count || !!topics.length) && notOwner
  const height = !count ? undefined : (!withInput ? 0 : 56) + 496

  return (
    <AppBox flexDirection="column" spacing={2} flex={1} height={height}>
      <>
        {withInput && (
          <User tmpl="input" dayId={dayId} user={client as UserBaseDto} type={TopicType.QUESTION} onAdd={onAdd} />
        )}
        {!count ? (
          <AppTypography>Nothing so far...</AppTypography>
        ) : (
          <>
            {isLoading ? (
              <Loader count={count} withInput={notOwner} />
            ) : (
              <AppBox display="block" maxHeight={524} pr={2} overflow="auto">
                <AppList
                  elements={topics}
                  keyGetter={(topic) => topic.id}
                  spacing={2}
                  render={(topic, index) => (
                    <Topic
                      goalId={goalId}
                      dayId={dayId}
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
