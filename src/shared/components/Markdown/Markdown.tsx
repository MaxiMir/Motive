import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import MarkdownToJSX from 'markdown-to-jsx'
import { Box, Link, Typography } from '@mui/material'
import useToggle from '@hooks/useToggle'
import { useDetectTruncated } from './hooks/useDetectTruncated'
import { getBreakCount, toMarkdown } from './helpers/content'
import { MarkdownLinkProps, MarkdownTypographyProps } from './types'

const ToggleButton = dynamic(() => import('./components/ToggleButton'))

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
        '& div': {
          ':first-of-type': {
            display: '-webkit-box',
            WebkitLineClamp: !open ? '3' : 'unset',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          },
          ':not(:first-of-type)': {
            display: truncated || !open ? 'none' : 'block',
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
      {renderButton && <ToggleButton open={open} onClick={toggle} />}
    </Box>
  )
}

export default Markdown
