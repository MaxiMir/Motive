import clsx from 'clsx'
import { Button, createStyles, makeStyles } from '@material-ui/core'
import { Like as LikeDTO } from 'dto'
import { numberToShort } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppTooltip from 'components/UI/AppTooltip'
import useSetLike from './hook'

interface LikeProps extends LikeDTO {
  messageId: number
}

export default function Like({ messageId, count: countInit, active: activeInit }: LikeProps): JSX.Element {
  const classes = useStyles()
  const [active, count, onClick] = useSetLike(messageId, activeInit, countInit)

  return (
    <AppBox alignItems="center">
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

const useStyles = makeStyles((theme) =>
  createStyles({
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
      color: theme.text.silent,
    },
  }),
)
