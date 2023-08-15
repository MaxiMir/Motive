import { Box, Tabs as MuiTabs, Tab as MuiTab, TabsProps as MuiTabsProps } from '@mui/material'
import { withStyles } from '@mui/styles'
import { ChangeEvent, ReactNode, useState } from 'react'

interface TabsProps extends Pick<MuiTabsProps, 'aria-label'> {
  tabs: string[] | ReactNode[]
  content: string[] | ReactNode[]
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
        <StyledTabs value={value} variant="fullWidth" {...tabsProps} onChange={onChange}>
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
        </StyledTabs>
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

const StyledTabs = withStyles(({ palette }) => ({
  indicator: {
    background: `linear-gradient(to right, ${palette.motivation.main}, ${palette.creativity.dark}, ${palette.support.dark})`,
  },
}))(MuiTabs)

export default Tabs
