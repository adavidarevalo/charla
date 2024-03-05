import { Meta, StoryObj } from '@storybook/react'
import Bytescale from '.'

export default {
  title: 'Components/Bytescale',
  component: Bytescale
} as Meta

type Story = StoryObj<typeof Bytescale>

export const Primary: Story = {
  args: {
    avatarUrl: '',
    avatarName: '',
  }
}
