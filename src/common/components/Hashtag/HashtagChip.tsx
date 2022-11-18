import { useRouter } from 'next/router'
import { Chip } from '@mui/material'
import { getHashtagHref } from './helper'

interface HashtagChipProps {
  label: string
}

export default function HashtagChip({ label }: HashtagChipProps) {
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
