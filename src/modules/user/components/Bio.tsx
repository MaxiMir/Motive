import AppMarkdown from '@ui/AppMarkdown'

interface BioProps {
  bio: string
}

export default function Bio({ bio }: BioProps) {
  return <AppMarkdown text={bio} />
}
