import React from "react";
// import { Link } from "gatsby"

import Layout from "../components/layout";
// import Image from "../components/image"
import SEO from "../components/seo";
import SideBar from "../components/common/SideBar";
import OverviewContainer from "../components/dictionary/overview/containers/OverviewContainer";

const OverviewPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="Overview" />
    <div className="col-12 h-100">
      <div className="row ml-xs-2 ml-sm-2 ml-md-3 ml-lg-3 ml-xl-5 mr-xs-2 mr-sm-2 mr-md-3 mr-lg-3 mr-xl-5 pt-3 pb-3">
        <SideBar location={location}/>
        <OverviewContainer />
      </div>
    </div>
  </Layout>
);

export default OverviewPage;
