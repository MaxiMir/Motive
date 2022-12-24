import Link from 'next/link'
import { Button } from '@mui/material'
import { getHashtagHref } from '@features/user'

interface HashtagProps {
  hashtag: string
}

function Hashtag({ hashtag }: HashtagProps) {
  const href = getHashtagHref(hashtag)

  return (
    <Button
      href={href}
      variant="text"
      color="primary"
      size="small"
      sx={{ textTransform: 'none' }}
      component={Link}
    >
      {hashtag}
    </Button>
  )
}

export default Hashtag
