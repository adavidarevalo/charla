import BannerAuthentication from '../components/banner'
import SplitLayout from '../components/layout/split'
import RegisterContainer from '../components/sign_up'

export default function SignUpPage() {
  return (
    <SplitLayout
      rightComponent={<RegisterContainer />}
      leftComponent={<BannerAuthentication />}
    />
  )
}
