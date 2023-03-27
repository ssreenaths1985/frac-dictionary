import React from "react"
import ActivityView from "../views/ActivityView"

const ActivityContainer = () => {
  return (
    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-9 h-100">
      <div className="m-2">
        <h3 className="view-heading">Activities</h3>
        <ActivityView />
      </div>
    </div>
  )
}

export default ActivityContainer
