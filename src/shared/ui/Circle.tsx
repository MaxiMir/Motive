import { Box } from '@mui/material'
import { CSSProperties } from 'react'

interface CircleProps {
  offset: number
  radius: number
  dasharray: number
  light: CSSProperties['color']
  dark: CSSProperties['color']
  size: number
  strokeWidth: number
  strokeWidthBg: number
}

function Circle({
  offset,
  radius,
  dasharray,
  size,
  light,
  dark,
  strokeWidth,
  strokeWidthBg,
}: CircleProps) {
  return (
    <svg width={size} height={size} viewBox="-20 -36 400 400">
      <circle
        stroke={light}
        cx={radius}
        cy={radius}
        r={radius}
        strokeWidth={strokeWidthBg}
        fill="none"
      />
      {offset < dasharray && (
        <Box
          component="circle"
          stroke={dark}
          transform="rotate(-90 175 175)"
          cx={radius}
          cy={radius}
          r={radius}
          strokeDasharray={dasharray}
          strokeWidth={strokeWidth}
          strokeDashoffset={dasharray}
          strokeLinecap="round"
          fill="none"
          sx={{
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 1s ease-out',
            animation: 'progress 1s ease-out',
            '@keyframes progress': {
              '0%': {
                strokeDasharray: `${offset} ${dasharray}`,
              },
            },
          }}
        />
      )}
    </svg>
  )
}

export default Circle
