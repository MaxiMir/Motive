import { Box, Link, Typography } from '@mui/material'
import MarkdownToJSX from 'markdown-to-jsx'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import { useDetectTruncated, getBreakCount, toMarkdown } from './lib'
import { MarkdownLinkProps, MarkdownTypographyProps } from './types'

const ShowMore = dynamic(() => import('./ui').then((m) => m.ShowMore))

interface MarkdownProps {
  text: string
}

function Markdown({ text }: MarkdownProps) {
  const [open, toggle] = useToggle()
  const markdown = useMemo(() => toMarkdown(text), [text])
  const breakCount = getBreakCount(text)
  const { ref, truncated } = useDetectTruncated()
  const renderButton = truncated || breakCount > 1

  const renderLink = (props: MarkdownLinkProps) => (
    <Link {...props} target="_blank" rel="nofollow noopener noreferrer" />
  )

  const renderParagraph = (props: MarkdownTypographyProps) => (
    <Typography {...props} sx={({ spacing }) => ({ margin: spacing(0, 0, 1) })} />
  )

  return (
    <Box
      ref={ref}
      sx={{
        '& div > *': {
          ':first-of-type': {
            display: '-webkit-box',
            WebkitLineClamp: !open ? '3' : 'unset',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          },
          ':not(:first-of-type)': {
            display: truncated || !open ? 'none' : '-webkit-box',
          },
        },
      }}
    >
      <MarkdownToJSX
        options={{
          overrides: {
            a: renderLink,
            p: renderParagraph,
          },
        }}
      >
        {markdown}
      </MarkdownToJSX>
      {renderButton && <ShowMore open={open} onClick={toggle} />}
    </Box>
  )
}

export default Markdown
