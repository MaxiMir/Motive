import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import { getUserHref } from '@href'
import { UserBaseDto } from '@dto'
import UserLink from '@components/User/UserLink'

interface InheritedProps {
  owner: UserBaseDto
}

function Inheritance({ owner }: InheritedProps) {
  const { name, nickname, avatar } = owner
  const { locale, formatMessage } = useIntl()
  const href = getUserHref(nickname)
  const width = locale === 'en' ? 90 : 100
  const title = formatMessage({ id: 'common.together' })

  return (
    <InheritanceBox display="flex" justifyContent="center" width={width}>
      <Box display="flex" alignItems="center" gap={0.5}>
        <Typography variant="caption">
          <b>{title}</b>
        </Typography>
        <UserLink name={name} avatar={avatar} href={href} />
      </Box>
    </InheritanceBox>
  )
}

const InheritanceBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -19,
  left: '50%',
  padding: '0.25rem',
  transform: 'translateX(-50%)',
  borderRadius: '1.25rem',
  background: `linear-gradient(90deg, ${theme.palette.support.dark} 0%, ${theme.palette.creativity.dark} 100%)`,
}))

export default Inheritance
