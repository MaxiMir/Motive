import { useEffect, useState } from 'react'
import { Chip, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { SEARCH_ROUTE } from 'route'
import AppBox from 'components/UI/AppBox'
import { getHashtags } from './helper'

interface HashtagsProps {
  hashtags: string[]
}

export default function Hashtags({ hashtags }: HashtagsProps): JSX.Element {
  const theme = useTheme()
  const classes = useStyles()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [showingHashtags, setShowingHashtags] = useState(getHashtags(hashtags, isMobile))

  const onClick = () => setShowingHashtags(hashtags)

  useEffect(() => {
    setShowingHashtags(getHashtags(hashtags, isMobile))
  }, [hashtags, isMobile])

  return (
    <AppBox flexWrap="wrap" spacing={1}>
      {showingHashtags?.map((hashtag) => (
        <Chip
          component="a"
          label={hashtag}
          variant="outlined"
          size="small"
          href={`${SEARCH_ROUTE}/?q=${hashtag}&type=tag`}
          className={classes.chip}
          key={hashtag}
        />
      ))}
      {hashtags.length !== showingHashtags.length && (
        <Chip label="..." variant="outlined" size="small" onClick={onClick} />
      )}
    </AppBox>
  )
}

const useStyles = makeStyles({
  chip: {
    cursor: 'pointer',
  },
})
