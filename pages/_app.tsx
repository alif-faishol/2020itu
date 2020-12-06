import { AppType } from 'next/dist/next-server/lib/utils';
import '../styles/globals.css';
import vhCheck from 'vh-check';

if (typeof window !== 'undefined') {
  vhCheck();
}

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
