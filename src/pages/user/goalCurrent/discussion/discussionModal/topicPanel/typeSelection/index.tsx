import { FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Stack } from '@mui/material'
import { ChangeEvent } from 'react'
import { SupportRules } from 'entities/characteristic'
import { TopicType } from 'shared/api'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useMessages } from './lib'

interface TypeSelectionProps {
  type: TopicType
  setType: (type: TopicType) => void
}

function TypeSelection({ type, setType }: TypeSelectionProps) {
  const messages = useMessages()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value as TopicType)
  }

  return (
    <FormControl sx={{ pl: 8 }}>
      <RadioGroup row aria-labelledby={messages.labelledby} value={type} onChange={onChange}>
        <FormControlLabel
          value={TopicType.Question}
          label={messages.questionLabel}
          control={<Radio size="small" />}
        />
        <Stack direction="row">
          <FormControlLabel
            value={TopicType.Support}
            label={messages.supportingLabel.toLowerCase()}
            control={<Radio size="small" />}
          />
          <TooltipArrow title={<SupportRules />}>
            <IconButton color="info">
              <Icon name="help_outline" />
            </IconButton>
          </TooltipArrow>
        </Stack>
      </RadioGroup>
    </FormControl>
  )
}

export default TypeSelection
