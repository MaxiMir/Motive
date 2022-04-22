import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import AppIcon from './AppIcon'
import AppTitle from './AppTitle'
import { AppEmojiName } from './AppEmoji'

interface AppAccordionProps {
  id: string
  name: AppEmojiName
  header: string | JSX.Element
  ariaControls: string
  details: JSX.Element
  defaultExpanded?: boolean
  unmountOnExit?: boolean
}

export default function AppAccordion({
  name,
  header,
  id,
  ariaControls,
  details,
  defaultExpanded,
  unmountOnExit,
}: AppAccordionProps): JSX.Element {
  return (
    <Accordion defaultExpanded={defaultExpanded} TransitionProps={!unmountOnExit ? undefined : { unmountOnExit: true }}>
      <AccordionSummary id={id} expandIcon={<AppIcon name="expand_more" />} aria-controls={ariaControls}>
        <AppTitle name={name} variant="h6" component="h4" color="primary">
          {header}
        </AppTitle>
      </AccordionSummary>
      <AccordionDetails sx={{ overflow: 'auto' }}>{details}</AccordionDetails>
    </Accordion>
  )
}
