require("./config");

module.exports = {
  siteMetadata: {
    title: `FRAC Dictionary`,
    siteUrl: global.env.GATSBY_META_SITEURL,
    description: `FRAC dictionary for public access.`,
    author: `Tarento NXT`,
    image: global.env.GATSBY_META_DOMAIN + global.env.GATSBY_META_IMAGE,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: ["material icons"],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-preconnect",
      options: {
        domains: [global.env.GATSBY_META_SITEURL],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `FRAC Dictionary`,
        short_name: `Dictionary`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        // icon: `src/images/favicons/apple-icon.png`, // This path is relative to the root of the site.
        icons: [
          {
            src: `src/images/favicons/android-icon-36x36.png`,
            sizes: `36x36`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/android-icon-48x48.png`,
            sizes: `48x48`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/android-icon-72x72.png`,
            sizes: `72x72`,
            type: `image/png`,
          },
          {
            src: `/src/images/favicons/android-icon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/android-icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/android-icon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/apple-icon-57x57.png`,
            sizes: `57x57`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/apple-icon-60x60.png`,
            sizes: `60x60`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/apple-icon-72x72.png`,
            sizes: `72x72`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/apple-icon-76x76.png`,
            sizes: `76x76`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/apple-icon-114x114.png`,
            sizes: `114x114`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/apple-icon-120x120.png`,
            sizes: `120x120`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/apple-icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/apple-icon-152x152.png`,
            sizes: `152x152`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/apple-icon-180x180.png`,
            sizes: `180x180`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/favicon-16x16.png`,
            sizes: `16x16`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/favicon-32x32.png`,
            sizes: `32x32`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/favicon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/ms-icon-70x70.png`,
            sizes: `70x70`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/ms-icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/ms-icon-150x150.png`,
            sizes: `150x150`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/ms-icon-310x310.png`,
            sizes: `310x310`,
            type: `image/png`,
          },
          {
            src: `src/images/favicons/apple-icon.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-source-elasticsearch",
      options: {
        connection: {
          host: global.env.GATSBY_ELASTIC,
          log: "info",
        },
        index: global.env.GATSBY_ELASTIC_INDEX,
        typeName: "json",
        query: {
          match_all: {},
        },
      },
    },
    // {
    //   resolve: `gatsby-plugin-s3`,
    //   options: {
    //     bucketName: global.env.GATSBY_S3_BUCKET,
    //     protocol: "http",
    //     hostname: global.env.GATSBY_S3_HOSTNAME,
    //     acl: null,
    //     region: null,
    //   },
    // },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: global.env.GATSBY_META_SITEURL,
        sitemap: global.env.GATSBY_SITE_MAP,
        policy: [{ userAgent: "*", allow: ["/"] }],
      },
    },
  ],
};
