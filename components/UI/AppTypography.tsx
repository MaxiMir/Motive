import { ElementType, FC } from 'react'
import { Typography, TypographyProps } from '@material-ui/core/'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export type AppTypographyProps = Omit<TypographyProps, 'variant' | 'color'> & {
  variant?: 'h1' | 'h2' | 'h4' | 'h5' | 'h6' | 'subtitle1'
  component?: ElementType
  color?: TypographyProps['color']
}

const AppTypography: FC<AppTypographyProps> = ({ variant, ...restProps }) => {
  const classes = useStyles()

  return <Typography className={variant && classes[variant]} variant={variant} {...restProps} />
}

const useStyles = makeStyles((theme) =>
  createStyles({
    h1: {
      fontSize: '3rem',
      lineHeight: '3.5rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '2.5rem',
        lineHeight: '3rem',
      },
    },
    h2: {
      fontSize: '3.75rem',
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.75,
    },
    h4: {
      fontSize: '2.125rem',
      lineHeight: 1.235,
    },
    h5: {
      fontWeight: 'bold',
      fontSize: '1.5rem',
      lineHeight: 1.334,
    },
    h6: {
      fontSize: '1.25rem',
      lineHeight: 1.6,
    },
  }),
)

export default AppTypography
