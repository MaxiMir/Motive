import { Link, LinkProps, Typography } from '@mui/material'
import { compiler } from 'markdown-to-jsx'
import Container from 'shared/ui/container'
import { useMessages } from './lib'

export function PrivacyPolicyPage() {
  const messages = useMessages()
  const content = compiler(messages.content, {
    wrapper: null,
    overrides: {
      p: Typography,
      a: renderLink,
    },
  })

  function renderLink(props: LinkProps) {
    return <Link {...props} target="_blank" rel="nofollow noopener noreferrer" />
  }

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 3 }}>
        📜 {messages.header}
      </Typography>
      {content}
    </Container>
  )
}
