import { useEffect, useState } from 'react'
import { Chip, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { SEARCH_ROUTE } from 'route'
import { Hashtag } from 'dto'
import AppBox from 'components/UI/AppBox'
import { getHashtags } from './helper'

interface HashtagsProps {
  hashtags: Hashtag[]
}

export default function Hashtags({ hashtags }: HashtagsProps): JSX.Element {
  const theme = useTheme()
  const classes = useStyles()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const hashtagNames = hashtags.map((h) => h.name)
  const [showingHashtags, setShowingHashtags] = useState(getHashtags(hashtagNames, isMobile))

  const onClick = () => setShowingHashtags(hashtagNames)

  useEffect(() => {
    setShowingHashtags(getHashtags(hashtagNames, isMobile))
  }, [hashtagNames, isMobile])

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
