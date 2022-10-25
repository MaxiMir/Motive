import { LinearProgress, Box, linearProgressClasses } from '@mui/material'
import useShowProgress from 'src/common/hooks/useShowProgress'

interface ProgressProps {
  onEnd: () => void
}

export default function Progress({ onEnd }: ProgressProps) {
  const progress = useShowProgress(100, { step: 1, onEnd })

  return (
    <Box
      sx={{
        display: 'table-cell',
      }}
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 2,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.40)',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 2,
            backgroundColor: 'common.white',
          },
        }}
      />
    </Box>
  )
}
