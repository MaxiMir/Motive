import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Button, createStyles, makeStyles } from '@material-ui/core'
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
  const router = useRouter()
  const classes = useStyles({ color })
  const [modal, setModal] = useState<'followers' | 'completed'>()

  const onClick = () => {
    switch (name) {
      case 'followers':
      case 'completed':
        setModal(name)
    }
  }

  const onClose = () => setModal(undefined)

  useEffect(onClose, [router.asPath])

  return (
    <>
      <AppOptionalTooltip title={title}>
        <Button className={classes.button} onClick={onClick}>
          <AppBox flexDirection="column" spacing={0.5} width={70}>
            <AppTypography className={classes.title}>{name}</AppTypography>
            <CharacteristicBase tmpl="user" {...props} />
          </AppBox>
        </Button>
      </AppOptionalTooltip>
      {modal && <Modal tmpl={modal} user={user} onClose={onClose} />}
    </>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      textTransform: 'none',
      [theme.breakpoints.down('xs')]: {
        padding: '6px 4px',
      },
    },
    title: {
      fontSize: '0.75rem',
      color: (props: { color: string }) => props.color,
      [theme.breakpoints.up('lg')]: {
        fontSize: '0.875rem',
      },
    },
  }),
)
