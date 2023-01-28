import { Stack, Box, Typography, LinearProgress, StackProps } from '@mui/material'
import { linearProgressClasses } from '@mui/material/LinearProgress'
import { MainCharacteristicName } from 'shared/api'
import { useShowProgress } from 'shared/lib/hooks'

interface ProgressProps {
  characteristic: MainCharacteristicName
  value: number
  mb?: StackProps['mb']
}

function Progress({ characteristic, value, mb }: ProgressProps) {
  const rest = (value % 1) * 100
  const progress = useShowProgress(rest)
  const preparedProgress = Math.round(progress)

  return (
    <Stack direction="row" alignItems="center" spacing={1} mb={mb}>
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
    </Stack>
  )
}

export default Progress
