import React from "react";
import OverviewSearchView from "../views/OverviewSearchView";

const OverviewSearchContainer = ({ location }) => {
  return (
    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-9 h-100">
      <div className="m-2">
        <OverviewSearchView location={location}/>
      </div>
    </div>
  );
};

export default OverviewSearchContainer;
