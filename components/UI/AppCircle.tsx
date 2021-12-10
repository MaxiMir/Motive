import { CharacteristicColor } from 'hooks/useCharacteristicColors'

interface CircleProps {
  offset: number
  radius: number
  dasharray: number
  color: CharacteristicColor
  size: number
  strokeWidth: number
  strokeWidthBg: number
}

export default function AppCircle({
  offset,
  radius,
  dasharray,
  size,
  color,
  strokeWidth,
  strokeWidthBg,
}: CircleProps): JSX.Element {
  return (
    <>
      <svg width={size} height={size} viewBox="-25 -25 400 400">
        <circle stroke={color.start} cx={radius} cy={radius} r={radius} strokeWidth={strokeWidthBg} fill="none" />
        {offset < dasharray && (
          <circle
            className="circle"
            stroke={color.end}
            transform="rotate(-90 175 175)"
            cx={radius}
            cy={radius}
            r={radius}
            strokeDasharray={dasharray}
            strokeWidth={strokeWidth}
            strokeDashoffset={dasharray}
            strokeLinecap="round"
            fill="none"
          />
        )}
        <style scoped jsx>{`
          .circle {
            stroke-dashoffset: ${offset};
            transition: stroke-dashoffset 3s ease-out;
            animation: progress 3s ease-out;
          }

          @keyframes progress {
            0% {
              stroke-dasharray: ${offset} ${dasharray};
            }
          }
        `}</style>
      </svg>
    </>
  )
}
