import { FormControl, MenuItem, Select, Stack, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { TopicType, UserBaseDto } from 'shared/api'
import { useMessages } from './lib'
import { SupportInfo } from './supportInfo'

const SupportHelp = dynamic(() => import('./supportHelp'))

interface SelectingTypeProps {
  owner: UserBaseDto
  type: TopicType
  setType: (type: TopicType) => void
}

function SelectingType({ owner, type, setType }: SelectingTypeProps) {
  const [open, setOpen] = useState(false)
  const messages = useMessages()

  const toggleOpen = () => setOpen(!open)

  const onChange = (event: SelectChangeEvent<TopicType>) => {
    setType(event.target.value as TopicType)
    setOpen(false)
  }

  return (
    <Stack gap={1} pl={8}>
      <Stack direction="row" alignItems="center" gap={1} height={40}>
        <FormControl variant="standard">
          <Select
            value={type}
            label={messages.label}
            size="small"
            sx={{ minWidth: 160, maxWidth: 240 }}
            onChange={onChange}
          >
            <MenuItem value={TopicType.Question}>{messages.questionText}</MenuItem>
            <MenuItem value={TopicType.Support}>
              {messages.supportingText} {owner.name}
            </MenuItem>
          </Select>
        </FormControl>
        {type === TopicType.Support && <SupportHelp onClick={toggleOpen} />}
      </Stack>
      <SupportInfo open={open} onClose={toggleOpen} />
    </Stack>
  )
}

export default SelectingType
