import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { Link } from "gatsby";
import { navigate } from "@reach/router";

const OverviewView = () => {
  const [value, setValue] = useState();

  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(
        relativePath: { eq: "banners/dictionary_banner_1200px.jpg" }
      ) {
        childImageSharp {
          fluid(maxHeight: 350) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      placeholderImageMobile: file(
        relativePath: { eq: "banners/dictionary_banner_480px.jpg" }
      ) {
        childImageSharp {
          fluid(maxHeight: 350) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      placeholderImageMobileTwo: file(
        relativePath: { eq: "banners/dictionary_banner_360px.jpg" }
      ) {
        childImageSharp {
          fluid(maxHeight: 350) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      placeholderImageTab: file(
        relativePath: { eq: "banners/dictionary_banner_768px.jpg" }
      ) {
        childImageSharp {
          fluid(maxHeight: 350) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      getPositionCount: allJson(
        filter: { positions: { elemMatch: { type: { eq: "POSITION" } } } }
      ) {
        totalCount
      }
      getRoleCount: allJson(
        filter: { roles: { elemMatch: { type: { eq: "ROLE" } } } }
      ) {
        totalCount
      }
      getActivityCount: allJson(
        filter: { activities: { elemMatch: { type: { eq: "ACTIVITY" } } } }
      ) {
        totalCount
      }
      getCompetencyCount: allJson(
        filter: { competencies: { elemMatch: { type: { eq: "COMPETENCY" } } } }
      ) {
        totalCount
      }
    }
  `);

  useEffect(() => {
    setValue(value);
  }, [value]);

  function actionToSearch(e) {
    if (e.key === "Enter") {
      navigate("/search/", { state: { value: value } });
    }
  }

  return (
    <div className="limit-scroll-three">
      {/* For extra smaller screens */}
      <div className="d-block d-sm-none" style={{ margin: "-0.9em" }}>
        <Img
          fluid={data.placeholderImageMobileTwo.childImageSharp.fluid}
          alt="overview banner"
        />
      </div>

      {/* For smaller screens */}
      <div className="d-none d-sm-block d-md-none" style={{ margin: "-0.9em" }}>
        <Img
          fluid={data.placeholderImageMobile.childImageSharp.fluid}
          alt="overview banner"
        />
      </div>

      {/* For tab screens */}
      <div
        className="d-none d-md-block d-lg-none"
        style={{
          marginTop: "-1.55em",
          marginLeft: "-3.35em",
          marginRight: "-7.15%",
        }}
      >
        <Img
          fluid={data.placeholderImageTab.childImageSharp.fluid}
          alt="overview banner"
        />
      </div>

      <div className="h-100">
        {/*Image section*/}
        <div className="image-container d-none d-sm-none d-md-none d-lg-block d-xl-block">
          <Img
            fluid={data.placeholderImage.childImageSharp.fluid}
            alt="overview banner"
          />
        </div>

        {/*Search section*/}
        <div className="mt-5">
          <h2 className="view-heading">Have the reference number?</h2>
          <div className="row col-12">
            <label className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-5 p-0">
              <input
                type="search"
                className="form-control bigger-input col-11"
                id="mainSearch"
                aria-describedby="mainSearch"
                placeholder="Enter reference number here"
                onChange={() =>
                  setValue(document.getElementById("mainSearch").value)
                }
                onKeyPress={(e) => actionToSearch(e)}
                autoComplete="off"
              />
            </label>
            <Link to="/search/" state={{ value: value }}>
              <button
                type="button"
                className="btn arrow-button mt-2 mt-xs-2 mt-sm-2 mt-md-0 mt-lg-0 mt-xl-0"
              >
                <span className="material-icons">arrow_forward</span>
              </button>
            </Link>
          </div>
        </div>

        {/*Cards section*/}
        <div className="mt-5">
          <h3 className="view-heading">FRAC dictionary</h3>
          <div className="row metric-container">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-12 col-xl-2 custom-card-wave mb-2">
              <Link to="/positions/">
                <div className="pt-4 mt-1 pl-2 ml-1">
                  <label className="numeric-count">
                    {data.getPositionCount.totalCount}
                  </label>{" "}
                  <br />
                  <label className="numeric-label" htmlFor="Positions">
                    Positions
                  </label>
                </div>
              </Link>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-12 col-xl-2 custom-card-wave mb-2">
              <Link to="/roles/">
                <div className="pt-4 mt-1 pl-2 ml-1">
                  <label className="numeric-count">
                    {data.getRoleCount.totalCount}
                  </label>{" "}
                  <br />
                  <label className="numeric-label" htmlFor="Roles">
                    Roles
                  </label>
                </div>
              </Link>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-12 col-xl-2 custom-card-wave mb-2">
              <Link to="/activities/">
                <div className="pt-4 mt-1 pl-2 ml-1">
                  <label className="numeric-count">
                    {data.getActivityCount.totalCount}
                  </label>{" "}
                  <br />
                  <label className="numeric-label" htmlFor="Activities">
                    Activities
                  </label>
                </div>
              </Link>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-12 col-xl-2 custom-card-wave mb-2">
              <Link to="/competencies/">
                <div className="pt-4 mt-1 pl-2 ml-1">
                  <label className="numeric-count">
                    {data.getCompetencyCount.totalCount}
                  </label>{" "}
                  <br />
                  <label className="numeric-label" htmlFor="Competencies">
                    Competencies
                  </label>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/*What section*/}
        <div className="mt-5">
          <h3 className="view-heading">What is FRACing?</h3>
          <p className="mt-4 pt-2 col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-8 p-0 paragraph-one">
            Mapping of three constructs (roles, activities and competencies,
            supported by knowledge resources) for each individual position
            within all government ministries, departments and organisations
            (MDOs) at the national, state and local level.
          </p>
        </div>

        {/*How to use section*/}
        <div className="mt-5">
          <h3 className="view-heading">How to use this dictionary?</h3>
          <div className="row col-12">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mt-3">
              <div className="icon-button-one mb-4"></div>
              <h4 className="paragraph-heading">Browse</h4>
              <p className="paragraph-one">
                Browse through the list of positions, roles, activities and
                competencies approved and published by the FRAC review board
                under Karmayogi Bharat Special Purpose Vehicle.
              </p>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mt-3">
              <div className="icon-button-two mb-4"></div>
              <h4 className="paragraph-heading">Search and filter</h4>
              <p className="paragraph-one">
                Search and filter lists to find out the exact item you are
                looking for. Search by name or unique reference number.
              </p>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mt-3">
              <div className="icon-button-three mb-4"></div>
              <h4 className="paragraph-heading">Cite using reference number</h4>
              <p className="paragraph-one">
                Click on the reference number to copy the corresponding public
                link. The public link can be used for citation purposes.
              </p>
            </div>
          </div>
        </div>

        {/*Terminology*/}
        <div className="mt-5">
          <h3 className="view-heading">Terminology</h3>
          <div className="">
            <div className="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-8">
              <div className="term-bg col-xs-4 col-sm-4 col-md-4 col-lg-3 col-xl-3">
                <p className="paragraph-heading pt-1">MDO</p>
              </div>
              <div className="term-box  col-xs-8 col-sm-8 col-md-8 col-lg-9 col-xl-9">
                <p className="paragraph-one pt-1">
                  Ministries, departments and organisations
                </p>
              </div>
            </div>

            <div className="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-8">
              <div className="term-bg col-xs-4 col-sm-4 col-md-4 col-lg-3 col-xl-3">
                <p className="paragraph-heading pt-1">COD</p>
              </div>
              <div className="term-box  col-xs-8 col-sm-8 col-md-8 col-lg-9 col-xl-9">
                <p className="paragraph-one pt-1">
                  Competency-owning department
                </p>
              </div>
            </div>

            <div className="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-8">
              <div className="term-bg col-xs-4 col-sm-4 col-md-4 col-lg-3 col-xl-3">
                <p className="paragraph-heading pt-1">ISTM</p>
              </div>
              <div className="term-box  col-xs-8 col-sm-8 col-md-8 col-lg-9 col-xl-9">
                <p className="paragraph-one pt-1">
                  Institute of Secretariat Training and Management
                </p>
              </div>
            </div>

            <div className="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-8">
              <div className="term-bg col-xs-4 col-sm-4 col-md-4 col-lg-3 col-xl-3">
                <p className="paragraph-heading pt-1">DoPT</p>
              </div>
              <div className="term-box  col-xs-8 col-sm-8 col-md-8 col-lg-9 col-xl-9">
                <p className="paragraph-one pt-1">
                  Department of Personnel Training
                </p>
              </div>
            </div>

            <div className="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-8">
              <div className="term-bg col-xs-4 col-sm-4 col-md-4 col-lg-3 col-xl-3">
                <p className="paragraph-heading pt-1">UPSC</p>
              </div>
              <div className="term-box  col-xs-8 col-sm-8 col-md-8 col-lg-9 col-xl-9">
                <p className="paragraph-one pt-1">
                  Union Public Service Commission
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewView;
