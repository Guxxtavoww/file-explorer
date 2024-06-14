import { withHydrationOverlay } from '@builder.io/react-hydration-overlay/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
};

export default withHydrationOverlay({
  appRootSelector: 'main',
})(nextConfig);
