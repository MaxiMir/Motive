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
      <AppBox className={classes.wrap}>
        <AppBox
          alignItems="flex-start"
          justifyContent="space-between"
          flexDirection="column"
          spacing={1}
          p={2}
          width="100%"
          height="100%"
        >
          <AppTypography variant="h6" component="p">
            {name}
          </AppTypography>
          <AppTypography variant="h4" component="p" className={classes.count}>
            <b>{shortViews}</b>
          </AppTypography>
        </AppBox>
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
      background: 'rgba(1, 1, 1, 0.1)',
    },
    count: {
      alignSelf: 'flex-end',
      opacity: 0.5,
    },
  }),
)
