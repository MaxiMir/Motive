import { Chip } from '@mui/material'
import useLocale from 'hooks/useLocale'
import { getHashtagHref } from './helper'

export interface HashtagChipProps {
  name: string
}

export default function HashtagChip({ name }: HashtagChipProps) {
  const { go } = useLocale()

  const onClick = () => {
    const href = getHashtagHref(name)

    go(href)
  }

  return (
    <Chip
      label={`#${name}`}
      variant="outlined"
      color="primary"
      size="small"
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        transition: 'all .2s ease-in-out',
        '&:hover': {
          opacity: 0.5,
        },
      }}
    />
  )
}
