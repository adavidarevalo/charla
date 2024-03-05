import { Meta, StoryObj } from '@storybook/react'
import InputField from './input_field'

export default {
  title: 'Components/Form/InputField',
  component: InputField
} as Meta

type Story = StoryObj<typeof InputField>

export const Primary: Story = {
  args: {
    name: 'Test',
    label: 'Test',
    type: "text",
    error: ""
  }
}
