import { Box, BoxProps } from '@mui/material'
import { ReactNode } from 'react'
import Circle from 'shared/ui/Circle'
import { getOffset } from './lib'

interface ProgressProps extends BoxProps {
  progress: number
  radius: number
  children: ReactNode
}

export function Progress({ progress, radius, children, ...props }: ProgressProps) {
  const offset = getOffset(progress, radius)

  return (
    <Box position="relative" {...props}>
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
      <Box position="absolute" top="50%" left="50%" sx={{ transform: 'translate(-50%, -50%)' }}>
        {children}
      </Box>
    </Box>
  )
}
