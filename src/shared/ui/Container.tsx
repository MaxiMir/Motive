import { Container as MuiContainer } from '@mui/material'
import { styled } from '@mui/system'

const Container = styled((props) => <MuiContainer fixed {...props} />)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  paddingTop: 16,
  paddingBottom: 16,
}) as typeof MuiContainer

export default Container
