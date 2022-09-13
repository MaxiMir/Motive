import { Box, Skeleton } from '@mui/material'

const VISIBLE_COUNT = 4

interface LoaderProps {
  count: number
  withInput: boolean
}

export default function Loader({ count, withInput }: LoaderProps) {
  const shownCount = count >= VISIBLE_COUNT ? VISIBLE_COUNT : count
  const list = [...new Array(shownCount)]

  return (
    <>
      {withInput && (
        <Box display="flex" gap={2} alignItems="flex-end" mb={2}>
          <Skeleton animation="wave" variant="circular" width={32} height={32} />
          <Skeleton animation="wave" width="calc(100% - 112px)" height={3} />
          <Skeleton animation="wave" width={24} height={24} />
        </Box>
      )}
      {list.map((_, key) => (
        <Box display="flex" flexDirection="column" gap={1} flex={1} key={key}>
          <Box display="flex" alignItems="flex-end" gap={1}>
            <Skeleton animation="wave" variant="circular" width={26} height={26} />
            <Skeleton animation="wave" width={100} height={16} />
          </Box>
          <Box display="flex" justifyContent="space-between" gap={2}>
            <Skeleton animation="wave" width="100%" height={32} />
            <Skeleton animation="wave" width={8} height={32} />
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Skeleton animation="wave" width={100} height={15} />
            <Box display="flex" gap={1}>
              <Skeleton animation="wave" width={16} height={24} />
              <Skeleton animation="wave" width={28} height={24} />
            </Box>
          </Box>
        </Box>
      ))}
    </>
  )
}
