import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import i18nAll from 'constants/i18n'
import { Button, createStyles, makeStyles } from '@material-ui/core'
import { UserDetailDto, UserCharacteristicName } from 'dto'
import { Locale } from 'hooks/useLocale'
import CharacteristicBase from 'components/Characteristic'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppOptionalTooltip from 'components/UI/AppOptionalTooltip'
import i18n from './i18n'

const Modal = dynamic(() => import('components/Modal'))

interface CharacteristicProps {
  user: UserDetailDto
  name: UserCharacteristicName
  value: number
  color: string
  locale: Locale
  onClick?: () => void
}

export default function Characteristic(props: CharacteristicProps): JSX.Element {
  const { user, color, name, locale } = props
  const router = useRouter()
  const classes = useStyles({ color })
  const [modal, setModal] = useState<'followers' | 'completed'>()
  const title = i18nAll[locale][name]
  const tooltip = i18n[locale][name]

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
      <AppOptionalTooltip title={tooltip}>
        <Button className={classes.button} onClick={onClick}>
          <AppBox flexDirection="column" alignItems="flex-start" spacing={0.5}>
            <AppTypography className={classes.title}>{title}</AppTypography>
            <CharacteristicBase tmpl="user" {...props} />
          </AppBox>
        </Button>
      </AppOptionalTooltip>
      {modal && <Modal tmpl={modal} user={user} onClose={onClose} />}
    </>
  )
}

type UseStylesProps = Pick<CharacteristicProps, 'color'>

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
      color: (props: UseStylesProps) => props.color,
      [theme.breakpoints.up('lg')]: {
        fontSize: '0.875rem',
      },
    },
  }),
)
