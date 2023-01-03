import { Box, LinearProgress, linearProgressClasses, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { MainCharacteristicName } from '@features/characteristic'
import useShowProgress from '@hooks/useShowProgress'

interface ProgressProps {
  characteristic: MainCharacteristicName
  value: number
}

function Progress({ characteristic, value }: ProgressProps) {
  const rest = (value % 1) * 100
  const progress = useShowProgress(rest)
  const preparedProgress = Math.round(progress)

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          width: '100%',
          height: 10,
          borderRadius: 5,
          backgroundColor: grey[800],
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: `${characteristic}.dark`,
          },
        }}
      />
      <Box display="flex" width={35} justifyContent="flex-end">
        <Typography variant="body2" color="text.secondary">
          {preparedProgress}%
        </Typography>
      </Box>
    </Box>
  )
}

export default Progress
