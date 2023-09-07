import { styled } from '@mui/system'
import { compiler } from 'markdown-to-jsx'
import { useIntl } from 'react-intl'
import TooltipArrow from 'shared/ui/TooltipArrow'

interface UserLevelProps {
  progress: number
}

export function UserLevel({ progress }: UserLevelProps) {
  const value = Math.trunc(progress)
  const { formatMessage } = useIntl()
  const message = formatMessage({ id: 'common.level-summary', defaultMessage: '' }, { value })
  const title = compiler(message)

  return (
    <TooltipArrow title={title}>
      <Hexagon>
        <Level>{value}</Level>
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
