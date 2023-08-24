import { Box, Stack } from '@mui/material'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import { useDetectTruncated, toMarkdown } from './lib'

const Switch = dynamic(() => import('./switch'))

interface MarkdownProps {
  text: string
  truncate?: boolean
  compact?: boolean
}

function Markdown({ text, truncate, compact }: MarkdownProps) {
  const [open, toggle] = useToggle()
  const markdown = useMemo(() => toMarkdown(text), [text])
  const [ref, truncated] = useDetectTruncated()
  const breakCount = text.split('\r\n').length
  const renderSwitching = open ? true : truncate && (truncated || breakCount > 1)

  return (
    <Stack alignItems="flex-start" gap={1}>
      <Box
        ref={ref}
        sx={{
          fontSize: compact ? 12 : 'initial',
          '& > *:first-of-type': {
            display: '-webkit-box',
            WebkitLineClamp: truncate && !open ? '3' : 'unset',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          },
          '& > *:not(:first-of-type)': {
            display: truncated || !open ? 'none' : '-webkit-box',
          },
          '& ul': {
            paddingLeft: 2,
          },
          '& ol': {
            paddingLeft: 0,
            '& li': {
              display: 'list-item',
              listStylePosition: 'inside',
            },
          },
        }}
      >
        {markdown}
      </Box>
      {renderSwitching && <Switch open={open} onClick={toggle} />}
    </Stack>
  )
}

export default Markdown
