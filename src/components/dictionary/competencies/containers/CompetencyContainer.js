import React from "react"
import CompetencyView from "../views/CompetencyView"

const CompetencyContainer = () => {
  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-9 h-100">
      <div className="m-2">
        <h3 className="view-heading">Competencies</h3>
        <CompetencyView />
      </div>
    </div>
  )
}

export default CompetencyContainer
