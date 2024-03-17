/** @type {import('next').NextConfig} */
import path from 'path';
import {fileURLToPath} from 'url';
import withSerwistInit from "@serwist/next";
      
const withSerwist = withSerwistInit({
    swSrc: "app/sw.ts",
    swDest: "public/sw.js",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
      disableStaticImages: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: `${process.env.NEXT_PUBLIC_DND_BUCKET_NAME}.s3.amazonaws.com`,
          port: '',
          pathname: '/media/**',
        },
      ],
    }
};
export default withSerwist(nextConfig);
