import { useState } from 'react'
import dynamic from 'next/dynamic'
import { UserBaseDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppIconButton from 'components/UI/AppIconButton'
import i18n from './i18n'

const Modal = dynamic(() => import('components/Modal'))

interface EditProps {
  user: UserBaseDto
  locale: Locale
}

export default function Edit({ user, locale }: EditProps): JSX.Element {
  const [open, setOpen] = useState(false)
  const { title } = i18n[locale]

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <AppIconButton name="edit" title={title} onClick={toggleModal} />
      {open && <Modal tmpl="profile" user={user} locale={locale} onClose={toggleModal} />}
    </>
  )
}
