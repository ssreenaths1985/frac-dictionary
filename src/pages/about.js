import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import SideBar from "../components/common/SideBar";
import AboutUs from "../components/common/AboutUs";

const AboutPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="About Us" />
    <div className="col-12 h-100">
      <div className="row ml-xs-2 ml-sm-2 ml-md-3 ml-lg-3 ml-xl-5 mr-xs-2 mr-sm-2 mr-md-3 mr-lg-3 mr-xl-5 pt-3 pb-3">
        <SideBar location={location} />
        <AboutUs />
      </div>
    </div>
  </Layout>
);

export default AboutPage;