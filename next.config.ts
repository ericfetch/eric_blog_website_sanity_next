import {withSentryConfig} from '@sentry/nextjs';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    SANITY_API_TOKEN: 'skhogvZrQWqpmuYc3bqbbDgbFRBfgWpm3ubK0uYPE3Z3S2rF4292IK0FEWXzEyQjaA4dHHrmBy57Q9UitgIqEAaxsDy1HWBe2dDDv2B6Wo5DKo5DPQDmqz96aTUQl6n1hbNtIV1HJjV01p2mKULpiIDkyJbiTCtkJgTiQj64HW7d087xjg02',
  },
  images: {
    domains: ['cdn.sanity.io', 'via.placeholder.com','assets.ericengineer.com'],
  },
};

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://www.npmjs.com/package/@sentry/webpack-plugin#options

org: "personal-d06",
project: "javascript-react",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
tunnelRoute: "/monitoring",

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});