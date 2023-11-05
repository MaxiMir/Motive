import { Box, Stack, Skeleton, Divider } from '@mui/material'

interface UserLoaderProps {
  all: number
  shown: number
}

export function UserLoader({ all, shown }: UserLoaderProps) {
  const shownCount = all > shown ? shown : all
  const list = [...new Array(shownCount)]
  const lastKey = list.at(-1)

  return (
    <Stack gap={2} flex={1} height="100%">
      {list.map((_, key) => (
        <>
          <Box display="flex" alignItems="center" gap={1} height={60} key={key}>
            <Skeleton animation="wave" variant="circular" width={55} height={55} />
            <Stack justifyContent="space-between" flex={1}>
              <Skeleton animation="wave" width={60} height={16} />
              <Skeleton animation="wave" width={100} height={16} />
            </Stack>
            <Box marginX="auto">
              <Skeleton animation="wave" width={24} height={24} />
            </Box>
          </Box>
          {lastKey !== key && <Divider light />}
        </>
      ))}
    </Stack>
  )
}
