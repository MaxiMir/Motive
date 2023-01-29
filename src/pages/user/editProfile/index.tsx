import { useIntl } from 'react-intl'
import dynamic from 'next/dynamic'
import { useToggle } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import { GreyButton } from 'shared/ui/styled'

const EditProfileModal = dynamic(() => import('features/user/edit-profile'))

function EditProfile() {
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
      {open && <EditProfileModal onClose={toggle} />}
    </>
  )
}

export default EditProfile
