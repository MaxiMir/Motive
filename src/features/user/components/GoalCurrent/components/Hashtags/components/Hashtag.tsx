import { useRouter } from 'next/router'
import { Chip } from '@mui/material'
import { getHashtagHref } from '@href'

interface HashtagProps {
  label: string
}

function Hashtag({ label }: HashtagProps) {
  const { push } = useRouter()

  const onClick = () => {
    const href = getHashtagHref(label)
    push(href)
  }

  return (
    <Chip
      label={label}
      variant="outlined"
      color="primary"
      size="small"
      sx={{
        cursor: 'pointer',
        transition: 'all .2s ease-in-out',
        '&:hover': {
          opacity: 0.5,
        },
      }}
      onClick={onClick}
    />
  )
}

export default Hashtag
