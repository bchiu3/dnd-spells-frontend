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
    }
};
export default withSerwist(nextConfig);
