import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@material-ui/core'
import { Providers } from 'dto'
import { ProfileIcon } from 'components/UI/icons'
import { getUserHref } from 'views/UserView/helper'
import FooterIcon from './FooterIcon'

const Modal = dynamic(() => import('components/Modal'))

interface FooterProfileProps {
  nickname?: string
  asPath: string
  providers?: Providers
}

export default function FooterProfile({ nickname, asPath, providers }: FooterProfileProps): JSX.Element {
  const [open, setOpen] = useState(false)
  const href = !nickname ? undefined : getUserHref(nickname)
  const selected = !href ? false : asPath.includes(href)

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Button href={href} disabled={!providers} onClick={href ? undefined : toggleModal}>
        <FooterIcon Icon={ProfileIcon} selected={selected} />
      </Button>
      {open && providers && <Modal tmpl="signIn" providers={providers} onClose={toggleModal} />}
    </>
  )
}
