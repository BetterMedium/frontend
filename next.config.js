// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/article/1",
        permanent: false, // Set to true if this is a permanent redirect
      },
    ];
  },
};
