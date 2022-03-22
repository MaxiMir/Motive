import { useRouter } from 'next/router'
import { Button, createStyles, makeStyles } from '@material-ui/core'
import { numberToShort } from 'helpers/prepare'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import { getHashtagHref } from './helper'

export interface HashtagGradientProps {
  tmpl: 'gradient'
  name: string
  gradient?: string
  views: number
}

export default function HashtagGradient({ name, gradient, views }: HashtagGradientProps): JSX.Element {
  const classes = useStyles({ gradient })
  const router = useRouter()
  const shortViews = numberToShort(views)

  const onClick = () => {
    const href = getHashtagHref(name)

    router.push(href)
  }

  return (
    <Button onClick={onClick} className={classes.button}>
      <AppBox
        alignItems="flex-start"
        flexDirection="column"
        justifyContent="space-between"
        p={2}
        className={classes.wrap}
      >
        <AppTypography variant="subtitle1" component="p">
          <b>{name}</b>
        </AppTypography>
        <AppTypography variant="h4" component="p" className={classes.shortName}>
          <b>{name}</b>
        </AppTypography>
        <AppTypography className={classes.count}>{shortViews}</AppTypography>
      </AppBox>
    </Button>
  )
}

type StylesProps = Pick<HashtagGradientProps, 'gradient'>

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      flex: '1 1 calc(16% - 13px)',
      paddingBottom: 'calc(16% - 13px)',
      height: 0,
      flexGrow: 0,
      borderRadius: 12,
      backgroundImage: (props: StylesProps) => props.gradient,
      [theme.breakpoints.between('sm', 'md')]: {
        flex: '1 1 calc(25% - 12px)',
        paddingBottom: 'calc(25% - 12px)',
        maxWidth: 'calc(25% - 12px)',
      },
      [theme.breakpoints.down('xs')]: {
        flex: '1 1 calc(50% - 12px)',
        paddingBottom: 'calc(50% - 12px)',
      },
    },
    wrap: {
      width: '100%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      overflow: 'hidden',
    },
    count: {
      opacity: 0.5,
    },
    shortName: {
      background: 'linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      color: 'rgba(255, 255, 255, 0.05)',
      position: 'relative',
    },
  }),
)
