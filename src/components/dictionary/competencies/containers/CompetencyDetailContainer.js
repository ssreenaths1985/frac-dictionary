import React from "react"
import CompetencyDetailView from "../views/CompetencyDetailView"

const CompetencyDetailContainer = ({ location, data  }) => {
  return (
    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-9 h-100">
      <div className="m-2">
        <CompetencyDetailView location={location} data={data} />
      </div>
    </div>
  )
}

export default CompetencyDetailContainer
