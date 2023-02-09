import { Skeleton, Stack } from '@mui/material'

const VISIBLE_COUNT = 4

interface LoaderProps {
  count: number
  withInput: boolean
}

function Loader({ count, withInput }: LoaderProps) {
  const shownCount = count >= VISIBLE_COUNT ? VISIBLE_COUNT : count
  const list = [...new Array(shownCount)]

  return (
    <>
      {withInput && (
        <Stack direction="row" alignItems="center" gap={2} mb={2}>
          <Skeleton variant="circular" animation="wave" width={38} height={38} />
          <Skeleton
            variant="rounded"
            animation="wave"
            width="100%"
            height={40}
            sx={{ borderRadius: '96px' }}
          />
        </Stack>
      )}
      {list.map((_, key) => (
        <Stack direction={key % 2 ? 'row-reverse' : 'row'} alignItems="flex-end" gap={2} key={key}>
          <Skeleton variant="circular" animation="wave" width={38} height={38} sx={{ mb: 3 }} />
          <Stack gap={0.5} width="40%">
            <Skeleton
              variant="rounded"
              animation="wave"
              height={120}
              sx={{
                borderBottomLeftRadius: 4,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 16,
              }}
            />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton variant="rounded" animation="wave" width={105} height={20} />
              <Skeleton variant="rounded" animation="wave" width={43} height={20} />
            </Stack>
          </Stack>
        </Stack>
      ))}
    </>
  )
}

export default Loader
