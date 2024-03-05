import { Meta, StoryObj } from '@storybook/react'
import BannerAuthentication from '.'

export default {
  title: 'Components/Banner',
  component: BannerAuthentication
} as Meta

type Story = StoryObj<typeof BannerAuthentication>

export const Primary: Story = {
  args: {
    children: 1
  }
}
