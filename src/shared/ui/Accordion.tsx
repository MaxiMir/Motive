import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
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
          <Icon name="expand_more" sx={(theme) => ({ color: theme.palette.grey[700] })} />
        }
      >
        <Stack direction="row" gap={1}>
          <Typography variant="h6" component="p">
            {emoji}
          </Typography>
          <Typography variant="h6" component="p">
            {header}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ overflow: 'auto' }}>{details}</AccordionDetails>
    </MuiAccordion>
  )
}

export default Accordion
