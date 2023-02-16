import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { ChangeEvent } from 'react'
import { TopicType } from 'shared/api'

interface TypeSelectionProps {
  type: TopicType
  setType: (type: TopicType) => void
}

function TypeSelection({ type, setType }: TypeSelectionProps) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value as TopicType)
  }

  return (
    <FormControl sx={{ pl: 8 }}>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={type}
        onChange={onChange}
      >
        <FormControlLabel
          value={TopicType.Question}
          label="вопрос"
          control={<Radio size="small" />}
        />
        <FormControlLabel
          value={TopicType.Support}
          label="поддержка"
          control={<Radio size="small" />}
        />
      </RadioGroup>
    </FormControl>
  )
}

export default TypeSelection
