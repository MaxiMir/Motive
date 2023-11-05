import { Box, Stack } from '@mui/material'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { toMarkdown } from './helpers'
import { useDetectTruncated, useSwitchText } from './hooks'

const Switch = dynamic(() => import('./switch'))

interface MarkdownProps {
  text: string
  truncate?: boolean
  footnote?: boolean
}

function Markdown({ text, truncate, footnote }: MarkdownProps) {
  const [open, onClick] = useSwitchText(text)
  const [ref, truncated] = useDetectTruncated(text)
  const markdown = useMemo(() => toMarkdown(text), [text])
  const renderSwitching = open ? true : truncated
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
      {renderSwitching && <Switch open={open} onClick={onClick} />}
    </Stack>
  )
}

export default Markdown
