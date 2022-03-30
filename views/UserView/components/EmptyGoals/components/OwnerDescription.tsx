import { Button, makeStyles } from '@material-ui/core'
import { SEARCH } from 'route'
import { clickOnElem } from 'helpers/dom'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'

export default function OwnerDescription(): JSX.Element {
  const classes = useStyles()

  const onOwnClick = () => clickOnElem('create')

  return (
    <AppBox alignItems="center" spacing={1}>
      <AppTypography>You can create</AppTypography>
      <Button size="small" variant="text" className={classes.own} onClick={onOwnClick}>
        <AppTypography>your own</AppTypography>
      </Button>
      <AppTypography>or use the</AppTypography>
      <Button size="small" variant="text" href={SEARCH} className={classes.link}>
        <AppTypography>search</AppTypography>
      </Button>
    </AppBox>
  )
}

const useStyles = makeStyles({
  own: {
    textTransform: 'none',
    color: '#4DA0EC',
  },
  link: {
    textTransform: 'none',
    color: '#F9E5A1',
  },
})
