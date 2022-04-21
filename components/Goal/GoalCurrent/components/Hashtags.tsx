import { Box } from '@mui/material'
import HashtagChip from 'components/Hashtag/HashtagChip'

interface HashtagsProps {
  hashtags: string[]
}

export default function Hashtags({ hashtags }: HashtagsProps): JSX.Element {
  return (
    <Box display="flex" flexWrap="wrap" gap={1}>
      {hashtags?.map((hashtag) => (
        <HashtagChip name={hashtag} key={hashtag} />
      ))}
    </Box>
  )
}
