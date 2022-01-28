import { createStyles, makeStyles } from '@material-ui/core/styles'
import { UserBaseDto } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import AppTooltip from 'components/UI/AppTooltip'

interface SupportSignProps {
  owner: UserBaseDto
}

export default function SupportSign({ owner }: SupportSignProps): JSX.Element {
  const classes = useStyles()
  const title = `Support for ${owner.id}`

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
