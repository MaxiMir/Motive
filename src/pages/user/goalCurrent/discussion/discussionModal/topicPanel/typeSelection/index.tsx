import { FormControl, MenuItem, Select, Stack, SelectChangeEvent } from '@mui/material'
import dynamic from 'next/dynamic'
import { TopicType, UserBaseDto } from 'shared/api'
import { useMessages } from './lib'

const SupportInfo = dynamic(() => import('./supportInfo'))

interface TypeSelectionProps {
  owner: UserBaseDto
  type: TopicType
  setType: (type: TopicType) => void
}

function TypeSelection({ owner, type, setType }: TypeSelectionProps) {
  const messages = useMessages()

  const onChange = (event: SelectChangeEvent<TopicType>) => {
    setType(event.target.value as TopicType)
  }

  return (
    <Stack direction="row" alignItems="center" gap={1} pl={8}>
      <FormControl variant="standard">
        <Select
          value={type}
          label={messages.label}
          size="small"
          sx={{ minWidth: 160 }}
          onChange={onChange}
        >
          <MenuItem value={TopicType.Question}>{messages.questionText}</MenuItem>
          <MenuItem value={TopicType.Support}>
            {messages.supportingText} {owner.name}
          </MenuItem>
        </Select>
      </FormControl>
      {type === TopicType.Support && <SupportInfo />}
    </Stack>
  )
}

export default TypeSelection
