import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button, makeStyles } from '@material-ui/core'
import { UserDetailDto, UserCharacteristicName } from 'dto'
import CharacteristicBase from 'components/Characteristic'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppOptionalTooltip from 'components/UI/AppOptionalTooltip'

const Modal = dynamic(() => import('components/Modal'))

interface CharacteristicProps {
  user: UserDetailDto
  name: UserCharacteristicName
  value: number
  title?: JSX.Element
  color: string
  onClick?: () => void
}

export default function Characteristic(props: CharacteristicProps): JSX.Element {
  const { user, color, name, title } = props
  const classes = useStyles({ color })
  const [modal, setModal] = useState<'followers'>()

  const onClick = () => {
    switch (name) {
      case 'followers':
        setModal(name)
    }
  }

  const onClose = () => setModal(undefined)

  return (
    <>
      <AppOptionalTooltip title={title}>
        <Button className={classes.button} onClick={onClick}>
          <AppBox flexDirection="column" spacing={0.5} width={60}>
            <AppTypography className={classes.title}>{name}</AppTypography>
            <CharacteristicBase tmpl="user" {...props} />
          </AppBox>
        </Button>
      </AppOptionalTooltip>
      {modal && <Modal tmpl={modal} user={user} onClose={onClose} />}
    </>
  )
}

const useStyles = makeStyles({
  button: {
    textTransform: 'none',
  },
  title: {
    fontSize: '0.75rem',
    color: (props: { color: string }) => props.color,
  },
})
