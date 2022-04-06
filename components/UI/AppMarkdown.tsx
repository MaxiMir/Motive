import ReactMarkdown from 'react-markdown'
import sanitize from 'rehype-sanitize'
import { Typography } from '@mui/material'
import { toMarkdown } from 'helpers/prepare'
import AppBox from './AppBox'

interface AppMarkdownProps {
  text: string
}

export default function AppMarkdown({ text }: AppMarkdownProps): JSX.Element {
  const markdown = toMarkdown(text)

  return (
    <AppBox
      display={undefined}
      sx={{
        '& p': {
          margin: '16px 0',
          '&:first-child': {
            marginTop: 0,
          },
          '&:last-child': {
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
          p: ({ node, ...props }) => (
            <Typography variant="subtitle1" component="p">
              {props.children}
            </Typography>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </AppBox>
  )
}
