import { Box, Skeleton } from '@mui/material'

const SHOWN_COUNT = 8

function Loader() {
  const list = [...new Array(SHOWN_COUNT)]

  return (
    <Box display="flex" flexDirection="column" gap={2} flex={1}>
      {list.map((_, key) => (
        <Box display="flex" gap={1} height={60} key={key}>
          <Skeleton animation="wave" variant="circular" width={60} height={60} />
          <Box display="flex" flexDirection="column" justifyContent="space-between" flex={1}>
            <Skeleton animation="wave" width="100%" height={42} />
            <Box display="flex" gap={2}>
              <Skeleton animation="wave" width={70} height={21} />
              <Skeleton animation="wave" width={21} height={21} />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default Loader
