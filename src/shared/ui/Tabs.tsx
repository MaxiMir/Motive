import { ChangeEvent, useState } from 'react'
import { Box, Tabs as MuiTabs, Tab as MuiTab, TabsProps as MuiTabsProps } from '@mui/material'
import { tabsClasses } from '@mui/material/Tabs'

interface TabsProps extends Pick<MuiTabsProps, 'aria-label'> {
  tabs: string[] | JSX.Element[]
  content: string[] | JSX.Element[]
  initial?: number
}

function Tabs({ tabs, content, initial = 0, ...tabsProps }: TabsProps) {
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
      <Box borderBottom={1} borderColor="divider" mb={2}>
        <MuiTabs
          value={value}
          variant="fullWidth"
          {...tabsProps}
          sx={({ palette }) => ({
            [`& .${tabsClasses.indicator}`]: {
              background: `linear-gradient(to right, ${palette.motivation.main}, ${palette.creativity.dark}, ${palette.support.dark})`,
            },
          })}
          onChange={onChange}
        >
          {tabs.map((tab, index) => {
            const a11yTabProps = getA11yTabProps(index)

            return (
              <MuiTab
                label={tab}
                key={a11yTabProps.id}
                {...a11yTabProps}
                sx={{ textTransform: 'none' }}
              />
            )
          })}
        </MuiTabs>
      </Box>
      {content.map((tabContent, index) => {
        const a11yContentProps = getA11yContentProps(index)

        return (
          <Box
            role="tabpanel"
            hidden={value !== index}
            {...a11yContentProps}
            key={a11yContentProps.id}
          >
            {tabContent}
          </Box>
        )
      })}
    </>
  )
}

export default Tabs
