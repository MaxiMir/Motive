import { IconButton, Stack } from '@mui/material'
import { blue } from '@mui/material/colors'
import { styled } from '@mui/system'
import { Field, Form, FormikProvider } from 'formik'
import dynamic from 'next/dynamic'
import { TopicDto, MessageType, UserBaseDto, ClientDto } from 'shared/api'
import Avatar from 'shared/ui/avatar'
import Input from 'shared/ui/Input'
import TooltipArrow from 'shared/ui/TooltipArrow'
import { useMessages } from './lib'
import { useCreateTopicForm } from './model'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))
const Icon = dynamic(() => import('shared/ui/Icon'))

interface CreateTopicProps {
  dayId: number
  user: ClientDto | UserBaseDto
  type: MessageType
  topicId?: number
  onAdd: (topic: TopicDto) => void
}

function CreateTopic({ dayId, user, type, topicId, onAdd }: CreateTopicProps) {
  const { name, avatar } = user
  const messages = useMessages(type)
  const form = useCreateTopicForm(dayId, topicId, type, onAdd)
  const { isSubmitting, values, handleSubmit } = form
  const disabled = isSubmitting || !values.text

  const onClick = () => handleSubmit()

  return (
    <FormikProvider value={form}>
      <Form>
        <Stack direction="row" alignItems="center" flex={1} gap={1}>
          <Avatar src={avatar} name={name} size={32} />
          <Field
            name="text"
            placeholder={messages.placeholder}
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            disabled={isSubmitting}
            autoComplete="off"
            InputProps={{
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
