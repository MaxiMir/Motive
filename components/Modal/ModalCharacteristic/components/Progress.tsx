import { useEffect, useState } from 'react'
import { Box, LinearProgress, linearProgressClasses, Typography } from '@mui/material'
import { MainCharacteristic } from 'dto'

const STEP = 1

interface ProgressProps {
  characteristic: MainCharacteristic
  value: number
}

export default function Progress({ characteristic, value }: ProgressProps) {
  const rest = (value % 1) * 100
  const [progress, setProgress] = useState(0)
  const progressText = Math.round(progress)

  useEffect(() => {
    const timer = setInterval(() => setProgress((prev) => (prev + STEP >= rest ? rest : progress + STEP)), 100)

    return () => {
      clearInterval(timer)
    }
  }, [progress, rest])

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          width: '100%',
          height: 10,
          borderRadius: 5,
          backgroundColor: `${characteristic}.light`,
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: `${characteristic}.dark`,
          },
        }}
      />
      <Box display="flex" width={35} justifyContent="flex-end">
        <Typography variant="body2" color="text.secondary">
          {progressText}%
        </Typography>
      </Box>
    </Box>
  )
}
