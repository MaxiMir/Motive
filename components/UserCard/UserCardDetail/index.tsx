import dynamic from 'next/dynamic'
import Image from 'next/image'
import { UserDetail } from 'dto'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core'
import { numberToShort } from 'helper/prepare'
import UserCardAvatar from './UserCardAvatar'
import AppTooltip from 'components/UI/AppTooltip'
import AppBox from 'components/UI/AppBox'

const UserCardFavorite = dynamic(() => import('./UserCardFavorite'))

const UserCardDetail = ({
  name,
  isFavorite,
  views,
  avatar,
  characteristics,
}: UserDetail) => {
  const classes = useStyles()

  return (
    <Container fixed>
      <AppBox justifyContent="space-between" mb={2}>
        <AppBox alignItems="center">
          <Typography variant="h6" component="h1">
            {name}
          </Typography>
          {isFavorite !== undefined && (
            <UserCardFavorite isFavorite={isFavorite} />
          )}
        </AppBox>
        <AppBox alignItems="center" spacing={1}>
          <AppTooltip title="Page Views" className={classes.tooltip}>
            <Image src="/images/eye.png" alt="eye" width={39} height={24} />
          </AppTooltip>
          <Typography variant="h6" component="p" className={classes.views}>
            {numberToShort(views)}
          </Typography>
        </AppBox>
      </AppBox>
      <AppBox>
        <UserCardAvatar avatar={avatar} characteristics={characteristics} />
      </AppBox>
    </Container>
  )
}

const useStyles = makeStyles({
  tooltip: {
    height: 24,
  },
  views: {
    color: '#99989D',
  },
})

export default UserCardDetail
