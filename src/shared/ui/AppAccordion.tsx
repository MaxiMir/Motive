import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import AppIcon from './AppIcon'
import EmojiHeader from './EmojiHeader'
import { AppEmojiName } from './AppEmoji'

interface AppAccordionProps {
  id: string
  name: AppEmojiName
  header: string | JSX.Element
  details: JSX.Element
  defaultExpanded?: boolean
}

function AppAccordion({ name, header, id, details, defaultExpanded }: AppAccordionProps) {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      TransitionProps={{ unmountOnExit: true }}
      disableGutters
      sx={{ backgroundColor: '#121212' }}
    >
      <AccordionSummary
        id={id}
        expandIcon={
          <AppIcon name="expand_more" sx={({ palette }) => ({ color: palette.grey[700] })} />
        }
      >
        <EmojiHeader name={name} variant="h6" component="h3" color="primary">
          {header}
        </EmojiHeader>
      </AccordionSummary>
      <AccordionDetails sx={{ overflow: 'auto' }}>{details}</AccordionDetails>
    </Accordion>
  )
}

export default AppAccordion
