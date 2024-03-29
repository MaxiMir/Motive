import { Divider, Stack } from '@mui/material'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useDeviceContext } from 'entities/device'
import { toCheckOnLoadMore } from 'shared/lib/utils'
import Modal from 'shared/ui/modal'
import { useSubscription } from './lib'

const UserLoader = dynamic(() => import('entities/user').then((mod) => mod.UserLoader))
const LoadIndicator = dynamic(() => import('shared/ui/load-indicator'))
const EmptyList = dynamic(() => import('./empty-list'))
const UserCard = dynamic(() => import('./user-card'))

interface SubscriptionModalProps {
  userId: number
  type: 'followers' | 'following'
  count: number
  onClose: () => void
}

function SubscriptionModal({ userId, type, count, onClose }: SubscriptionModalProps) {
  const { formatMessage } = useIntl()
  const { isMobile } = useDeviceContext()
  const { isLoading, isFetching, data, hasNextPage, fetchNextPage } = useSubscription(
    userId,
    count,
    type,
  )
  const users = data?.pages.flat() || []
  const checkOnInView = toCheckOnLoadMore(users.length, hasNextPage)
  const title = formatMessage({ id: `common.${type}` })
  const lastId = users.at(-1)?.id

  return (
    <Modal title={title} contentHeight={600} fullScreen={isMobile} onClose={onClose}>
      {isLoading ? (
        <UserLoader all={count} shown={8} />
      ) : (
        <>
          {!users?.length ? (
            <EmptyList />
          ) : (
            <Stack flex={1} gap={2} height="100%">
              {users.map((user, index) => (
                <Fragment key={user.id}>
                  <UserCard
                    user={user}
                    inView={checkOnInView(index)}
                    onView={fetchNextPage}
                    onClose={onClose}
                  />
                  {lastId !== user.id && <Divider light />}
                </Fragment>
              ))}
              {isFetching && <LoadIndicator />}
            </Stack>
          )}
        </>
      )}
    </Modal>
  )
}

export default SubscriptionModal
