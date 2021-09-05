import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Chip, useMediaQuery, useTheme } from '@material-ui/core'
import ROUTE from 'route'
import AppBox from 'components/UI/AppBox'

interface GoalCardHashtagsProps {
  hashtags: string[]
}

export default function GoalCardHashtags({ hashtags }: GoalCardHashtagsProps): JSX.Element {
  const theme = useTheme()
  const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [showingHashtags, setShowingHashtags] = useState(getInit(hashtags, isMobile))

  useEffect(() => {
    setShowingHashtags(getInit(hashtags, isMobile))
  }, [hashtags, isMobile])

  return (
    <AppBox flexWrap="wrap" spacing={1}>
      {showingHashtags?.map((hashtag) => (
        <Chip
          label={`${hashtag}`}
          variant="outlined"
          size="small"
          key={hashtag}
          onClick={() => router.push(`${ROUTE.SEARCH}/?q=${hashtag}`)}
        />
      ))}
      {hashtags.length !== showingHashtags.length && (
        <Chip label="..." variant="outlined" size="small" onClick={() => setShowingHashtags(hashtags)} />
      )}
    </AppBox>
  )
}

const getInit = (hashtags: string[], isMobile: boolean) => (!isMobile ? hashtags : hashtags.slice(0, 2))
