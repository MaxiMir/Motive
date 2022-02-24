import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { ParsedUrlQuery } from 'querystring'
import { Provider } from 'next-auth/providers'
import { Button, createStyles, makeStyles } from '@material-ui/core'
import AppTitle from 'components/UI/AppTitle'
import AppContainer from 'components/UI/AppContainer'
import AppBox from 'components/UI/AppBox'

interface SignInViewProps {
  providers: Provider[]
  query: ParsedUrlQuery
}

export default function SignInView({ providers, query }: SignInViewProps): JSX.Element {
  const classes = useStyles()

  return (
    <AppContainer flexColumn>
      <AppBox alignItems="center" justifyContent="center" flex={1}>
        <div className={classes.wrap}>
          <AppBox flexDirection="column" alignItems="center" padding={4}>
            <AppTitle name="followers" mb={4}>
              Sign In
            </AppTitle>
            <AppBox flexDirection="column" spacing={2}>
              {Object.values(providers).map((provider) => (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Image src={`/images/svg/${provider.name}.svg`} alt="Pitt's web" width={24} height={24} />}
                  key={provider.name}
                  onClick={() => signIn(provider.id, query)}
                >
                  Sign in with {provider.name}
                </Button>
              ))}
            </AppBox>
          </AppBox>
        </div>
      </AppBox>
    </AppContainer>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    wrap: {
      background: '#000000',
      minWidth: '25vw',
      minHeight: '25vw',
      borderRadius: 8,
      border: `2px solid ${theme.text.silent}`,
    },
  }),
)
