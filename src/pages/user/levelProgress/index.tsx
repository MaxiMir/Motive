import { LinearProgress } from '@mui/material'
import { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/system'

interface LevelProgressProps {
  level: number
}

function LevelProgress({ level }: LevelProgressProps): JSX.Element {
  const value = (level % 1) * 100

  return <Progress value={value} variant="determinate" />
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
