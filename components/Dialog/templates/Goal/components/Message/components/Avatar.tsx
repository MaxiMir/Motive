import { createStyles, makeStyles } from '@material-ui/core/styles'
import { UserBase } from 'dto'
import AvatarBase from 'components/UserCard/templates/Avatar'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'

interface AvatarProps {
  user: UserBase
  support: boolean
}

export default function Avatar({ user, support }: AvatarProps): JSX.Element {
  const classes = useStyles()

  return (
    <AppBox position="relative">
      <AvatarBase type="avatar" size={40} {...user} />
      {support && (
        <AppBox
          justifyContent="center"
          alignItems="center"
          position="absolute"
          bottom={5}
          right={-10}
          className={classes.emojiWrap}
        >
          <AppEmoji name="support" onlyEmoji />
        </AppBox>
      )}
    </AppBox>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    emojiWrap: {
      width: 24,
      height: 24,
      paddingLeft: '4px',
      background: theme.palette.info.main,
      borderRadius: '50%',
    },
  }),
)
