import { createStyles, makeStyles } from '@material-ui/core/styles'
import { UserBase } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import AppTooltip from 'components/UI/AppTooltip'

interface SupportSignProps {
  answer?: boolean
  owner?: UserBase
}

export default function SupportSign({ answer, owner }: SupportSignProps): JSX.Element {
  const classes = useStyles()
  const title = answer ? 'Support: answer to question' : `Support for ${owner?.fullName || 'others'}`

  return (
    <AppTooltip title={title} aria-label={title}>
      <AppBox
        justifyContent="center"
        alignItems="center"
        position="absolute"
        bottom={-5}
        right={-10}
        className={classes.emojiWrap}
      >
        <AppEmoji name="support" onlyEmoji />
      </AppBox>
    </AppTooltip>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    emojiWrap: {
      width: 24,
      height: 24,
      background: theme.palette.info.main,
      borderRadius: '50%',
      '@supports not (-moz-appearance:none)': {
        paddingLeft: '4px',
      },
    },
  }),
)
