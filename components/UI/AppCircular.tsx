import { makeStyles } from '@material-ui/core/styles'
import { CharacteristicColor } from 'hook/useCharacteristicColor'

interface AppCircularProps {
  size: number
  color: CharacteristicColor
  value: number
}

const AppCircular = (props: AppCircularProps) => {
  const classes = useStyles(props)

  return (
    <svg viewBox="0 0 36 36" className={classes.root}>
      <path
        className={classes.circleBg}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        className={classes.circle}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
    </svg>
  )
}

const useStyles = makeStyles({
  root: {
    display: 'block',
    width: (props: AppCircularProps) => props.size,
    height: (props: AppCircularProps) => props.size,
  },
  circleBg: {
    fill: 'none',
    stroke: (props) => props.color.start,
    strokeWidth: '3px',
  },
  circle: {
    fill: 'none',
    strokeWidth: '2px',
    strokeLinecap: 'round',
    animation: '$progress 1s ease-out forwards',
    stroke: (props) => props.color.end,
    strokeDasharray: (props) => `${props.value}, 100`,
  },
  '@keyframes progress': {
    '0%': {
      'stroke-dasharray': '0 100',
    },
  },
})

export default AppCircular
