import ReactMarkdown from 'react-markdown'

interface TextProps {
  text: string
}

export default function Text({ text }: TextProps): JSX.Element {
  return <ReactMarkdown>{text}</ReactMarkdown>
}
