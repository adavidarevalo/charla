import BannerAuthentication from '../components/banner'
import SignInForm from "../components/sign_in";
import SplitLayout from "../components/layout/split";

export default function SignInPage() {
  return (
    <SplitLayout
      rightComponent={<SignInForm />}
      leftComponent={<BannerAuthentication />}
    />
  )
}
