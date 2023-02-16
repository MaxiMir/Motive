import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { ChangeEvent } from 'react'
import { TopicType } from 'shared/api'
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
        <FormControlLabel
          value={TopicType.Support}
          label={messages.supportingLabel.toLowerCase()}
          control={<Radio size="small" />}
        />
      </RadioGroup>
    </FormControl>
  )
}

export default TypeSelection
