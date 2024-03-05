import { render } from '@testing-library/react';
import BannerAuthentication from './index';

describe('BannerAuthentication component', () => {
  test('renders with correct content', () => {
    const { getByText } = render(<BannerAuthentication />);
    
    expect(getByText(/Realtime, no delay.../i)).toBeInTheDocument();
    expect(getByText(/your ideal way to convey!/i)).toBeInTheDocument();
  });
});
