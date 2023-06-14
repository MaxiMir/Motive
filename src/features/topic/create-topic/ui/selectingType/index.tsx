import { FormControl, Stack, Radio, FormControlLabel, RadioGroup } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useIntl } from 'react-intl'
import { TopicType, UserBaseDto } from 'shared/api'
import { SupportHelp } from './supportHelp'
import { SupportInfo } from './supportInfo'

interface SelectingTypeProps {
  owner: UserBaseDto
  type: TopicType
  setType: (type: TopicType) => void
}

function SelectingType({ owner, type, setType }: SelectingTypeProps) {
  const [open, setOpen] = useState(false)
  const { formatMessage } = useIntl()
  const labelledby = formatMessage({ id: 'common.message-type' })
  const questionText = formatMessage({ id: 'common.question' })
  const supportingText = formatMessage({ id: 'common.supporting' })

  const toggleOpen = () => setOpen(!open)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value as TopicType)
    setOpen(false)
  }

  return (
    <Stack gap={1}>
      <Stack direction="row" alignItems="center" gap={1} pl={8}>
        <FormControl variant="standard">
          <RadioGroup row aria-labelledby={labelledby} name="type" value={type} onChange={onChange}>
            <FormControlLabel
              value={TopicType.Question}
              control={<Radio size="small" />}
              label={questionText}
            />
            <FormControlLabel
              value={TopicType.Support}
              control={<Radio size="small" />}
              label={
                <Stack direction="row" alignItems="center" gap={1}>
                  {supportingText} {owner.name} <SupportHelp onClick={toggleOpen} />
                </Stack>
              }
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      <SupportInfo open={open} onClose={toggleOpen} />
    </Stack>
  )
}

export default SelectingType
