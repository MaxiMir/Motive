import { Box, Typography, LinearProgress, BoxProps } from '@mui/material'
import { linearProgressClasses } from '@mui/material/LinearProgress'
import { MainCharacteristicName } from '@features/characteristic'
import useShowProgress from '@hooks/useShowProgress'

interface ProgressProps {
  characteristic: MainCharacteristicName
  value: number
  mb?: BoxProps['mb']
}

function Progress({ characteristic, value, mb }: ProgressProps) {
  const rest = (value % 1) * 100
  const progress = useShowProgress(rest)
  const preparedProgress = Math.round(progress)

  return (
    <Box display="flex" alignItems="center" gap={1} mb={mb}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={({ palette }) => ({
          width: '100%',
          height: 10,
          borderRadius: 5,
          backgroundColor: palette.grey[800],
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: `${characteristic}.dark`,
          },
        })}
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
