import dynamic from 'next/dynamic'
import { Field, Form, FormikProvider } from 'formik'
import { Box, IconButton } from '@mui/material'
import { UserBaseDto, ClientDto, getUserHref } from '@features/user'
import { TopicDto, MessageType } from '@features/topic'
import AppInput from '@ui/AppInput'
import UserLink from '@components/User/UserLink'
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
        <Box display="flex" gap={2} flex={1} mb={2} pr={2}>
          <UserLink name={name} avatar={avatar} href={href} size={32} />
          <Field
            name="text"
            placeholder={messages.placeholder}
            variant="standard"
            InputLabelProps={{ shrink: false }}
            disabled={isSubmitting}
            sx={{ flex: 1 }}
            component={AppInput}
          />
          <IconButton
            aria-label=""
            disabled={disabled}
            sx={{
              width: 40,
              height: 40,
              paddingLeft: '3px',
            }}
            onClick={onClick}
          >
            {!isSubmitting ? (
              <AppIcon name="send" />
            ) : (
              <CircularProgress size={14.5} color="primary" />
            )}
          </IconButton>
        </Box>
      </Form>
    </FormikProvider>
  )
}

export default UserInput
