import { Avatar, Box, Chip, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import { SPHERE_ICONS } from 'entities/characteristic'
import { SphereDto } from 'shared/api'
import Icon from 'shared/ui/Icon'
import { generateColorByName } from 'shared/ui/palette'
import { getBubblesSetup } from './lib'

const WIDTH = 30
const HEIGHT = 200

interface SphereProgressProps {
  sphere: SphereDto
  value: number
}

function SphereProgress({ sphere, value }: SphereProgressProps) {
  const { formatMessage } = useIntl()
  const background = generateColorByName(sphere)
  const sphereText = formatMessage({ id: `common.${sphere}` })
  const bubbles = getBubblesSetup(10)
  const label = Math.trunc(value)
  const icon = SPHERE_ICONS[sphere]

  return (
    <Stack gap={1}>
      <Vessel
        sx={{
          '--width': `${WIDTH}px`,
          '--height': `${HEIGHT}px`,
          '--background': background,
          '--progress': `${HEIGHT - (value / 10) * HEIGHT}px`,
        }}
      >
        <Cont>
          <Fill>
            <Wave>
              {bubbles.map(({ key, sx }) => (
                <Bubble sx={sx} key={key} />
              ))}
            </Wave>
          </Fill>
        </Cont>
        <Value size="small" label={label} />
        <Title>
          <Typography>{sphereText}</Typography>
        </Title>
      </Vessel>
      <Avatar
        sx={{
          width: 30,
          height: 30,
          background,
          '& span': {
            fontSize: 12,
          },
        }}
      >
        <Icon name={icon} color="common.white" />
      </Avatar>
    </Stack>
  )
}

const Vessel = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 'var(--width)',
  height: 'var(--height)',
  borderRadius: 20,
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  overflow: 'hidden',
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

const Wave = styled('div')({
  position: 'relative',
  overflow: 'hidden',
  width: 'var(--width)',
  height: 'var(--height)',
  backgroundColor: 'var(--background)',
  transform: 'translate(0, var(--progress))',
})

const Bubble = styled('div')({
  position: 'absolute',
  zIndex: 1,
  backgroundColor: 'white',
  borderRadius: '50%',
  width: 7,
  height: 7,
  border: '1px solid #000000c9',
  animation: 'up 14s ease-out infinite',
  '@keyframes up': {
    '100%': {
      top: -10,
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

const Title = styled('div')({
  minWidth: 100,
  position: 'absolute',
  left: '50%',
  bottom: 75,
  transform: 'translate(-50%)',
  zIndex: 1,
  '& p': {
    rotate: '-90deg',
  },
})

export default SphereProgress
