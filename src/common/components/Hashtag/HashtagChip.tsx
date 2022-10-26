import { useRouter } from 'next/router'
import { Chip } from '@mui/material'
import { getHashtagHref } from './helper'

export interface HashtagChipProps {
  name: string
}

export default function HashtagChip({ name }: HashtagChipProps) {
  const { push } = useRouter()

  const onClick = () => {
    const href = getHashtagHref(name)

    push(href)
  }

  return (
    <Chip
      label={`#${name}`}
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
