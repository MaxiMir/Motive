import Image from 'next/image'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Owner } from 'dto'
import AppLink from 'components/UI/AppLink'
import AppTypography from 'components/UI/AppTypography'

export default function GoalCardOwner({ firstName, lastName, avatar, href }: Owner): JSX.Element {
  const classes = useStyles()

  return (
    <>
      <AppTypography variant="h6" className={classes.withText}>
        with
      </AppTypography>
      <AppLink href={href} title={`${firstName} ${lastName}`} className={classes.avatarLink}>
        <Image src={avatar} alt="avatar" width={28} height={28} objectFit="cover" className={classes.avatar} />
      </AppLink>
    </>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    withText: {
      color: theme.palette.warning.main,
    },
    avatarLink: {
      height: 28,
    },
    avatar: {
      borderRadius: '50%',
    },
  }),
)
