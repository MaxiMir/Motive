import { CharacteristicColor } from 'hook/useCharacteristicColors'

interface CircleProps {
  progress: number
  color: CharacteristicColor
  size: number
  strokeWidth: number
  strokeWidthBg: number
}

const RADIUS = 175
const DIAMETER = Math.round(Math.PI * RADIUS * 2)

export default function AppCircle({ progress, size, color, strokeWidth, strokeWidthBg }: CircleProps): JSX.Element {
  const offset = Math.round(((100 - Math.min(progress, 100)) / 100) * DIAMETER)

  return (
    <>
      <svg width={size} height={size} viewBox="-25 -25 400 400">
        <circle stroke={color.start} cx={RADIUS} cy={RADIUS} r={RADIUS} strokeWidth={strokeWidthBg} fill="none" />
        <circle
          className="circle"
          stroke={color.end}
          transform="rotate(-90 175 175)"
          cx={RADIUS}
          cy={RADIUS}
          r={RADIUS}
          strokeDasharray="1100"
          strokeWidth={strokeWidth}
          strokeDashoffset="1100"
          strokeLinecap="round"
          fill="none"
        />
        <style jsx>{`
          .circle {
            stroke-dashoffset: ${offset};
            transition: stroke-dashoffset 1s ease-out;
            animation: progress 1s ease-out;
          }

          @keyframes progress {
            0% {
              stroke-dasharray: ${offset} 1100;
            }
          }
        `}</style>
      </svg>
    </>
  )
}
