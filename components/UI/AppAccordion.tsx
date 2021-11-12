import { ChangeEvent, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import { scrollToElem } from 'helpers/dom'
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
  const [expanded, setExpanded] = useState(defaultExpanded || false)
  const [withDetails, setWithDetails] = useState(!renderOnClick)

  const onChange = (_: ChangeEvent<unknown>, isExpanded: boolean) => {
    !withDetails && setWithDetails(true)
    setExpanded(isExpanded)
    isExpanded && setTimeout(() => scrollToElem(id), 300)
  }

  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      TransitionProps={!unmountOnExit ? undefined : { unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<AppIconText color="primary">expand_more</AppIconText>}
        id={id}
        aria-controls={ariaControls}
      >
        <AppHeader name={name} variant="h6" component="h2" color="primary">
          {header}
        </AppHeader>
      </AccordionSummary>
      <AccordionDetails>{withDetails && <>{details}</>}</AccordionDetails>
    </Accordion>
  )
}
