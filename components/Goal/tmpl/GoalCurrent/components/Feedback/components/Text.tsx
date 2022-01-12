import ReactMarkdown from 'react-markdown'
import AppTypography from 'components/UI/AppTypography'

interface TextProps {
  text: string
}

export default function Text({ text }: TextProps): JSX.Element {
  return (
    <AppTypography>
      <ReactMarkdown>{text}</ReactMarkdown>
    </AppTypography>
  )
}
