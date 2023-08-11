import { Box, Chip, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import { SphereDto } from 'shared/api'
import { generateColorByName } from 'shared/ui/palette'

const HEIGHT = 200

interface SphereProgressProps {
  sphere: SphereDto
  value: number
}

function SphereProgress({ sphere, value }: SphereProgressProps): JSX.Element {
  const { formatMessage } = useIntl()
  const fill = generateColorByName(sphere)
  const message = formatMessage({ id: `common.${sphere}` })
  const label = Math.trunc(value)

  return (
    <Vessel
      sx={{
        '--width': '30px',
        '--height': `${HEIGHT}px`,
        '--fill': fill,
        '--progress': `${HEIGHT - (value / 10) * HEIGHT}px`,
      }}
    >
      <Cont>
        <Fill>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="300px"
            height="300px"
            viewBox="0 0 300 300"
            enableBackground="new 0 0 300 300"
            xmlSpace="preserve"
          >
            <Wave
              d="M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
	c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
	c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z"
            />
          </svg>
        </Fill>
      </Cont>
      <Value size="small" label={label} />
      <Typography
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          writingMode: 'tb',
          zIndex: 1,
        }}
      >
        {message}
      </Typography>
    </Vessel>
  )
}

const Vessel = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 'var(--width)',
  height: 'var(--height)',
  borderRadius: 20,
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
}))

const Cont = styled('div')({
  width: 'var(--width)',
  height: 'var(--height)',
  borderRadius: 20,
  overflow: 'hidden',
})

const Fill = styled('div')({
  animation: 'filling 3s cubic-bezier(0.2, 0.6, 0.8, 0.4) forwards',
  '@keyframes filling': {
    '0%': {
      transform: 'translate(0, calc(var(--height) * 2))',
    },
    '100%': {
      transform: 'translate(0, 0)',
    },
  },
})

const Wave = styled('path')({
  width: 'calc(var(--width) * 2)',
  height: 'var(--height)',
  fill: 'var(--fill)',
  animation: 'wave 5s linear infinite',
  '@keyframes wave': {
    '0%': {
      transform: 'translate(calc(var(--height) * -1), var(--progress))',
    },
    '100%': {
      transform: 'translate(0, var(--progress))',
    },
  },
})

const Value = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%)',
  bottom: 5,
  fontWeight: 'bold',
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
}))

export default SphereProgress
