import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { UserPageDto } from 'shared/api'
import { useToggle } from 'shared/lib/hooks'
import GreyButton from 'shared/ui/GreyButton'
import Icon from 'shared/ui/Icon'

const EditProfileModal = dynamic(() => import('features/user/edit-profile'))

interface EditProfileProps {
  user: UserPageDto
}

function EditProfile({ user }: EditProfileProps) {
  const { formatMessage } = useIntl()
  const [open, toggle] = useToggle()
  const buttonText = formatMessage({ id: 'common.edit' })

  return (
    <>
      <GreyButton
        size="small"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        startIcon={<Icon name="edit_note" />}
        sx={{
          minWidth: '96px',
          height: 30,
          paddingX: 1,
        }}
        onClick={toggle}
      >
        {buttonText}
      </GreyButton>
      {open && <EditProfileModal user={user} onClose={toggle} />}
    </>
  )
}

export default EditProfile
