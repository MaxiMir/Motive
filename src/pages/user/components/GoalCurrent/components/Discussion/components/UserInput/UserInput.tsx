import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Field, Form, FormikProvider } from 'formik'
import { IconButton, Stack } from '@mui/material'
import { styled } from '@mui/system'
import { blue } from '@mui/material/colors'
import AvatarStatus from '@features/avatar-status'
import { toHref } from '@entities/user'
import { TopicDto, MessageType } from '@shared/api/topic'
import { UserBaseDto, ClientDto } from '@shared/api/user'
import Input from '@shared/ui/Input'
import TooltipArrow from '@shared/ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'
import { useForm } from './hooks/useForm'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))
const Icon = dynamic(() => import('@shared/ui/Icon'))

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
  const href = toHref(nickname)
  const disabled = isSubmitting || !values.text

  const onClick = () => handleSubmit()

  return (
    <FormikProvider value={form}>
      <Form>
        <Stack direction="row" alignItems="center" flex={1} spacing={1}>
          <Link href={href} title={name}>
            <AvatarStatus src={avatar} name={name} size={32} />
          </Link>
          <Field
            name="text"
            placeholder={messages.placeholder}
            variant="standard"
            InputLabelProps={{ shrink: false }}
            disabled={isSubmitting}
            autoComplete={false}
            sx={{ flex: 1 }}
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

export default UserInput
