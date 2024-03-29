import { Button } from '@mui/material'
import Link from 'next/link'
import { getHashtagHref } from 'entities/page'

interface HashtagProps {
  hashtag: string
}

function Hashtag({ hashtag }: HashtagProps) {
  const href = getHashtagHref(hashtag)

  return (
    <Button size="small" variant="text" color="primary" href={href} component={Link}>
      #{hashtag}
    </Button>
  )
}

export default Hashtag
