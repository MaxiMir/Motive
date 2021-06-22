import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core/'
import { Characteristic } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'

interface Color {
  start: string
  end: string
}

interface AdvantageProps {
  characteristic: Characteristic
  title: string
  subtitle: string
  color: Color
}

export const Advantage = ({
  characteristic,
  title,
  subtitle,
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
        <AppEmoji name={characteristic} variant="h2" />
        <AppBox flexDirection="column" spacing={1}>
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
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
})
