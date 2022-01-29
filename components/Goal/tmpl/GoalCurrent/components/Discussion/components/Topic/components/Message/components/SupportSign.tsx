import { createStyles, makeStyles } from '@material-ui/core/styles'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import AppTooltip from 'components/UI/AppTooltip'

interface SupportSignProps {
  supportFor: string
}

export default function SupportSign({ supportFor }: SupportSignProps): JSX.Element {
  const classes = useStyles()
  const title = `Support for ${supportFor}`

  return (
    <AppTooltip title={title} aria-label={title}>
      <AppBox justifyContent="center" alignItems="center" className={classes.emojiWrap}>
        <AppEmoji name="support" onlyEmoji />
      </AppBox>
    </AppTooltip>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    emojiWrap: {
      width: 21,
      height: 21,
      background: theme.palette.info.main,
      borderRadius: '50%',
    },
  }),
)
