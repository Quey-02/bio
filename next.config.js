// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export",
// }

// module.exports = nextConfig




const isGithubPages = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isGithubPages ? '/bio/' : '',
  basePath: isGithubPages ? '/bio' : '',
  trailingSlash: true,
  output: 'export',
};