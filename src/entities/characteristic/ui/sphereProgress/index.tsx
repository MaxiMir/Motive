import { Avatar, Box, Chip, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import { SphereDto } from 'shared/api'
import Icon from 'shared/ui/Icon'
import { generateColorByName } from 'shared/ui/palette'
import { getBubblesSetup, toVariables } from './lib'

interface SphereProgressProps {
  sphere: SphereDto
  icon: string
  value: number
  compact?: boolean
}

export function SphereProgress({ sphere, icon, value, compact }: SphereProgressProps) {
  const { formatMessage } = useIntl()
  const bubbles = getBubblesSetup(10)
  const background = generateColorByName(sphere)
  const variables = toVariables(background, value, compact)
  const sphereText = formatMessage({ id: `common.${sphere}` })
  const fontSize = compact ? 12 : 18

  return (
    <Stack gap={1} sx={{ ...variables }}>
      <Vessel>
        <Cont>
          <Fill>
            <Wave>
              {bubbles.map(({ key, sx }) => (
                <Bubble sx={sx} key={key} />
              ))}
            </Wave>
          </Fill>
        </Cont>
        <Digit size="small" label={value} />
        <Title>
          <Typography>{sphereText}</Typography>
        </Title>
      </Vessel>
      <IconAvatar>
        <Icon name={icon} color="common.white" fontSize={fontSize} />
      </IconAvatar>
    </Stack>
  )
}

const Vessel = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 'var(--width)',
  height: 'var(--height)',
  borderRadius: 'calc(var(--height) / 10)',
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  overflow: 'hidden',
}))

const Cont = styled('div')({
  width: 'var(--width)',
  height: 'var(--height)',
  borderRadius: 'calc(var(--height) / 10)',
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
  transition: 'transform 0.3s ease-in',
})

const Bubble = styled('div')({
  position: 'absolute',
  zIndex: 1,
  backgroundColor: 'white',
  borderRadius: '50%',
  width: 'var(--bubble)',
  height: 'var(--bubble)',
  border: '1px solid #000000c9',
  animation: 'up 14s ease-out infinite',
  '@keyframes up': {
    '100%': {
      top: -10,
    },
  },
})

const Digit = styled(Chip)(({ theme }) => ({
  width: 'var(--digit)',
  height: 'var(--digit)',
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
  bottom: 'var(--title-bottom)',
  transform: 'translate(-50%)',
  zIndex: 1,
  '& p': {
    rotate: '-90deg',
  },
})

const IconAvatar = styled(Avatar)({
  width: 'var(--width)',
  height: 'var(--width)',
  backgroundColor: 'var(--background)',
})
