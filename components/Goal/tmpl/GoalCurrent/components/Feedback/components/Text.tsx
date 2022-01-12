import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import sanitize from 'rehype-sanitize'
import { makeStyles } from '@material-ui/core/styles'

interface TextProps {
  text: string
}

export default function Text({ text }: TextProps): JSX.Element {
  const classes = useStyles()

  return (
    <ReactMarkdown
      linkTarget="_blank"
      rehypePlugins={[sanitize]}
      className={clsx(classes.markdown, 'MuiTypography-root', 'MuiTypography-body1')}
    >
      {text}
    </ReactMarkdown>
  )
}

const useStyles = makeStyles({
  markdown: {
    '& p': {
      margin: 0,
    },
    '& a': {
      color: '#9f8e5d',
    },
  },
})
