import { Accordion as MuiAccordion, AccordionDetails, AccordionSummary } from '@mui/material'
import Icon from './Icon'
import EmojiHeader from './EmojiHeader'
import { EmojiName } from './Emoji'

interface AccordionProps {
  id: string
  name: EmojiName
  header: string | JSX.Element
  details: JSX.Element
  defaultExpanded?: boolean
}

function Accordion({ name, header, id, details, defaultExpanded }: AccordionProps) {
  return (
    <MuiAccordion
      defaultExpanded={defaultExpanded}
      TransitionProps={{ unmountOnExit: true }}
      disableGutters
      sx={{ backgroundColor: '#121212' }}
    >
      <AccordionSummary
        id={id}
        expandIcon={
          <Icon name="expand_more" sx={({ palette }) => ({ color: palette.grey[700] })} />
        }
      >
        <EmojiHeader name={name} variant="h6" component="h3" color="primary">
          {header}
        </EmojiHeader>
      </AccordionSummary>
      <AccordionDetails sx={{ overflow: 'auto' }}>{details}</AccordionDetails>
    </MuiAccordion>
  )
}

export default Accordion
