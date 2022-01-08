import { Chip, makeStyles } from '@material-ui/core'
import { SEARCH_ROUTE } from 'route'
import AppBox from 'components/UI/AppBox'

interface HashtagsProps {
  hashtags: string[]
}

export default function Hashtags({ hashtags }: HashtagsProps): JSX.Element {
  const classes = useStyles()

  return (
    <AppBox flexWrap="wrap" spacing={1}>
      {hashtags?.map((name) => (
        <Chip
          component="a"
          label={`#${name}`}
          variant="outlined"
          color="primary"
          size="small"
          href={`${SEARCH_ROUTE}/?q=${name}&type=tag`}
          className={classes.chip}
          key={name}
        />
      ))}
    </AppBox>
  )
}

const useStyles = makeStyles({
  chip: {
    cursor: 'pointer',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      opacity: 0.5,
    },
  },
})