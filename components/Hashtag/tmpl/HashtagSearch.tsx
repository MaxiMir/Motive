import { useRouter } from 'next/router'
import { Button, makeStyles } from '@material-ui/core'
import { numberToShort } from 'helpers/prepare'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import { getHashtagHref } from './helper'

export interface HashtagSearchProps {
  tmpl: 'search'
  name: string
  gradient?: string
  views: number
}

export default function HashtagSearch({ name, gradient, views }: HashtagSearchProps): JSX.Element {
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
        p={1}
        className={classes.wrap}
      >
        <AppTypography variant="subtitle1" component="p" className={classes.name}>
          <b>#{name}</b>
        </AppTypography>
        <AppTypography variant="h4" component="p" className={classes.shortName}>
          <b>{name}</b>
        </AppTypography>
        <AppTypography className={classes.count}>{shortViews}</AppTypography>
      </AppBox>
    </Button>
  )
}

type StylesProps = Pick<HashtagSearchProps, 'gradient'>

const useStyles = makeStyles({
  button: {
    width: '100%',
    aspectRatio: '1',
    borderRadius: 12,
    backgroundImage: (props: StylesProps) => props.gradient,
    '& .MuiButton-label': {
      height: '100%',
    },
  },
  wrap: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  name: {
    textTransform: 'none',
  },
  shortName: {
    background: 'linear-gradient(to right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    color: 'rgba(255, 255, 255, 0.05)',
  },
  count: {
    opacity: 0.5,
  },
})
