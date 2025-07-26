import type { AppProps } from 'next/app';
import { trackWebVitals } from '@/lib/analytics';

export function reportWebVitals(metric: any) {
  trackWebVitals(metric);
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

