import { makeStyles } from '@material-ui/core/styles'
import { CharacteristicColor } from 'hooks/useCharacteristicColors'
import { Characteristic } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import AppLink from 'components/UI/AppLink'
import AppTypography from 'components/UI/AppTypography'

interface AdvantageProps {
  characteristic: Characteristic
  title: string
  subtitle: string
  href: string
  color: CharacteristicColor
}

export default function Advantage({ characteristic, title, subtitle, href, color }: AdvantageProps): JSX.Element {
  const classes = useStyles({ color })

  return (
    <AppBox justifyContent="center" alignItems="center" className={classes.root}>
      <AppBox alignItems="center" spacing={3}>
        <AppLink href={href} className={classes.imageLink}>
          <AppEmoji name={characteristic} variant="h2" />
        </AppLink>
        <AppBox flexDirection="column" spacing={1}>
          <AppLink href={href}>
            <AppTypography variant="h5" className={classes.title}>
              {title}
            </AppTypography>
          </AppLink>
          <AppTypography>{subtitle}</AppTypography>
        </AppBox>
      </AppBox>
    </AppBox>
  )
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    background: (props: { color: CharacteristicColor }) =>
      `linear-gradient(90deg, ${props.color.start} 0%, ${props.color.end} 100%)`,
  },
  imageLink: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  title: {
    width: 215,
    textTransform: 'uppercase',
    fontWeight: 500,
  },
})
