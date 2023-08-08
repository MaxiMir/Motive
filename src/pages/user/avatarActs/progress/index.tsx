import { Box, Chip } from '@mui/material'
import { ReactNode } from 'react'
import { useIntl } from 'react-intl'
import { UserCharacteristicDto } from 'shared/api'
import Circle from 'shared/ui/Circle'
import { getOffset } from './lib'

interface ProgressProps {
  characteristic: UserCharacteristicDto
  radius: number
  children: ReactNode
}

export function Progress({ characteristic, radius, children }: ProgressProps) {
  const { formatMessage } = useIntl()
  const offset = getOffset(characteristic.progress, radius)
  const title = formatMessage({ id: 'common.level' })

  return (
    <Box position="relative">
      <Circle
        offset={offset}
        radius={radius}
        dasharray={1100}
        light="transparent"
        dark="#308fe8"
        size={radius}
        strokeWidth={15}
        strokeWidthBg={15}
      />
      <Chip
        size="small"
        label={characteristic.level}
        title={title}
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          background: '#308fe8',
          transform: 'translateX(-50%)',
          fontWeight: 'bold',
        }}
      />
      <Box position="absolute" top="50%" left="50%" sx={{ transform: 'translate(-50%, -50%)' }}>
        {children}
      </Box>
    </Box>
  )
}
