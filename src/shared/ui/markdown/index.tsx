import { Box, Stack } from '@mui/material'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import { useDetectTruncated, toMarkdown } from './lib'

const Switch = dynamic(() => import('./switch'))

interface MarkdownProps {
  text: string
  truncate?: boolean
  footnote?: boolean
}

function Markdown({ text, truncate, footnote }: MarkdownProps) {
  const [open, toggle] = useToggle()
  const markdown = useMemo(() => toMarkdown(text), [text])
  const [ref, truncated] = useDetectTruncated()
  const breakCount = text.split('\r\n').length
  const renderSwitching = open ? true : truncate && (truncated || breakCount > 1)
  const fontSize = footnote ? 12 : 'initial'

  return (
    <Stack alignItems="flex-start" gap={1}>
      <Box
        ref={ref}
        sx={(theme) => ({
          fontSize,
          color: footnote ? theme.palette.text.disabled : 'common.white',
          '& > *:first-of-type': {
            display: '-webkit-box',
            WebkitLineClamp: truncate && !open ? '3' : 'unset',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          },
          '& > *:not(:first-of-type)': {
            display: truncated || !open ? 'none' : '-webkit-box',
          },
          '& p': {
            fontSize,
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
        })}
      >
        {markdown}
      </Box>
      {renderSwitching && <Switch open={open} onClick={toggle} />}
    </Stack>
  )
}

export default Markdown
