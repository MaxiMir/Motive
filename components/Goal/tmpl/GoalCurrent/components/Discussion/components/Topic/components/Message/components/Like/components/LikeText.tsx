import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'
import AppEmoji from 'components/UI/AppEmoji'
import AppBox from 'components/UI/AppBox'
import AppOptionalTooltip from 'components/UI/AppOptionalTooltip'
import { MessageDto } from 'dto'

interface LikeTextProps {
  message: MessageDto
  title: string
  icon: 'like' | 'support'
}

export default function LikeText({ message, title, icon }: LikeTextProps): JSX.Element {
  const classes = useStyles()

  return (
    <AppOptionalTooltip title={!message.like ? undefined : title}>
      <AppBox
        justifyContent="center"
        alignItems="center"
        width={24}
        height={24}
        className={clsx([!message.like && classes.wrap])}
      >
        <AppEmoji name={icon} onlyEmoji />
      </AppBox>
    </AppOptionalTooltip>
  )
}

const useStyles = makeStyles({
  wrap: {
    filter: 'grayscale(1)',
  },
})
