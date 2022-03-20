import { useRouter } from 'next/router'
import { Chip, makeStyles } from '@material-ui/core'
import { getHashtagHref } from '../helper'

export interface HashtagChipProps {
  tmpl: 'chip'
  name: string
}

export default function HashtagChip({ name }: HashtagChipProps): JSX.Element {
  const classes = useStyles()
  const router = useRouter()

  const onClick = () => {
    const href = getHashtagHref(name)

    router.push(href)
  }

  return (
    <Chip
      label={`#${name}`}
      variant="outlined"
      color="primary"
      size="small"
      onClick={onClick}
      className={classes.chip}
    />
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
