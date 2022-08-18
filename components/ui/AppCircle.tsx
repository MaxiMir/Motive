import { CSSProperties, useEffect, useState } from 'react'
import { Box } from '@mui/material'

const STEP = 10

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

export default function AppCircle({
  offset,
  radius,
  dasharray,
  size,
  light,
  dark,
  strokeWidth,
  strokeWidthBg,
}: CircleProps) {
  const [progress, setProgress] = useState(dasharray)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= offset ? offset : progress - STEP))
    }, 100)

    return () => {
      clearInterval(timer)
    }
  }, [offset, progress])

  return (
    <svg width={size} height={size} viewBox="-25 -25 400 400">
      <circle stroke={light} cx={radius} cy={radius} r={radius} strokeWidth={strokeWidthBg} fill="none" />
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
            strokeDashoffset: progress,
            transition: 'stroke-dashoffset 1s ease-out',
          }}
        />
      )}
    </svg>
  )
}
