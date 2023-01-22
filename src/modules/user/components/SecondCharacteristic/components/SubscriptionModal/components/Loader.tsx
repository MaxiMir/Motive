import { Box, Stack, Skeleton } from '@mui/material'

const VISIBLE_QUANTITY = 8

interface LoaderProps {
  count: number
}

function Loader({ count }: LoaderProps) {
  const shownCount = count > VISIBLE_QUANTITY ? VISIBLE_QUANTITY : count
  const list = [...new Array(shownCount)]

  return (
    <Stack spacing={2} flex={1}>
      {list.map((_, key) => (
        <Box display="flex" gap={1} height={60} key={key}>
          <Skeleton animation="wave" variant="circular" width={55} height={55} />
          <Stack justifyContent="space-between" flex={1}>
            <Skeleton animation="wave" width={100} height={16} />
            <Stack direction="row" justifyContent="space-between">
              <Skeleton animation="wave" width={50} height={30} />
              <Skeleton animation="wave" width={50} height={30} />
              <Skeleton animation="wave" width={50} height={30} />
              <Skeleton animation="wave" width={50} height={30} />
            </Stack>
          </Stack>
        </Box>
      ))}
    </Stack>
  )
}

export default Loader
