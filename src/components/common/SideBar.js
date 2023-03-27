import React from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";

const SideBar = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
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

  return (
    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-3 h-100 d-none d-sm-none d-md-none d-lg-block d-xl-block">
      <Link to="/overview/">
        <div
          className={`${
            location.pathname === "/" ||
            location.pathname === "/overview/" ||
            location.pathname === "/search/"
              ? "active-link"
              : "side-navigation"
          }`}
        >
          Overview
        </div>
      </Link>
      <Link to="/positions/">
        <div
          className={`${
            location.pathname === "/positions/"
              ? "active-link"
              : "side-navigation"
          }`}
        >
          Positions
          <span className="float-right side-count">
            {data.getPositionCount.totalCount}
          </span>
        </div>
      </Link>
      <Link to="/roles/">
        <div
          className={`${
            location.pathname === "/roles/" ? "active-link" : "side-navigation"
          }`}
        >
          Roles
          <span className="float-right side-count">
            {data.getRoleCount.totalCount}
          </span>
        </div>
      </Link>
      <Link to="/activities/">
        <div
          className={`${
            location.pathname === "/activities/"
              ? "active-link"
              : "side-navigation"
          }`}
        >
          Activities
          <span className="float-right side-count">
            {data.getActivityCount.totalCount}
          </span>
        </div>
      </Link>
      <Link to="/competencies/">
        <div
          className={`${
            location.pathname === "/competencies/" ||
            location.pathname.includes("/competencyDetail/")
              ? "active-link"
              : "side-navigation"
          }`}
        >
          Competencies
          <span className="float-right side-count">
            {data.getCompetencyCount.totalCount}
          </span>
        </div>
      </Link>

      <div className="about-section mt-5">
        <div className="row ml-3 ml-xs-3 ml-sm-3 ml-md-0 ml-lg-0 ml-xl-0">
          {/* <Link to="/about/">
            <p className="underline-bc ml-2">About us</p>
          </Link>
          <div
            className="dot ml-3 mr-3 ml-xs-3 ml-sm-3 ml-md-2 ml-lg-2 ml-xl-2 mr-xs-2 mr-sm-2 mr-md-2 mr-lg-2 mr-xl-2"
            style={{ marginTop: "0.65em" }}
          ></div>
          <Link to="/privacy/">
            <p className="underline-bc">Privacy Policy</p>
          </Link> */}
        </div>
        <p className="ml-3 ml-xs-2 ml-sm-2 ml-md-2 ml-lg-2 ml-xl-2">
          © Copyright 2020 - 2022
        </p>
      </div>
    </div>
  );
};

export default SideBar;
