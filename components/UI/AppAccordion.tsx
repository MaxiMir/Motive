import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import { useState } from 'react'
import AppIconText from './AppIcon'
import AppHeader from './AppHeader'
import { AppEmojiName } from './AppEmoji'

interface AppAccordionProps {
  name: AppEmojiName
  header: string | JSX.Element
  id: string
  ariaControls: string
  details: JSX.Element
  defaultExpanded?: boolean
  unmountOnExit?: boolean
  renderOnClick?: boolean
}

export default function AppAccordion({
  name,
  header,
  id,
  ariaControls,
  details,
  defaultExpanded,
  unmountOnExit,
  renderOnClick,
}: AppAccordionProps): JSX.Element {
  const [withDetails, setWithDetails] = useState(!renderOnClick)

  return (
    <Accordion defaultExpanded={defaultExpanded} TransitionProps={!unmountOnExit ? undefined : { unmountOnExit: true }}>
      <AccordionSummary
        expandIcon={<AppIconText color="primary">expand_more</AppIconText>}
        id={id}
        aria-controls={ariaControls}
        onClick={() => !withDetails && setWithDetails(true)}
      >
        <AppHeader name={name} variant="h6" component="h2" color="primary">
          {header}
        </AppHeader>
      </AccordionSummary>
      <AccordionDetails>{withDetails && details}</AccordionDetails>
    </Accordion>
  )
}
