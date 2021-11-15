import { useState } from 'react'
import clsx from 'clsx'
import { Button, makeStyles } from '@material-ui/core'
import { numberToShort } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppTooltip from 'components/UI/AppTooltip'

interface LikeProps {
  count: number
}

export default function Like({ count: initial }: LikeProps): JSX.Element {
  const classes = useStyles()
  const [count, setCount] = useState(initial)
  const [active, setActive] = useState(false)

  const onClick = () => {
    setCount(count + (!active ? 1 : -1))
    setActive(!active)
  }

  return (
    <AppBox alignItems="center" spacing={0.5}>
      <AppTooltip title="Like">
        <Button
          size="small"
          aria-label={`Like this message${!count ? '' : ` along with ${count} other people`}`}
          className={clsx([classes.button, !active && classes.buttonNotActive])}
          onClick={onClick}
        >
          <AppEmoji name="like" onlyEmoji />
        </Button>
      </AppTooltip>
      <AppTypography className={classes.count}>{numberToShort(count)}</AppTypography>
    </AppBox>
  )
}

const useStyles = makeStyles({
  button: {
    width: 24,
    height: 24,
    minWidth: 'initial',
  },
  buttonNotActive: {
    filter: 'grayscale(1)',
    '&:hover': {
      filter: 'initial',
    },
  },
  count: {
    fontSize: '0.875rem',
    minWidth: 34,
    color: '#99989D',
  },
})
