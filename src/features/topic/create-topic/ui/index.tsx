import { IconButton, Stack } from '@mui/material'
import { blue } from '@mui/material/colors'
import { styled } from '@mui/system'
import { Field, Form, FormikProvider } from 'formik'
import dynamic from 'next/dynamic'
import { TopicType, UserBaseDto, ClientDto } from 'shared/api'
import Avatar from 'shared/ui/avatar'
import Input from 'shared/ui/Input'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useCreateTopicForm } from '../model'
import { useMessages } from './lib'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))
const InputAdornment = dynamic(() => import('@mui/material/InputAdornment'))
const Icon = dynamic(() => import('shared/ui/Icon'))
const SelectingType = dynamic(() => import('./selectingType'))

interface CreateTopicProps {
  dayId: number
  user: ClientDto | UserBaseDto
  owner: UserBaseDto
  type: TopicType
  topicId?: number
  autoFocus?: boolean
  startIcon?: JSX.Element
  selectingType?: boolean
  onSuccess?: () => void
}

function CreateTopic({
  dayId,
  user,
  owner,
  type,
  topicId,
  autoFocus,
  startIcon,
  selectingType,
  onSuccess,
}: CreateTopicProps) {
  const { name, avatar } = user
  const messages = useMessages()
  const form = useCreateTopicForm(dayId, topicId, type, onSuccess)
  const { isSubmitting, values, setFieldValue, handleSubmit } = form
  const disabled = isSubmitting || !values.text

  const setType = (value: TopicType) => setFieldValue('type', value)

  const onClick = () => handleSubmit()

  return (
    <FormikProvider value={form}>
      <Form>
        <Stack gap={1}>
          <Stack direction="row" alignItems="center" flex={1} gap={1}>
            <Avatar src={avatar} name={name} size={32} />
            <Field
              name="text"
              placeholder={messages.placeholder}
              variant="outlined"
              InputLabelProps={{ shrink: false }}
              disabled={isSubmitting}
              autoComplete="off"
              autoFocus={autoFocus}
              InputProps={{
                startAdornment: startIcon && (
                  <InputAdornment position="start">{startIcon}</InputAdornment>
                ),
                sx: {
                  borderRadius: 24,
                },
              }}
              component={Input}
            />
            <TooltipArrow title={messages.sendText}>
              <SendButton size="small" disabled={disabled} onClick={onClick}>
                {isSubmitting ? <CircularProgress size={14.5} /> : <Icon name="arrow_upward" />}
              </SendButton>
            </TooltipArrow>
          </Stack>
          {selectingType && <SelectingType owner={owner} type={values.type} setType={setType} />}
        </Stack>
      </Form>
    </FormikProvider>
  )
}

const SendButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  borderColor: blue[800],
  backgroundColor: blue[800],
  '& span': {
    fontSize: 19,
  },
  ':hover': {
    backgroundColor: blue[400],
  },
}))

export default CreateTopic
