import { Box, Skeleton } from '@mui/material'

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
        <Box display="flex" gap={2} alignItems="flex-end" mb={2}>
          <Skeleton variant="circular" animation="wave" width={32} height={32} />
          <Skeleton animation="wave" width="calc(100% - 112px)" height={3} />
          <Skeleton animation="wave" width={24} height={24} />
        </Box>
      )}
      {list.map((_, key) => (
        <Box display="flex" alignItems="flex-end" gap={1} height={120} key={key}>
          <Skeleton variant="circular" animation="wave" width={38} height={38} />
          <Skeleton
            variant="rounded"
            width={220}
            height={120}
            sx={{
              borderBottomLeftRadius: 4,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 16,
            }}
          />
        </Box>
      ))}
    </>
  )
}

export default Loader
