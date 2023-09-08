import { Box, Divider, Stack } from '@mui/material'
import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { useDetectMobile } from 'entities/device'
import { DayDto } from 'shared/api'
import { toCheckOnLoadMore } from 'shared/lib/utils'
import Modal from 'shared/ui/Modal'
import { useLiked } from './lib'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))
const UserLoader = dynamic(() => import('entities/user').then((mod) => mod.UserLoader))
const EmptyList = dynamic(() => import('./emptyList'))
const UserCard = dynamic(() => import('./userCard'))

interface LikedModalProps {
  title: string
  day: DayDto
  onClose: () => void
}

function LikedModal({ title, day, onClose }: LikedModalProps) {
  const { isLoading, isFetching, data, hasNextPage, fetchNextPage } = useLiked(day)
  const users = data?.pages.flat() || []
  const checkOnInView = toCheckOnLoadMore(users.length, hasNextPage)
  const mobile = useDetectMobile()
  const lastId = users.at(-1)?.id

  return (
    <Modal title={title} maxWidth="xs" contentHeight={600} fullScreen={mobile} onClose={onClose}>
      {isLoading ? (
        <UserLoader all={day.pointsRated} shown={8} />
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
              {isFetching && (
                <Box height={24} marginX="auto">
                  <CircularProgress size={14.5} color="inherit" />
                </Box>
              )}
            </Stack>
          )}
        </>
      )}
    </Modal>
  )
}

export default LikedModal
