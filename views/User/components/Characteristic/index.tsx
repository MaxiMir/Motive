import { Button, makeStyles } from '@material-ui/core'
import { UserCharacteristicName } from 'dto'
import CharacteristicBase from 'components/Characteristic'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppOptionalTooltip from 'components/UI/AppOptionalTooltip'
import { getCharacteristicHref, getCharacteristicTitle } from './helper'

interface CharacteristicProps {
  name: UserCharacteristicName
  value: number
  href: string
  color: string
}

export default function Characteristic(props: CharacteristicProps): JSX.Element {
  const { color, name, href } = props
  const classes = useStyles({ color })
  const characteristicHref = getCharacteristicHref(name, href)
  const characteristicTitle = getCharacteristicTitle(name)

  return (
    <AppOptionalTooltip title={characteristicTitle}>
      <Button className={classes.button} href={characteristicHref}>
        <AppBox flexDirection="column" spacing={0.5} width={60}>
          <AppTypography className={classes.title}>{name}</AppTypography>
          <CharacteristicBase tmpl="user" {...props} />
        </AppBox>
      </Button>
    </AppOptionalTooltip>
  )
}

const useStyles = makeStyles({
  button: {
    textTransform: 'none',
  },
  title: {
    fontSize: '0.75rem',
    color: (props: { color: string }) => props.color,
  },
})
