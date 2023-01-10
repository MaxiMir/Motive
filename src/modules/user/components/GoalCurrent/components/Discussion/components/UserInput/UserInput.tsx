import dynamic from 'next/dynamic'
import { Field, Form, FormikProvider } from 'formik'
import { Box, IconButton } from '@mui/material'
import { styled } from '@mui/system'
import { blue } from '@mui/material/colors'
import { UserBaseDto, ClientDto, getUserHref } from '@features/user'
import { TopicDto, MessageType } from '@features/topic'
import AppInput from '@ui/AppInput'
import UserLink from '@components/User/UserLink'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'
import { useForm } from './hooks/useForm'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))
const AppIcon = dynamic(() => import('@ui/AppIcon'))

interface UserInputProps {
  user: ClientDto | UserBaseDto
  type: MessageType
  topicId?: number
  onAdd: (topic: TopicDto) => void
}

function UserInput({ user, type, topicId, onAdd }: UserInputProps) {
  const { nickname, name, avatar } = user
  const messages = useMessages(type)
  const form = useForm(topicId, type, onAdd)
  const { isSubmitting, values, handleSubmit } = form
  const href = getUserHref(nickname)
  const disabled = isSubmitting || !values.text

  const onClick = () => handleSubmit()

  return (
    <FormikProvider value={form}>
      <Form>
        <Box display="flex" alignItems="center" flex={1} gap={1}>
          <UserLink name={name} avatar={avatar} href={href} size={32} />
          <Field
            name="text"
            placeholder={messages.placeholder}
            variant="standard"
            InputLabelProps={{ shrink: false }}
            disabled={isSubmitting}
            autoComplete={false}
            sx={{ flex: 1 }}
            component={AppInput}
          />
          <TooltipArrow title={messages.sendText}>
            <SendButton size="small" disabled={disabled} onClick={onClick}>
              {isSubmitting ? <CircularProgress size={14.5} /> : <AppIcon name="arrow_upward" />}
            </SendButton>
          </TooltipArrow>
        </Box>
      </Form>
    </FormikProvider>
  )
}

const SendButton = styled(IconButton)({
  color: '#fff',
  borderColor: blue[800],
  backgroundColor: blue[800],
  '& span': {
    fontSize: 19,
  },
  '&:hover': {
    backgroundColor: blue[400],
  },
})

export default UserInput
