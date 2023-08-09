import { Box } from '@mui/material'
import { ReactNode } from 'react'
import { getOffset } from './lib'

interface ProgressProps {
  progress: number
  radius: number
  children: ReactNode
}

export function Progress({ progress, radius, children }: ProgressProps) {
  const offset = getOffset(progress, radius)

  return (
    <Box position="relative">
      <svg width={radius} height={radius} viewBox="-20 -36 400 400">
        <Box
          component="circle"
          stroke="#308fe8"
          transform="rotate(-90 175 175)"
          cx={radius}
          cy={radius}
          r={radius}
          strokeDasharray={1100}
          strokeWidth={15}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          sx={{
            transition: 'stroke-dashoffset 1s ease-out',
            animation: 'progress 1s ease-out',
            '@keyframes progress': {
              '0%': {
                strokeDasharray: `${offset} 1100`,
              },
            },
          }}
        />
      </svg>
      <Box position="absolute" top="50%" left="50%" sx={{ transform: 'translate(-50%, -50%)' }}>
        {children}
      </Box>
    </Box>
  )
}
