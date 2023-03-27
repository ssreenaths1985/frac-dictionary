/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
// import { useStaticQuery, graphql } from "gatsby"

// import Header from "./header"
import "./layout.css";
import "./main.css";
import NavBar from "./common/NavBar";
// import BannerImage from "../images/banners/dictionary_banner_360px.jpg";
import { Helmet } from "react-helmet";
import "../../config";
import favicon57 from "../images/favicons/apple-icon-57x57.png";
import favicon60 from "../images/favicons/apple-icon-60x60.png";
import favicon72 from "../images/favicons/apple-icon-72x72.png";
import favicon76 from "../images/favicons/apple-icon-76x76.png";
import favicon114 from "../images/favicons/apple-icon-114x114.png";
import favicon120 from "../images/favicons/apple-icon-120x120.png";
import favicon144 from "../images/favicons/apple-icon-144x144.png";
import favicon152 from "../images/favicons/apple-icon-152x152.png";
import favicon180 from "../images/favicons/apple-icon-180x180.png";
import favicon192 from "../images/favicons/android-icon-192x192.png";
import favicon32 from "../images/favicons/favicon-32x32.png";
import favicon96 from "../images/favicons/favicon-96x96.png";
import favicon16 from "../images/favicons/favicon-16x16.png";
// import manifest from "../images/favicons/manifest.json";
import ms144 from "../images/favicons/ms-icon-144x144.png";

const Layout = ({ children, location }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="FRAC dictionary for public access."
        ></meta>

        <meta property="og:type" content="website" />
        <meta property="og:url" content={global.env.GATSBY_META_DOMAIN} />

        <meta
          property="og:image"
          content={global.env.GATSBY_META_DOMAIN + global.env.GATSBY_META_IMAGE}
        />
        <meta
          property="og:description"
          content="FRAC dictionary for public access."
        ></meta>

        <meta
          property="twitter:card"
          content={global.env.GATSBY_META_DOMAIN + global.env.GATSBY_META_IMAGE}
        />
        <meta
          property="twitter:description"
          content="FRAC dictionary for public access."
        ></meta>
        <meta property="twitter:url" content={global.env.GATSBY_META_DOMAIN} />

        <meta
          property="twitter:image"
          content={global.env.GATSBY_META_DOMAIN + global.env.GATSBY_META_IMAGE}
        />
        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="57x57" href={favicon57} />
        <link rel="apple-touch-icon" sizes="60x60" href={favicon60} />
        <link rel="apple-touch-icon" sizes="72x72" href={favicon72} />
        <link rel="apple-touch-icon" sizes="76x76" href={favicon76} />
        <link rel="apple-touch-icon" sizes="114x114" href={favicon114} />
        <link rel="apple-touch-icon" sizes="120x120" href={favicon120} />
        <link rel="apple-touch-icon" sizes="144x144" href={favicon144} />
        <link rel="apple-touch-icon" sizes="152x152" href={favicon152} />
        <link rel="apple-touch-icon" sizes="180x180" href={favicon180} />
        <link rel="icon" type="image/png" sizes="192x192" href={favicon192} />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
        <link rel="icon" type="image/png" sizes="96x96" href={favicon96} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
        <link rel="manifest" href="../images/favicons/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content={ms144} />
        <meta name="theme-color" content="#ffffff"></meta>
      </Helmet>
      <NavBar location={location} />
      <div
        className="main-section h-100"
        style={{ minHeight: "93vh" }}
        id="mainSection"
      >
        <main>{children}</main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
