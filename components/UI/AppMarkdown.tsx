import { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import sanitize from 'rehype-sanitize'
import { Box, Typography } from '@mui/material'
import { toMarkdown } from 'helpers/prepare'

interface AppMarkdownProps {
  text: string
}

export default function AppMarkdown({ text }: AppMarkdownProps): JSX.Element {
  const markdown = toMarkdown(text)

  const renderParagraph = ({ children }: { children: ReactNode & ReactNode[] }) => (
    <Typography variant="subtitle1" component="p">
      {children}
    </Typography>
  )

  return (
    <Box
      sx={{
        '& p': {
          margin: '16px 0',
          '&:first-of-type': {
            marginTop: 0,
          },
          '&:last-of-type': {
            marginBottom: 0,
          },
        },
        '& a': {
          color: '#9f8e5d',
        },
      }}
    >
      <ReactMarkdown
        linkTarget="_blank"
        rehypePlugins={[sanitize]}
        components={{
          p: renderParagraph,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Box>
  )
}
