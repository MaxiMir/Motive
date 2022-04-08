import { Typography } from '@mui/material'
import { styled } from '@mui/system'
import { UserBaseDto } from 'dto'
import useLocale from 'hooks/useLocale'
import User from 'components/User'
import AppBox from 'components/UI/AppBox'
import i18n from './i18n'

interface InheritedProps {
  owner: UserBaseDto
}

export default function Inheritance({ owner }: InheritedProps): JSX.Element {
  const { locale } = useLocale()
  const { title } = i18n[locale]
  const width = locale === 'ru' ? 100 : 90

  return (
    <InheritanceBox justifyContent="center" width={width}>
      <AppBox alignItems="center" gap={0.5}>
        <Typography variant="caption">
          <b>{title}</b>
        </Typography>
        <User tmpl="avatar" user={owner} />
      </AppBox>
    </InheritanceBox>
  )
}

const InheritanceBox = styled(AppBox)(({ theme }) => ({
  position: 'absolute',
  top: -19,
  left: '50%',
  padding: '4px',
  transform: 'translateX(-50%)',
  borderRadius: '20px',
  background: `linear-gradient(90deg, ${theme.palette.support.dark} 0%, ${theme.palette.creativity.dark} 100%)`,
}))
