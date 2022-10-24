import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { UserBaseDto } from 'dto'
import AppIconButton from 'components/ui/AppIconButton'

const ModalProfile = dynamic(() => import('./components/ModalProfile'))

interface EditProps {
  user: UserBaseDto
}

export default function Edit({ user }: EditProps) {
  const { formatMessage } = useIntl()
  const [open, setOpen] = useState(false)
  const title = formatMessage({ id: 'common.edit' })

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <AppIconButton name="edit" title={title} sx={{ color: 'zen.silent' }} onClick={toggleModal} />
      {open && <ModalProfile user={user} onClose={toggleModal} />}
    </>
  )
}
