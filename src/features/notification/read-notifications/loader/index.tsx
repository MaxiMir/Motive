import { Skeleton, Stack } from '@mui/material'

const SHOWN_COUNT = 8

function Loader() {
  const list = [...new Array(SHOWN_COUNT)]

  return (
    <Stack gap={2} flex={1}>
      {list.map((_, key) => (
        <Stack direction="row" gap={1} height={60} key={key}>
          <Skeleton animation="wave" variant="circular" width={60} height={60} />
          <Stack justifyContent="space-between" flex={1}>
            <Skeleton animation="wave" width="100%" height={42} />
            <Stack direction="row" gap={2}>
              <Skeleton animation="wave" width={70} height={21} />
              <Skeleton animation="wave" width={21} height={21} />
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}

export default Loader
