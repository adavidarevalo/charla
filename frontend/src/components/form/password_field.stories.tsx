import { Meta, StoryObj } from '@storybook/react'
import {PasswordField} from './password_field'

export default {
  title: 'Components/Form/PasswordField',
  component: PasswordField
} as Meta

type Story = StoryObj<typeof PasswordField>

export const Primary: Story = {
  args: {
    name: 'Test',
    label: 'Test',
    type: 'text',
    error: ''
  }
}
