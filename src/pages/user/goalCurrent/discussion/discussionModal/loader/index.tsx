import { Skeleton, Stack } from '@mui/material'
import { useClient } from 'entities/user'

const VISIBLE_COUNT = 4

interface LoaderProps {
  count: number
}

function Loader({ count }: LoaderProps) {
  const client = useClient()
  const shownCount = count >= VISIBLE_COUNT ? VISIBLE_COUNT : count
  const list = [...new Array(shownCount)]
  const renderInput = client && count <= 2

  return (
    <>
      {list.map((_, key) => (
        <Stack direction={key % 2 ? 'row-reverse' : 'row'} alignItems="flex-end" gap={2} key={key}>
          <Skeleton variant="circular" animation="wave" width={38} height={38} sx={{ mb: 3 }} />
          <Stack
            gap={0.5}
            width={{
              xs: '100%',
              md: '40%',
            }}
          >
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
      {renderInput && (
        <Stack
          direction="row"
          alignItems="center"
          gap={2}
          position="absolute"
          bottom={0}
          width="100%"
        >
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
    </>
  )
}

export default Loader
