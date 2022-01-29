import dynamic from 'next/dynamic'
import { RoleDto, TopicDto, TopicType, UserBaseDto } from 'dto'
import AppBox from 'components/UI/AppBox'
import { AppListProps } from 'components/UI/AppList'
import useDiscussion from './hook'

const Loader = dynamic(() => import('./components/Loader'))
const Topic = dynamic(() => import('./components/Topic'))
const User = dynamic(() => import('components/User'))
const AppList = dynamic<AppListProps<TopicDto>>(() => import('components/UI/AppList'))
const AppTypography = dynamic(() => import('components/UI/AppTypography'))

interface DiscussionProps {
  goalId: number
  dayId: number
  role: RoleDto
  owner: UserBaseDto
  client?: UserBaseDto
  count: number
}

export default function Discussion({ goalId, dayId, role, owner, client, count }: DiscussionProps): JSX.Element {
  const { topics, onLoadMore, checkOnLoadMore, onAdd } = useDiscussion(goalId, dayId, count)
  const withInput = (!count || !!topics.length) && !!client && client.id !== owner.id
  const height = !count ? undefined : (!withInput ? 0 : 56) + 540

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
            {!topics.length ? (
              <Loader count={count} withInput={withInput} />
            ) : (
              <AppBox display="block" maxHeight={524} pr={2} overflow="auto">
                <AppList
                  elements={topics}
                  keyGetter={(topic) => topic.id}
                  spacing={2}
                  render={(topic, index) => (
                    <Topic
                      dayId={dayId}
                      topic={topic}
                      role={role}
                      owner={owner}
                      inView={checkOnLoadMore(index)}
                      onView={onLoadMore}
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
