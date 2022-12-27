import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import AppIcon from './AppIcon'
import AppHeader from './AppHeader'
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
    <Accordion defaultExpanded={defaultExpanded} TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary id={id} expandIcon={<AppIcon name="expand_more" />}>
        <AppHeader name={name} variant="h6" component="h3" color="primary">
          {header}
        </AppHeader>
      </AccordionSummary>
      <AccordionDetails sx={{ overflow: 'auto' }}>{details}</AccordionDetails>
    </Accordion>
  )
}

export default AppAccordion
