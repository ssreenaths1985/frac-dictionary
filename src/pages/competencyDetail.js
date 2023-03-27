import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import SideBar from "../components/common/SideBar";
import CompetencyDetailContainer from "../components/dictionary/competencies/containers/CompetencyDetailContainer";
import { graphql } from "gatsby";

export default function CompetencyDetailPage({ location, data }) {
  console.log("Extracting queries from CompetencyDetailPage!");
  
  return (
    <Layout location={location}>
      <SEO title="Competency Detail" />
      <div className="col-12 h-100">
        <div className="row ml-xs-2 ml-sm-2 ml-md-3 ml-lg-3 ml-xl-5 mr-xs-2 mr-sm-2 mr-md-3 mr-lg-3 mr-xl-5 pt-3 pb-3">
          <SideBar location={location} />
          <CompetencyDetailContainer location={location} data={data} />
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($path: String) {
    allSitePage(filter: { path: { eq: $path } }) {
      nodes {
        path
        context {
          data {
            additionalProperties {
              cod
              competencyArea
              competencyType
              competencySector
            }
            children {
              id
              name
              description
              level
              type
            }
            description
            id
            name
            source
            status
            type
          }
        }
      }
    }
  }
`;
