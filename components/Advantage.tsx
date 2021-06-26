import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core/'
import { Characteristic } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import AppLink from 'components/UI/AppLink'

interface Color {
  start: string
  end: string
}

interface AdvantageProps {
  characteristic: Characteristic
  title: string
  subtitle: string
  href: string
  color: Color
}

export const Advantage = ({
  characteristic,
  title,
  subtitle,
  href,
  color,
}: AdvantageProps) => {
  const classes = useStyles({ color })

  return (
    <AppBox
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <AppBox alignItems="center" spacing={3}>
        <AppLink href={href} className={classes.imageLink}>
          <AppEmoji name={characteristic} variant="h2" />
        </AppLink>
        <AppBox flexDirection="column" spacing={1}>
          <AppLink href={href}>
            <Typography variant="h5" className={classes.title}>
              {title}
            </Typography>
          </AppLink>
          <Typography>{subtitle}</Typography>
        </AppBox>
      </AppBox>
    </AppBox>
  )
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    background: (props: { color: Color }) =>
      `linear-gradient(90deg, ${props.color.start} 0%, ${props.color.end} 100%)`,
  },
  title: {
    width: 210,
    textTransform: 'uppercase',
    fontWeight: 500,
  },
  imageLink: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
})
