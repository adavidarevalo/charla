import { Meta, StoryObj } from '@storybook/react'
import MainFormLayout from './main_form'
import { Box } from '@chakra-ui/react'

export default {
  title: 'Components/Layout/MainFormLayout',
  component: MainFormLayout
} as Meta

type Story = StoryObj<typeof MainFormLayout>

const Form = () => <Box bg={'blue'} minH={'300px'} />
const SubHeadingStack = () => <Box bg={'red'} minH={'70px'} />

export const Primary: Story = {
  args: {
    imageUrl:
      'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg',
    subHeadingStack: <SubHeadingStack />,
    form: <Form />
  }
}
