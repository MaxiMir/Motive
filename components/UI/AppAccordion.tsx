import { ChangeEvent, useState } from 'react'
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
  const [expanded, setExpanded] = useState(defaultExpanded || false)
  const [withDetails, setWithDetails] = useState(!renderOnClick)

  const onChange = (_: ChangeEvent<unknown>, isExpanded: boolean) => {
    !withDetails && setWithDetails(true)
    setExpanded(isExpanded)
  }

  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      TransitionProps={!unmountOnExit ? undefined : { unmountOnExit: true }}
    >
      <AccordionSummary id={id} expandIcon={<AppIcon name="expand_more" />} aria-controls={ariaControls}>
        <AppTitle name={name} variant="h6" component="h4" color="primary">
          {header}
        </AppTitle>
      </AccordionSummary>
      <AccordionDetails>{withDetails && details}</AccordionDetails>
    </Accordion>
  )
}
