import { ChangeEvent, useState } from 'react'
import { Container, Box, Tab, Tabs, tabsClasses } from '@mui/material'

interface AppTabsProps {
  tabs: string[] | JSX.Element[]
  content: string[] | JSX.Element[]
  ariaLabel: string
  initial?: number
}

function AppTabs({ tabs, content, ariaLabel, initial = 0 }: AppTabsProps) {
  const [value, setValue] = useState(initial)

  const getA11yTabProps = (index: number) => ({
    id: `simple-tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  })

  const getA11yContentProps = (index: number) => ({
    id: `tabpanel-${index}`,
    'aria-labelledby': `tab-${index}`,
  })

  const onChange = (_event: ChangeEvent<unknown>, newValue: number) => setValue(newValue)

  return (
    <>
      <Container
        fixed
        sx={(theme) => ({
          [theme.breakpoints.only('xl')]: {
            maxWidth: 900,
          },
        })}
      >
        <Tabs
          value={value}
          aria-label={ariaLabel}
          variant="fullWidth"
          sx={(theme) => ({
            [`& .${tabsClasses.indicator}`]: {
              background: `linear-gradient(to right, ${theme.palette.motivation.main}, ${theme.palette.creativity.dark}, ${theme.palette.support.dark})`,
            },
          })}
          onChange={onChange}
        >
          {tabs.map((tab, index) => {
            const a11yTabProps = getA11yTabProps(index)

            return <Tab label={tab} key={a11yTabProps.id} {...a11yTabProps} />
          })}
        </Tabs>
      </Container>
      {content.map((tabContent, index) => {
        const a11yContentProps = getA11yContentProps(index)

        return (
          <Box role="tabpanel" hidden={value !== index} {...a11yContentProps} key={a11yContentProps.id}>
            {value === index && tabContent}
          </Box>
        )
      })}
    </>
  )
}

export default AppTabs
