import { Box, Skeleton } from '@mui/material'

const VISIBLE_QUANTITY = 2

interface LoaderProps {
  count: number
}

export default function Loader({ count }: LoaderProps) {
  const displayedCount = count > VISIBLE_QUANTITY ? VISIBLE_QUANTITY : count

  return (
    <Box display="flex" flexDirection="column" gap={2} padding={2}>
      {[...new Array(displayedCount)].map((_, key) => (
        <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1} gap={3} key={key}>
          <Skeleton animation="wave" width={100} height={16} />
          <Skeleton animation="wave" variant="rectangular" width="100%" height={200} />
          <Box display="flex" justifyContent="space-between">
            <Skeleton animation="wave" width={50} height={30} />
            <Skeleton animation="wave" width={50} height={30} />
            <Skeleton animation="wave" width={50} height={30} />
            <Skeleton animation="wave" width={50} height={30} />
          </Box>
          <Skeleton animation="wave" width={100} height={16} />
        </Box>
      ))}
    </Box>
  )
}
