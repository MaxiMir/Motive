import { Box } from '@mui/material'
import Hashtag from './components/Hashtag'

interface HashtagsProps {
  hashtags: string[]
}

function Hashtags({ hashtags }: HashtagsProps) {
  return (
    <Box display="flex" flexWrap="wrap" gap={1}>
      {hashtags?.map((hashtag) => (
        <Hashtag label={hashtag} key={hashtag} />
      ))}
    </Box>
  )
}

export default Hashtags