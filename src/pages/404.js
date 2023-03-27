import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <center className="pt-5">
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </center>
  </Layout>
);

export default NotFoundPage;
