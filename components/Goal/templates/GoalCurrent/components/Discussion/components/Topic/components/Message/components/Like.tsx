import { useRef, useState } from 'react'
import clsx from 'clsx'
import { Button, createStyles, makeStyles } from '@material-ui/core'
import { Like as LikeDTO } from 'dto'
import useSend from 'hooks/useSend'
import useDebounceCb from 'hooks/useDebounceCb'
import DiscussionService from 'services/DiscussionService'
import { numberToShort } from 'helpers/prepare'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppTooltip from 'components/UI/AppTooltip'

interface LikeProps extends LikeDTO {
  messageId: string
}

export default function Like({ messageId, count: countInit, active: activeInit }: LikeProps): JSX.Element {
  const classes = useStyles()
  const lastLoadedRef = useRef({ count: countInit, active: activeInit })
  const [count, setCount] = useState(countInit)
  const [active, setActive] = useState(activeInit)
  const { send } = useSend(DiscussionService.setLike, {
    onSuccess: (r) => {
      lastLoadedRef.current = { count, active }
      console.log(r)
      // TODO MUTATE
    },
    onError: (_, data) => {
      setCount(lastLoadedRef.current.count)
      setActive(!data.like)
    },
  })
  const mutateWithDebounce = useDebounceCb((value: boolean) => {
    lastLoadedRef.current.active !== value && send({ messageId, like: value })
  })

  const onClick = () => {
    setCount(count + (!active ? 1 : -1))
    setActive(!active)
    mutateWithDebounce(!active)
  }

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
