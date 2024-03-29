import { Box, Divider, Stack } from '@mui/material'
import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { useDeviceContext } from 'entities/device'
import { DayDto } from 'shared/api'
import { toCheckOnLoadMore } from 'shared/lib/utils'
import Modal from 'shared/ui/modal'
import { usePointsRated } from './lib'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))
const UserLoader = dynamic(() => import('entities/user').then((mod) => mod.UserLoader))
const EmptyList = dynamic(() => import('./empty-list'))
const PointCard = dynamic(() => import('./point-card'))

interface PointsRatedModalProps {
  title: string
  day: DayDto
  onClose: () => void
}

function PointsRatedModal({ title, day, onClose }: PointsRatedModalProps) {
  const { isMobile } = useDeviceContext()
  const { isLoading, isFetching, data, hasNextPage, fetchNextPage } = usePointsRated(day)
  const pointsRated = data?.pages.flat() || []
  const checkOnInView = toCheckOnLoadMore(pointsRated.length, hasNextPage)
  const lastId = pointsRated.at(-1)?.id

  return (
    <Modal title={title} contentHeight={600} fullScreen={isMobile} onClose={onClose}>
      {isLoading ? (
        <UserLoader all={day.pointsRated} shown={8} />
      ) : (
        <>
          {!pointsRated?.length ? (
            <EmptyList />
          ) : (
            <Stack flex={1} gap={2} height="100%">
              {pointsRated.map((point, index) => (
                <Fragment key={point.id}>
                  <PointCard
                    point={point}
                    inView={checkOnInView(index)}
                    onView={fetchNextPage}
                    onClose={onClose}
                  />
                  {lastId !== point.id && <Divider light />}
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

export default PointsRatedModal
