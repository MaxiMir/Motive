import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import Icon from './Icon'

interface AccordionProps {
  id: string
  header: string | JSX.Element
  emoji: string
  details: JSX.Element
  defaultExpanded?: boolean
}

function Accordion({ header, id, details, defaultExpanded, emoji }: AccordionProps) {
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
        <Typography variant="h6" component="p">
          <Typography component="span" sx={{ mr: 0.5 }}>
            {emoji}
          </Typography>{' '}
          {header}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ overflow: 'auto' }}>{details}</AccordionDetails>
    </MuiAccordion>
  )
}

export default Accordion
