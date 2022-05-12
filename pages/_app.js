import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import AppLayout from '../components/AppLayout';

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}
