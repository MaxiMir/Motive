import ReactMarkdown from 'react-markdown'
import sanitize from 'rehype-sanitize'
import { makeStyles } from '@material-ui/core/styles'
import AppTypography from 'components/UI/AppTypography'

interface AppMarkdownProps {
  text: string
}

export default function AppMarkdown({ text }: AppMarkdownProps): JSX.Element {
  const classes = useStyles()

  return (
    <ReactMarkdown
      linkTarget="_blank"
      rehypePlugins={[sanitize]}
      components={{
        p: ({ node, ...props }) => (
          <AppTypography variant="subtitle1" component="p">
            {props.children}
          </AppTypography>
        ),
      }}
      className={classes.markdown}
    >
      {text}
    </ReactMarkdown>
  )
}

const useStyles = makeStyles({
  markdown: {
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
  },
})
