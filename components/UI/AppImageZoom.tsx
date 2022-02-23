import { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const AppImageZoom: FC = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.zoomIn}>
      <div className={classes.zoomOut}>{children}</div>
    </div>
  )
}

const useStyles = makeStyles({
  zoomIn: {
    width: '100%',
    animation: '$zoom-in 10s ease-in infinite',
    transition: 'all .5s ease-in-out',
    overflow: 'hidden',
  },
  zoomOut: {
    animation: '$zoom-out 10s ease-in infinite',
    transition: 'all .5s ease-in-out',
    overflow: 'hidden',
  },
  '@keyframes zoom-in': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.8)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
  '@keyframes zoom-out': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(0.67)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
})

export default AppImageZoom
