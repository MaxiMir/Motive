import { Box, Stack } from '@mui/material'
import { styled } from '@mui/system'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import { useDetectTruncated, toMarkdown } from './lib'

const Switching = dynamic(() => import('./switching'))

interface MarkdownProps {
  text: string
  switching?: boolean
}

function Markdown({ text, switching }: MarkdownProps) {
  const [open, toggle] = useToggle()
  const markdown = useMemo(() => toMarkdown(text), [text])
  const { ref, truncated } = useDetectTruncated()
  const breakCount = text.split('\r\n').length
  const renderSwitching = switching && (truncated || breakCount > 1)

  return (
    <Stack alignItems="flex-start" gap={1}>
      <StyledBox
        ref={ref}
        sx={
          !switching
            ? undefined
            : {
                '& > *:first-child': {
                  display: '-webkit-box',
                  WebkitLineClamp: !open ? '3' : 'unset',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                },
                '& > *:not(:first-child)': {
                  display: truncated || !open ? 'none' : '-webkit-box',
                },
              }
        }
      >
        {markdown}
      </StyledBox>
      {renderSwitching && <Switching open={open} onClick={toggle} />}
    </Stack>
  )
}

const StyledBox = styled(Box)({
  '& ol': {
    paddingLeft: 0,
    '& li': {
      display: 'list-item',
      listStylePosition: 'inside',
    },
  },
})

export default Markdown
