import { styled } from '@mui/system'

interface LevelProps {
  level: number
}

function Level({ level }: LevelProps) {
  return (
    <Hexagon>
      <Value>{level}</Value>
    </Hexagon>
  )
}

const Hexagon = styled('div')({
  '--hex-side': '15px',
  position: 'relative',
  width: 'calc(var(--hex-side) * 1.732)',
  height: 'var(--hex-side)',
  background: 'linear-gradient(to bottom, #c39738, #deb761, #c39738)',
  '&::before, ::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, #c39738, #deb761, #c39738)',
    top: 0,
    left: 0,
  },
  '&::before': {
    transform: 'rotate(60deg)',
  },
  '&::after': {
    transform: 'rotate(-60deg)',
  },
})

const Value = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'black',
  fontWeight: 'bold',
  zIndex: 1,
})

export default Level
