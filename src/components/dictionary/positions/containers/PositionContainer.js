import React from "react"
import PositionView from "../views/PositionView"

const PositionContainer = () => {
  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-9 h-100">
      <div className="m-2">
        <h3 className="view-heading">Positions</h3>
        <PositionView />
      </div>
    </div>
  )
}

export default PositionContainer
