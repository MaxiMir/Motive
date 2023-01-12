import { CSSObject, styled, Theme } from '@mui/material/styles'
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer'

const WIDTH = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: 240,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const Menu = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: WIDTH,
    backgroundColor: theme.palette.underlay,
    borderRight: '1px solid rgb(38, 38, 38)',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      [`& .${drawerClasses.paper}`]: openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      [`& .${drawerClasses.paper}`]: closedMixin(theme),
    }),
  }),
)

export default Menu
