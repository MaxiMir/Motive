import {
  AccordionDetails,
  Accordion as MuiAccordion,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/material'
import { ReactNode } from 'react'
import Icon from './Icon'

interface AccordionProps {
  id?: string
  iconStart: ReactNode
  summary: string | ReactNode
  iconEnd?: ReactNode
  details: ReactNode
  defaultExpanded?: boolean
}

function Accordion({ id, iconStart, summary, iconEnd, details, defaultExpanded }: AccordionProps) {
  return (
    <MuiAccordion
      defaultExpanded={defaultExpanded}
      TransitionProps={{ unmountOnExit: true }}
      disableGutters
      sx={(theme) => ({ backgroundColor: theme.palette.grey[900] })}
    >
      <AccordionSummary
        id={id}
        expandIcon={
          <Icon name="expand_more" sx={(theme) => ({ color: theme.palette.grey[700] })} />
        }
      >
        <Stack direction="row" alignItems="center" gap={1}>
          {iconStart}
          <Typography variant="h6" component="p">
            {summary}
          </Typography>
          {iconEnd}
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ overflow: 'auto' }}>{details}</AccordionDetails>
    </MuiAccordion>
  )
}

export default Accordion
