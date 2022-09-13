import { Box, Skeleton } from '@mui/material'

const VISIBLE_QUANTITY = 6

interface LoaderProps {
  count: number
}

export default function Loader({ count }: LoaderProps) {
  const displayedCount = count > VISIBLE_QUANTITY ? VISIBLE_QUANTITY : count
  const list = [...new Array(displayedCount)]

  return (
    <Box display="flex" flexDirection="column" gap={2} flex={1}>
      {list.map((_, key) => (
        <Box display="flex" gap={1} height={60} key={key}>
          <Skeleton animation="wave" variant="circular" width={55} height={55} />
          <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
            <Skeleton animation="wave" width={100} height={16} />
            <Box display="flex" justifyContent="space-between">
              <Skeleton animation="wave" width={50} height={30} />
              <Skeleton animation="wave" width={50} height={30} />
              <Skeleton animation="wave" width={50} height={30} />
              <Skeleton animation="wave" width={50} height={30} />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
