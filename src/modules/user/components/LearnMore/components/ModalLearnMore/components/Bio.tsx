import { Box } from '@mui/material'
import AppMarkdown from '@ui/AppMarkdown'
import AppIcon from '@ui/AppIcon'

interface BioProps {
  bio: string
}

export default function Bio({ bio }: BioProps) {
  return (
    <>
      <Box display="flex" alignItems="center" gap={1}>
        <AppIcon name="short_text" sx={{ color: 'zen.sand' }} />:
      </Box>
      <AppMarkdown text={bio} />
    </>
  )
}
