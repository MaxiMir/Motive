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
  emoji?: string
  icon?: JSX.Element
  details: JSX.Element
  defaultExpanded?: boolean
}

function Accordion({ id, header, emoji, icon, details, defaultExpanded }: AccordionProps) {
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
          {emoji && (
            <Typography variant="h6" component="p">
              {emoji}
            </Typography>
          )}
          {icon}
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
