import dynamic from 'next/dynamic'
import { Box, Divider, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { UserDetailDto, MAIN_CHARACTERISTICS, SECOND_CHARACTERISTICS } from '@dto'
import AppContainer from '@ui/AppContainer'
import useCheckOnClientPage from '@features/user/hooks/useCheckOnClientPage'
import { UserContext } from '@features/user/hooks/useUserContext'
import SecondCharacteristic from './components/SecondCharacteristic'
import EmptyGoals from './components/EmptyGoals'
import Following from './components/Following'
import MainCharacteristic from './components/MainCharacteristic'
import Info from './components/Info'
import Menu from './components/Menu'
import Avatar from './components/Avatar'

const EditProfile = dynamic(() => import('./components/EditProfile'))
const ConfirmationList = dynamic(() => import('./components/ConfirmationList'))
const GoalCurrent = dynamic(() => import('./components/GoalCurrent'))
const Motto = dynamic(() => import('./components/Motto'))

interface UserFeatureProps {
  user: UserDetailDto
}

function UserFeature({ user }: UserFeatureProps) {
  const { id, name, characteristic, goals, membership, clientMembership, confirmations, motto } = user
  const clientPage = useCheckOnClientPage(id)
  const showConfirmationsList = !!confirmations.length || clientPage

  return (
    <UserContext.Provider value={user}>
      <AppContainer>
        <Menu />
        <Box
          display="flex"
          flexWrap="wrap"
          mb={3}
          component="section"
          sx={{
            gap: {
              xs: 2,
              md: 3,
            },
            alignItems: 'flex-end',
            justifyContent: {
              xs: 'center',
              md: 'flex-start',
            },
          }}
        >
          <Avatar />
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            sx={{
              alignItems: {
                xs: 'center',
                md: 'flex-start',
              },
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap={0.5}
              sx={{
                alignItems: {
                  xs: 'center',
                  md: 'flex-start',
                },
              }}
            >
              <Typography variant="h5" component="h1">
                {name}
              </Typography>
              {motto && <Motto motto={motto} />}
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={2}>
              {SECOND_CHARACTERISTICS.map((characteristicName) => (
                <SecondCharacteristic
                  confirmations={confirmations}
                  name={characteristicName}
                  value={characteristic[characteristicName]}
                  key={characteristicName}
                />
              ))}
            </Box>
            <Box display="flex" flexWrap="wrap" my={1} width="100%" gap={2}>
              {clientPage ? <EditProfile /> : <Following />}
              <Info />
            </Box>
          </Box>
        </Box>
        <DashedDivider light sx={{ mb: 3 }} />
        <Box display="flex" justifyContent="space-between" mb={3} component="section">
          {MAIN_CHARACTERISTICS.map((characteristicName) => (
            <MainCharacteristic
              name={characteristicName}
              value={characteristic[characteristicName]}
              key={characteristicName}
            />
          ))}
        </Box>
        <DashedDivider light sx={{ mb: 3 }} />
        {showConfirmationsList && <ConfirmationList confirmations={confirmations} clientPage={clientPage} />}
        {!goals.length ? (
          <EmptyGoals clientPage={clientPage} />
        ) : (
          <Box display="flex" flexWrap="wrap" gap={3}>
            {goals.map((goal) => (
              <GoalCurrent
                goal={goal}
                userId={id}
                membership={membership}
                clientPage={clientPage}
                clientMembership={clientMembership}
                key={goal.id}
              />
            ))}
          </Box>
        )}
      </AppContainer>
    </UserContext.Provider>
  )
}

const DashedDivider = styled(Divider)({
  borderStyle: 'dashed',
})

export default UserFeature
