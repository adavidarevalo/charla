import { Meta, StoryObj } from '@storybook/react'
import SplitLayout from './split'
import { Box } from '@chakra-ui/react'

export default {
  title: 'Components/Layout/SplitLayout',
  component: SplitLayout
} as Meta

type Story = StoryObj<typeof SplitLayout>

const LeftComponent = () => <Box bg={'red'} w="full" h="90vh" />
const RightComponent = () => <Box bg={'blue'} w="full" h="full" />

export const Primary: Story = {
  args: {
    leftComponent: <LeftComponent/>,
    rightComponent: <RightComponent/>,
  }
}
