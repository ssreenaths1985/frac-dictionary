import React from "react"
import RolesView from "../views/RolesView"

const RolesContainer = () => {
  return (
    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-9 h-100">
      <div className="m-2">
        <h3 className="view-heading">Roles</h3>
        <RolesView />
      </div>
    </div>
  )
}

export default RolesContainer
