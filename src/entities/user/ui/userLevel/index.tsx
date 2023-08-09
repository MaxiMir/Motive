import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import TooltipArrow from 'shared/ui/TooltipArrow'

interface UserLevelProps {
  level: number
}

export function UserLevel({ level }: UserLevelProps) {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'common.level' })

  return (
    <TooltipArrow title={title}>
      <Hexagon>
        <Level>{level}</Level>
      </Hexagon>
    </TooltipArrow>
  )
}

const Hexagon = styled('div')({
  '--hex-side': '12px',
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

const Level = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'black',
  fontWeight: 'bold',
  zIndex: 1,
  fontSize: 14,
})
