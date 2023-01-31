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
        <Stack direction="row" alignItems="flex-end" gap={1} mb={2}>
          <Skeleton variant="circular" animation="wave" width={38} height={38} />
          <Skeleton animation="wave" width="calc(100% - 84px)" height={3} />
          <Skeleton variant="circular" animation="wave" width={30} height={30} />
        </Stack>
      )}
      {list.map((_, key) => (
        <Stack direction="row" alignItems="flex-end" gap={1} height={120} key={key}>
          <Skeleton variant="circular" animation="wave" width={38} height={38} />
          <Skeleton
            variant="rounded"
            width="calc(100% - 46px)"
            height={120}
            sx={{
              borderBottomLeftRadius: 4,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 16,
            }}
          />
        </Stack>
      ))}
    </>
  )
}

export default Loader
