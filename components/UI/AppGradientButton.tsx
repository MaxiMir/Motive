import { FC } from 'react'
import { Button, ButtonProps, createStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

type AppGradientButtonProps = Omit<ButtonProps, 'variant' | 'color' | 'className'>

const AppGradientButton: FC<AppGradientButtonProps> = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.buttonWrap}>
      <Button variant="text" color="primary" className={classes.button} {...props} />
    </div>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    buttonWrap: {
      position: 'relative',
      background: `linear-gradient(to top left, ${theme.palette.success.dark}, ${theme.palette.info.dark})`,
      padding: 1,
      borderRadius: 5,
    },
    button: {
      minWidth: 130,
      textTransform: 'none',
      background: theme.palette.background.default,

      '&:disabled': {
        color: theme.palette.secondary.dark,
      },
    },
  }),
)

export default AppGradientButton
