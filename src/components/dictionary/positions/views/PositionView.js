import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const PositionView = () => {
  const [rCount, setRCount] = useState(" ");
  const [clearSearchInputOne, setclearSearchInputOne] = useState();
  const [clearSearchInputTwo, setclearSearchInputTwo] = useState();
  const [mdoClearSearchInputOne, setMdoClearSearchInputOne] = useState();
  const [mdoClearSearchInputTwo, setMdoClearSearchInputTwo] = useState();
  const [sectorClearSearchInputOne, setSectorClearSearchInputOne] = useState();
  const [sectorClearSearchInputTwo, setSectorClearSearchInputTwo] = useState();
  const [allPositions, setAllPositions] = useState("All");
  const [mdoArray, setMdoArray] = useState(["All"]);
  const [sectorArray, setSectorArray] = useState(["All"]);

  console.log("Extracting queries from PositionView!");

  const staticData = useStaticQuery(graphql`
    query {
      getPositionCount: allJson(
        filter: { positions: { elemMatch: { type: { eq: "POSITION" } } } }
      ) {
        totalCount
      }
      getAllPositions: allJson {
        edges {
          node {
            positions {
              id
              name
              description
              additionalProperties {
                Department
                sector
              }
            }
          }
        }
      }
      getAllPosDepartments
    }
  `);

  // Query for runtime
  const getFilterByType = gql`
    query filterPositions($mdo: [String], $sector: [String]) {
      getAllPositions(department: $mdo, sector: $sector) {
        id
        name
        description
        additionalProperties {
          Department
          sector
        }
      }
    }
  `;

  // Filtering duplicates in filter dropdown
  var uniq = {};
  var filteredArray =
    staticData.getAllPosDepartments &&
    staticData.getAllPosDepartments.filter(
      (obj) => !uniq[obj] && (uniq[obj] = true)
    );

  var filteredArrayTwo = [];
  var uniqTwo = {};

  staticData.getAllPositions &&
    staticData.getAllPositions.edges[0].node.positions &&
    staticData.getAllPositions.edges[0].node.positions.map((k, l) => {
      if (k.additionalProperties && k.additionalProperties.sector) {
        filteredArrayTwo.push(k.additionalProperties?.sector);
      }
      return null;
    });

  filteredArrayTwo =
    filteredArrayTwo.length > 0 &&
    filteredArrayTwo.filter((obj) => !uniqTwo[obj] && (uniqTwo[obj] = true));

  // data.getAllPosDepartments &&
  // data.getAllPosDepartments.filter((obj) => !uniq[obj] && (uniq[obj] = true));

  // var uniq = {};
  // var filteredArray =
  //   data.getAllPosDepartments &&
  //   data.getAllPosDepartments.filter((obj) => !uniq[obj] && (uniq[obj] = true));

  function searchMDOs() {
    var input, filter, ul, li, a, i, j, txtValue;

    input = document.getElementById("mdoSearch");

    if (!mdoClearSearchInputOne) {
      if (input.value.length === 1) {
        setMdoClearSearchInputTwo(false);
      } else {
        setMdoClearSearchInputTwo(true);
      }
    } else {
      setMdoClearSearchInputOne(false);
      setMdoClearSearchInputTwo(false);
    }

    if (input.value.length === 0) {
      setMdoClearSearchInputOne(false);
      setMdoClearSearchInputTwo(false);
    }

    if (!mdoClearSearchInputOne) {
      filter = input.value.toUpperCase();
    } else {
      filter = "";
    }

    ul = document.getElementById("mdoFilter");
    li = ul.getElementsByTagName("div");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("div");

      for (j = 0; j < a.length; j++) {
        if (
          a[j].getElementsByTagName("button")[0] &&
          a[j].getElementsByTagName("button")[0].outerText !== "close" &&
          a[j].getElementsByTagName("button")[0].outerText !== undefined
        ) {
          txtValue = a[j].getElementsByTagName("button")[0].outerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[j].style.display = "";
          } else {
            if (a[j].className !== "custom-dd-height-1") {
              a[j].style.display = "none";
            }
          }
        }
      }
    }
  }

  function searchSectors() {
    var input, filter, ul, li, a, i, j, txtValue;

    input = document.getElementById("sectorSearch");

    if (!sectorClearSearchInputOne) {
      if (input.value.length === 1) {
        setSectorClearSearchInputTwo(false);
      } else {
        setSectorClearSearchInputTwo(true);
      }
    } else {
      setSectorClearSearchInputOne(false);
      setSectorClearSearchInputTwo(false);
    }

    if (input.value.length === 0) {
      setSectorClearSearchInputOne(false);
      setSectorClearSearchInputTwo(false);
    }

    if (!sectorClearSearchInputOne) {
      filter = input.value.toUpperCase();
    } else {
      filter = "";
    }

    ul = document.getElementById("sectorFilter");
    li = ul.getElementsByTagName("div");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("div");

      for (j = 0; j < a.length; j++) {
        if (
          a[j].getElementsByTagName("button")[0] &&
          a[j].getElementsByTagName("button")[0].outerText !== "close" &&
          a[j].getElementsByTagName("button")[0].outerText !== undefined
        ) {
          txtValue = a[j].getElementsByTagName("button")[0].outerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[j].style.display = "";
          } else {
            if (a[j].className !== "custom-dd-height-1") {
              a[j].style.display = "none";
            }
          }
        }
      }
    }
  }

  // For multiple mdo selection
  const multiSelectMdo = (value) => {
    if (value !== "All") {
      let tempArray = [...mdoArray];

      if (!mdoArray.includes(value)) {
        tempArray.push(value);
      } else {
        let index = tempArray.indexOf(value);
        if (index > -1) {
          tempArray.splice(index, 1);
        }
      }

      if (tempArray.includes("All")) {
        let index = tempArray.indexOf("All");
        if (index > -1) {
          tempArray.splice(index, 1);
        }
      }

      if (tempArray.length === 0) {
        tempArray.push("All");
      }

      setMdoArray(tempArray);
    } else {
      let defaultArray = ["All"];
      setMdoArray(defaultArray);
    }
  };

  // For multiple sector selection
  const multiSelectSector = (value) => {
    if (value !== "All") {
      let tempArray = [...sectorArray];

      if (!sectorArray.includes(value)) {
        tempArray.push(value);
      } else {
        let index = tempArray.indexOf(value);
        if (index > -1) {
          tempArray.splice(index, 1);
        }
      }

      if (tempArray.includes("All")) {
        let index = tempArray.indexOf("All");
        if (index > -1) {
          tempArray.splice(index, 1);
        }
      }

      if (tempArray.length === 0) {
        tempArray.push("All");
      }

      setSectorArray(tempArray);
    } else {
      let defaultArray = ["All"];
      setSectorArray(defaultArray);
    }
  };

  function updateCount() {
    var divs = Array.prototype.slice.call(
      document.querySelectorAll("#positionsList .list-card")
    );

    var count = divs.reduce(function (a, b) {
      return a + (b.style.display !== "none" ? 1 : 0);
    }, 0);

    setRCount(count);
  }

  const removeMultipleFilters = (e, value, type) => {
    e.preventDefault();

    let tempArray = [];

    switch (type) {
      case "mdo":
        tempArray = [...mdoArray];
        let indexArea = tempArray.indexOf(value);
        if (indexArea > -1) {
          tempArray.splice(indexArea, 1);
        }

        if (tempArray.length === 0) {
          tempArray.push("All");
        }

        setMdoArray(tempArray);
        break;

      case "sector":
        tempArray = [...sectorArray];
        let indexSector = tempArray.indexOf(value);
        if (indexSector > -1) {
          tempArray.splice(indexSector, 1);
        }

        if (tempArray.length === 0) {
          tempArray.push("All");
        }

        setSectorArray(tempArray);
        break;
      default:
        return null;
    }
  };

  function searchByInput() {
    var input, filter, ul, li, sl, a, i, txtValue, descValue;

    input = document.getElementById("positionSearch");

    if (!clearSearchInputOne) {
      if (input.value.length === 1) {
        setclearSearchInputTwo(false);
      } else {
        setclearSearchInputTwo(true);
      }
    } else {
      setclearSearchInputOne(false);
      setclearSearchInputTwo(false);
    }

    if (input.value.length === 0) {
      setclearSearchInputOne(false);
      setclearSearchInputTwo(false);
    }

    if (!clearSearchInputOne) {
      filter = input.value.toUpperCase();
    } else {
      filter = "";
    }

    ul = document.getElementById("positionsList");
    li = ul.getElementsByTagName("div");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("div")[0];
      sl = li[i].getElementsByTagName("div")[2];

      if (a !== undefined) {
        txtValue = a.textContent || a.innerText;
      }

      if (sl !== undefined) {
        descValue = sl.textContent || sl.innerText;
      }

      if (
        txtValue.toUpperCase().indexOf(filter) > -1 ||
        descValue.toUpperCase().indexOf(filter) > -1
      ) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
    var divs = Array.prototype.slice.call(
      document.querySelectorAll("#positionsList .list-card")
    );

    setRCount(
      divs.reduce(function (a, b) {
        return a + (b.style.display !== "none" ? 1 : 0);
      }, 0)
    );
  }

  useEffect(() => {
    searchByInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearSearchInputOne]);

  useEffect(() => {
    searchMDOs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mdoClearSearchInputOne]);

  useEffect(() => {
    searchSectors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectorClearSearchInputOne]);

  // useEffect(() => {
  //   if (mdoArray || sectorArray) {
  //     setTimeout(() => updateCount(), 950);
  //     setTimeout(() => updateCount(), 1250);
  //   }
  // }, [mdoArray, sectorArray]);

  useEffect(() => {
    updateCount();
  }, [allPositions]);

  return (
    <div className="col-12 h-100 p-0">
      <div className="mt-4">
        <div className="row col-12">
          <div className="row col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 p-0">
            <label className="col-10">
              <input
                type="text"
                className="form-control bigger-input-2 custom-search"
                id="positionSearch"
                aria-describedby="positionSearch"
                placeholder="Search"
                onChange={() => {
                  searchByInput();
                }}
                autoComplete="off"
              />
            </label>
            <div className="col-2">
              {clearSearchInputTwo && (
                <button
                  className="material-icons close-btn"
                  onClick={() => {
                    setclearSearchInputOne(true);
                    document.getElementById("positionSearch").value = "";
                  }}
                  onKeyDown={() => {
                    setclearSearchInputOne(true);
                    document.getElementById("positionSearch").value = "";
                  }}
                >
                  close
                </button>
              )}
            </div>
          </div>

          <div className="col-12 m-0 p-0">
            {/* Filter by MDO */}
            <div className="d-md-inline-flex d-lg-inline-flex">
              <div className="dropdown mt-2" id="mdoFilter">
                <button
                  className={`btn filter-btn ${
                    mdoArray[0] === "All"
                      ? "dropdown-toggle"
                      : "dropdown-toggle dropdown-toggle-color"
                  }`}
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-2 filter-name">MDO</span>
                  <span
                    className={`mr-1 ${
                      mdoArray[0] === "All" ? "all-filter" : "selected-filter"
                    }`}
                  >
                    {mdoArray.length === 1
                      ? mdoArray[0]
                      : mdoArray.length === 0
                      ? "All"
                      : "Multiple mdo"}
                  </span>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <div className="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-1">
                    <label className="col-9">
                      <input
                        type="text"
                        style={{ width: "max-content" }}
                        className="form-control bigger-input-2 custom-search"
                        id="mdoSearch"
                        aria-describedby="mdoSearch"
                        placeholder="Search"
                        onChange={() => {
                          searchMDOs();
                        }}
                        autoComplete="off"
                      />
                    </label>
                    <div className="col-2">
                      {mdoClearSearchInputTwo && (
                        <button
                          className="material-icons close-btn-3"
                          onClick={() => {
                            setMdoClearSearchInputOne(true);
                            document.getElementById("mdoSearch").value = "";
                          }}
                          onKeyDown={() => {
                            setMdoClearSearchInputOne(true);
                            document.getElementById("mdoSearch").value = "";
                          }}
                        >
                          close
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="custom-dd-height-1">
                    <button
                      className="dd-btn w-100"
                      onClick={() => {
                        multiSelectMdo("All");
                        updateCount();
                      }}
                      onKeyDown={() => {
                        multiSelectMdo("All");
                        updateCount();
                      }}
                    >
                      All
                    </button>
                    <hr />
                    {filteredArray.map((value, index) => {
                      return (
                        <div className="" key={index}>
                          <button
                            className="dd-btn w-100"
                            key={index}
                            onClick={() => {
                              multiSelectMdo(value);
                              updateCount();
                            }}
                            onKeyDown={() => {
                              multiSelectMdo(value);
                              updateCount();
                            }}
                          >
                            <span className="material-icons mr-1 custom-checkbox-icon">
                              {mdoArray.includes(value)
                                ? `check_box`
                                : `check_box_outline_blank`}
                            </span>
                            {value}
                          </button>
                          <hr />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Filter by sector */}
            <div className="d-md-inline-flex d-lg-inline-flex ml-2 ml-sm-0 ml-md-2 ml-lg-2">
              <div className="dropdown mt-2" id="sectorFilter">
                <button
                  className={`btn filter-btn ${
                    sectorArray[0] === "All"
                      ? "dropdown-toggle"
                      : "dropdown-toggle dropdown-toggle-color"
                  }`}
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-2 filter-name">Sector</span>
                  <span
                    className={`mr-1 ${
                      sectorArray[0] === "All"
                        ? "all-filter"
                        : "selected-filter"
                    }`}
                  >
                    {sectorArray.length === 1
                      ? sectorArray[0]
                      : sectorArray.length === 0
                      ? "All"
                      : "Multiple sectors"}
                  </span>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <div className="row col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-1">
                    <label className="col-9">
                      <input
                        type="text"
                        style={{ width: "max-content" }}
                        className="form-control bigger-input-2 custom-search"
                        id="sectorSearch"
                        aria-describedby="sectorSearch"
                        placeholder="Search"
                        onChange={() => {
                          searchSectors();
                        }}
                        autoComplete="off"
                      />
                    </label>
                    <div className="col-2">
                      {sectorClearSearchInputTwo && (
                        <button
                          className="material-icons close-btn-3"
                          onClick={() => {
                            setSectorClearSearchInputOne(true);
                            document.getElementById("sectorSearch").value = "";
                          }}
                          onKeyDown={() => {
                            setSectorClearSearchInputOne(true);
                            document.getElementById("sectorSearch").value = "";
                          }}
                        >
                          close
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="custom-dd-height-1">
                    <button
                      className="dd-btn w-100"
                      onClick={() => {
                        multiSelectSector("All");
                        updateCount();
                      }}
                      onKeyDown={() => {
                        multiSelectSector("All");
                        updateCount();
                      }}
                    >
                      All
                    </button>
                    <hr />
                    {filteredArrayTwo.length > 0 &&
                      filteredArrayTwo.map((value, index) => {
                        return (
                          <div className="" key={index}>
                            <button
                              className="dd-btn w-100"
                              key={index}
                              onClick={() => {
                                multiSelectSector(value);
                                updateCount();
                              }}
                              onKeyDown={() => {
                                multiSelectSector(value);
                                updateCount();
                              }}
                            >
                              <span className="material-icons mr-1 custom-checkbox-icon">
                                {sectorArray.includes(value)
                                  ? `check_box`
                                  : `check_box_outline_blank`}
                              </span>
                              {value}
                            </button>
                            <hr />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="mb-3">
            <Query
              query={getFilterByType}
              variables={{
                mdo: !mdoArray.includes("All") ? mdoArray : [],
                sector: !sectorArray.includes("All") ? sectorArray : [],
              }}
            >
              {({ data, loading, error }) => {
                setAllPositions(data);
                if (
                  data !== undefined &&
                  data.getAllPositions &&
                  data.getAllPositions.length > 0
                ) {
                  return (
                    <React.Fragment>
                      {rCount.length === 1 && rCount !== 1 && (
                        <div className="d-flex flex ml-1 justify-element">
                          <p className="item-count">
                            {staticData.getPositionCount &&
                              staticData.getPositionCount.totalCount + " items"}
                          </p>
                          {(mdoArray[0] || sectorArray[0]) &&
                            (mdoArray[0] !== "All" ||
                              sectorArray[0] !== "All") && (
                              <button
                                className="clear-filter-btn"
                                onClick={() => {
                                  multiSelectMdo("All");
                                  multiSelectSector("All");

                                  updateCount();
                                  setMdoClearSearchInputOne(true);
                                  document.getElementById("mdoSearch").value =
                                    "";
                                  setSectorClearSearchInputOne(true);
                                  document.getElementById(
                                    "sectorSearch"
                                  ).value = "";
                                }}
                                onKeyDown={() => {
                                  multiSelectMdo("All");
                                  multiSelectSector("All");
                                  updateCount();
                                  setMdoClearSearchInputOne(true);
                                  document.getElementById("mdoSearch").value =
                                    "";
                                  setSectorClearSearchInputOne(true);
                                  document.getElementById(
                                    "sectorSearch"
                                  ).value = "";
                                }}
                              >
                                Clear filters
                              </button>
                            )}
                        </div>
                      )}

                      {rCount.length !== 1 && rCount !== 1 && (
                        <div className="d-flex flex ml-1 justify-element">
                          <p className="item-count">{rCount + " items"}</p>
                          {(mdoArray[0] || sectorArray[0]) &&
                            (mdoArray[0] !== "All" ||
                              sectorArray[0] !== "All") && (
                              <button
                                className="clear-filter-btn"
                                onClick={() => {
                                  multiSelectMdo("All");

                                  multiSelectSector("All");
                                  updateCount();
                                  setMdoClearSearchInputOne(true);
                                  document.getElementById("mdoSearch").value =
                                    "";
                                  setSectorClearSearchInputOne(true);
                                  document.getElementById(
                                    "sectorSearch"
                                  ).value = "";
                                }}
                                onKeyDown={() => {
                                  multiSelectMdo("All");

                                  multiSelectSector("All");
                                  updateCount();
                                  setMdoClearSearchInputOne(true);
                                  document.getElementById("mdoSearch").value =
                                    "";
                                  setSectorClearSearchInputOne(true);
                                  document.getElementById(
                                    "sectorSearch"
                                  ).value = "";
                                }}
                              >
                                Clear filters
                              </button>
                            )}
                        </div>
                      )}

                      {rCount.length !== 1 && rCount === 1 && (
                        <div className="d-flex flex ml-1 justify-element">
                          <p className="item-count">{rCount + " item"}</p>
                          {(mdoArray[0] || sectorArray[0]) &&
                            (mdoArray[0] !== "All" ||
                              sectorArray[0] !== "All") && (
                              <button
                                className="clear-filter-btn"
                                onClick={() => {
                                  multiSelectMdo("All");

                                  multiSelectSector("All");
                                  updateCount();
                                  setMdoClearSearchInputOne(true);
                                  document.getElementById("mdoSearch").value =
                                    "";

                                  setSectorClearSearchInputOne(true);
                                  document.getElementById(
                                    "sectorSearch"
                                  ).value = "";
                                }}
                                onKeyDown={() => {
                                  multiSelectMdo("All");

                                  multiSelectSector("All");
                                  updateCount();
                                  setMdoClearSearchInputOne(true);
                                  document.getElementById("mdoSearch").value =
                                    "";

                                  setSectorClearSearchInputOne(true);
                                  document.getElementById(
                                    "sectorSearch"
                                  ).value = "";
                                }}
                              >
                                Clear filters
                              </button>
                            )}
                        </div>
                      )}

                      {/* Chips for custom filters */}
                      {((mdoArray[0] !== "" && mdoArray[0] !== "All") ||
                        (sectorArray[0] !== "" &&
                          sectorArray[0] !== "All")) && (
                        <div className="row col-12 mb-2 p-0 m-0 mb-4">
                          {mdoArray.map((i, j) => {
                            if (i !== "All") {
                              return (
                                <div className="mr-2 mt-2" key={j}>
                                  <span class="badge badge-pill badge-light custom-chip-one ">
                                    {`MDO | ${i}`}
                                    <span
                                      className="material-icons pl-2"
                                      role="button"
                                      tabIndex={0}
                                      onClick={(e) =>
                                        removeMultipleFilters(e, i, "mdo")
                                      }
                                      onKeyDown={(e) => {
                                        removeMultipleFilters(e, i, "mdo");
                                      }}
                                    >
                                      close
                                    </span>
                                  </span>
                                </div>
                              );
                            }
                            return null;
                          })}
                          {sectorArray.map((k, l) => {
                            if (k !== "All") {
                              return (
                                <div className="mr-2 mt-2" key={l}>
                                  <span class="badge badge-pill badge-light custom-chip-one ">
                                    {`Sector | ${k}`}
                                    <span
                                      className="material-icons pl-2"
                                      role="button"
                                      tabIndex={0}
                                      onClick={(e) =>
                                        removeMultipleFilters(e, k, "sector")
                                      }
                                      onKeyDown={(e) => {
                                        removeMultipleFilters(e, k, "sector");
                                      }}
                                    >
                                      close
                                    </span>
                                  </span>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      )}

                      <div
                        className="mb-3 limit-scroll-four"
                        id="positionsList"
                      >
                        {data.getAllPositions.length > 0 &&
                          data.getAllPositions
                            .filter((edge) => !!data.getAllPositions)
                            .map((value, index) => {
                              return (
                                <div className="list-card mb-3" key={index}>
                                  <div className="row">
                                    <div className="col-xs-4 col-sm-4 col-md-12 col-lg-4 col-xl-3 right-border custom-padding-1">
                                      <label>{value.id}</label>
                                      <h3 className="pt-1">{value.name}</h3>
                                      <h6>
                                        {value.additionalProperties
                                          ? value.additionalProperties
                                              .Department
                                          : ""}
                                      </h6>
                                      <h6>
                                        {value.additionalProperties
                                          ? value.additionalProperties.sector
                                          : ""}
                                      </h6>
                                    </div>

                                    <div className="col-xs-8 col-sm-8 col-md-12 col-lg-8 col-xl-9 custom-padding-2">
                                      <p>{value.description}</p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                      </div>
                    </React.Fragment>
                  );
                } else if (
                  data !== undefined &&
                  data.getAllPositions &&
                  data.getAllPositions.length === 0
                ) {
                  return (
                    <>
                      <div className="d-flex flex ml-1 justify-element">
                        <p className="item-count">0 items</p>
                        {(mdoArray[0] || sectorArray[0]) &&
                          (mdoArray[0] !== "All" ||
                            sectorArray[0] !== "All") && (
                            <button
                              className="clear-filter-btn"
                              onClick={() => {
                                multiSelectMdo("All");

                                multiSelectSector("All");
                                updateCount();
                                setMdoClearSearchInputOne(true);
                                document.getElementById("mdoSearch").value = "";

                                setSectorClearSearchInputOne(true);
                                document.getElementById("sectorSearch").value =
                                  "";
                              }}
                              onKeyDown={() => {
                                multiSelectMdo("All");

                                multiSelectSector("All");
                                updateCount();
                                setMdoClearSearchInputOne(true);
                                document.getElementById("mdoSearch").value = "";

                                setSectorClearSearchInputOne(true);
                                document.getElementById("sectorSearch").value =
                                  "";
                              }}
                            >
                              Clear filters
                            </button>
                          )}
                      </div>

                      <div className="">
                        {/* Chips for custom filters */}
                        {((mdoArray[0] !== "" && mdoArray[0] !== "All") ||
                          (sectorArray[0] !== "" &&
                            sectorArray[0] !== "All")) && (
                          <div className="row col-12 mb-2 p-0 m-0 mb-4">
                            {mdoArray.map((i, j) => {
                              if (i !== "All") {
                                return (
                                  <div className="mr-2 mt-2" key={j}>
                                    <span class="badge badge-pill badge-light custom-chip-one ">
                                      {`MDO | ${i}`}
                                      <span
                                        className="material-icons pl-2"
                                        role="button"
                                        tabIndex={0}
                                        onClick={(e) =>
                                          removeMultipleFilters(e, i, "mdo")
                                        }
                                        onKeyDown={(e) =>
                                          removeMultipleFilters(e, i, "mdo")
                                        }
                                      >
                                        close
                                      </span>
                                    </span>
                                  </div>
                                );
                              }
                              return null;
                            })}

                            {sectorArray.map((k, l) => {
                              if (k !== "All") {
                                return (
                                  <div className="mr-2 mt-2" key={l}>
                                    <span class="badge badge-pill badge-light custom-chip-one ">
                                      {`Sector | ${k}`}
                                      <span
                                        className="material-icons pl-2"
                                        role="button"
                                        tabIndex={0}
                                        onClick={(e) =>
                                          removeMultipleFilters(e, k, "sector")
                                        }
                                        onKeyDown={(e) =>
                                          removeMultipleFilters(e, k, "sector")
                                        }
                                      >
                                        close
                                      </span>
                                    </span>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        )}
                      </div>
                    </>
                  );
                } else {
                  return (
                    <React.Fragment>
                      {rCount.length === 1 && rCount !== 1 && (
                        <div className="d-flex flex ml-1 justify-element">
                          <p className="item-count">
                            {staticData.getPositionCount &&
                              staticData.getPositionCount.totalCount + " items"}
                          </p>
                          {(mdoArray[0] || sectorArray[0]) &&
                            (mdoArray[0] !== "All" ||
                              sectorArray[0] !== "All") && (
                              <button
                                className="clear-filter-btn"
                                onClick={() => {
                                  multiSelectMdo("All");

                                  multiSelectSector("All");
                                  updateCount();
                                  setMdoClearSearchInputOne(true);
                                  document.getElementById("mdoSearch").value =
                                    "";

                                  setSectorClearSearchInputOne(true);
                                  document.getElementById(
                                    "sectorSearch"
                                  ).value = "";
                                }}
                                onKeyDown={() => {
                                  multiSelectMdo("All");

                                  multiSelectSector("All");
                                  updateCount();
                                  setMdoClearSearchInputOne(true);
                                  document.getElementById("mdoSearch").value =
                                    "";

                                  setSectorClearSearchInputOne(true);
                                  document.getElementById(
                                    "sectorSearch"
                                  ).value = "";
                                }}
                              >
                                Clear filters
                              </button>
                            )}
                        </div>
                      )}

                      {rCount.length !== 1 && rCount !== 1 && (
                        <div className="d-flex flex ml-1 justify-element">
                          <p className="item-count">{rCount + " items"}</p>
                          {(mdoArray[0] || sectorArray[0]) &&
                            (mdoArray[0] !== "All" ||
                              sectorArray[0] !== "All") && (
                              <button
                                className="clear-filter-btn"
                                onClick={() => {
                                  multiSelectMdo("All");

                                  multiSelectSector("All");
                                  updateCount();
                                  setMdoClearSearchInputOne(true);
                                  document.getElementById("mdoSearch").value =
                                    "";

                                  setSectorClearSearchInputOne(true);
                                  document.getElementById(
                                    "sectorSearch"
                                  ).value = "";
                                }}
                                onKeyDown={() => {
                                  multiSelectMdo("All");

                                  multiSelectSector("All");
                                  updateCount();
                                  setMdoClearSearchInputOne(true);
                                  document.getElementById("mdoSearch").value =
                                    "";

                                  setSectorClearSearchInputOne(true);
                                  document.getElementById(
                                    "sectorSearch"
                                  ).value = "";
                                }}
                              >
                                Clear filters
                              </button>
                            )}
                        </div>
                      )}

                      {rCount.length !== 1 && rCount === 1 && (
                        <div className="d-flex flex ml-1 justify-element">
                          <p className="item-count">{rCount + " item"}</p>
                          {(mdoArray[0] || sectorArray[0]) &&
                            (mdoArray[0] !== "All" ||
                              sectorArray[0] !== "All") && (
                              <button
                                className="clear-filter-btn"
                                onClick={() => {
                                  multiSelectMdo("All");

                                  multiSelectSector("All");
                                  updateCount();
                                  setMdoClearSearchInputOne(true);
                                  document.getElementById("mdoSearch").value =
                                    "";

                                  setSectorClearSearchInputOne(true);
                                  document.getElementById(
                                    "sectorSearch"
                                  ).value = "";
                                }}
                                onKeyDown={() => {
                                  multiSelectMdo("All");

                                  multiSelectSector("All");
                                  updateCount();
                                  setMdoClearSearchInputOne(true);
                                  document.getElementById("mdoSearch").value =
                                    "";

                                  setSectorClearSearchInputOne(true);
                                  document.getElementById(
                                    "sectorSearch"
                                  ).value = "";
                                }}
                              >
                                Clear filters
                              </button>
                            )}
                        </div>
                      )}

                      {/* Chips for custom filters */}
                      {((mdoArray[0] !== "" && mdoArray[0] !== "All") ||
                        (sectorArray[0] !== "" &&
                          sectorArray[0] !== "All")) && (
                        <div className="row col-12 mb-2 p-0 m-0 mb-4">
                          {mdoArray.map((i, j) => {
                            if (i !== "All") {
                              return (
                                <div className="mr-2 mt-2" key={j}>
                                  <span class="badge badge-pill badge-light custom-chip-one ">
                                    {`MDO | ${i}`}
                                    <span
                                      className="material-icons pl-2"
                                      role="button"
                                      tabIndex={0}
                                      onClick={(e) =>
                                        removeMultipleFilters(e, i, "mdo")
                                      }
                                      onKeyDown={(e) => {
                                        removeMultipleFilters(e, i, "mdo");
                                      }}
                                    >
                                      close
                                    </span>
                                  </span>
                                </div>
                              );
                            }
                            return null;
                          })}

                          {sectorArray.map((k, l) => {
                            if (k !== "All") {
                              return (
                                <div className="mr-2 mt-2" key={l}>
                                  <span class="badge badge-pill badge-light custom-chip-one ">
                                    {`Sector | ${k}`}
                                    <span
                                      className="material-icons pl-2"
                                      role="button"
                                      tabIndex={0}
                                      onClick={(e) =>
                                        removeMultipleFilters(e, k, "sector")
                                      }
                                      onKeyDown={(e) => {
                                        removeMultipleFilters(e, k, "sector");
                                      }}
                                    >
                                      close
                                    </span>
                                  </span>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      )}

                      <div
                        className="mb-3 limit-scroll-four"
                        id="positionsList"
                      >
                        {staticData.getAllPositions &&
                          staticData.getAllPositions.edges[0].node.positions &&
                          staticData.getAllPositions.edges[0].node.positions
                            .filter(
                              (edge) =>
                                !staticData.getAllPositions.edges[0].node
                                  .positions
                            )
                            .map((value, index) => {
                              return (
                                <div className="list-card mb-3" key={index}>
                                  <div className="row">
                                    <div className="col-xs-4 col-sm-4 col-md-12 col-lg-4 col-xl-3 right-border custom-padding-1">
                                      <label>{value.id}</label>
                                      <h3 className="pt-1">{value.name}</h3>
                                      <h6>
                                        {value.additionalProperties
                                          ? value.additionalProperties
                                              .Department
                                          : ""}
                                      </h6>
                                      <h6>
                                        {value.additionalProperties
                                          ? value.additionalProperties.sector
                                          : ""}
                                      </h6>
                                    </div>

                                    <div className="col-xs-8 col-sm-8 col-md-12 col-lg-8 col-xl-9 custom-padding-2">
                                      <p>{value.description}</p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                      </div>
                    </React.Fragment>
                  );
                }
              }}
            </Query>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionView;
