import { Box, LinearProgress, Stack, Typography } from '@mui/material'
import { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/system'
import { UserCharacteristicDto } from 'shared/api'
import { useFormatNumber } from 'shared/lib/hooks'

interface LevelProgressProps {
  characteristic: UserCharacteristicDto
}

function LevelProgress({ characteristic }: LevelProgressProps): JSX.Element {
  const formatNumber = useFormatNumber()
  const value = (characteristic.progress % 1) * 100
  const formattedPoints = formatNumber(characteristic.points)
  const formattedNextLevelPoints = formatNumber(characteristic.nextLevelPoints)

  return (
    <Stack spacing={1}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="caption" sx={{ color: 'zen.silent' }}>
          {formattedPoints}
        </Typography>
        <Typography variant="caption" sx={{ color: 'zen.silent' }}>
          {formattedNextLevelPoints}
        </Typography>
      </Box>
      <Progress value={value} variant="determinate" />
    </Stack>
  )
}

const Progress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}))

export default LevelProgress
