import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "gatsby";

/*
Competency view component 
Displays all the competencies with custom search
and filters
*/

const CompetencyView = () => {
  const [rCount, setRCount] = useState(" ");
  const [clearSearchInputOne, setclearSearchInputOne] = useState();
  const [clearSearchInputTwo, setclearSearchInputTwo] = useState();
  const [codClearSearchInputOne, setCodClearSearchInputOne] = useState();
  const [codClearSearchInputTwo, setCodClearSearchInputTwo] = useState();
  const [areaClearSearchInputOne, setAreaClearSearchInputOne] = useState();
  const [areaClearSearchInputTwo, setAreaClearSearchInputTwo] = useState();
  const [sectorClearSearchInputOne, setSectorClearSearchInputOne] = useState();
  const [sectorClearSearchInputTwo, setSectorClearSearchInputTwo] = useState();
  const [areaArray, setAreaArray] = useState(["All"]);
  const [typeArray, setTypeArray] = useState(["All"]);
  const [codArray, setCodArray] = useState(["All"]);
  const [sectorArray, setSectorArray] = useState(["All"]);
  const [allCompetencies, setAllCompetencies] = useState();

  console.log("Extracting queries from CompetenciesView!");

  // Query for build time
  const staticData = useStaticQuery(graphql`
    query {
      getCompetencyCount: allJson(
        filter: { competencies: { elemMatch: { type: { eq: "COMPETENCY" } } } }
      ) {
        totalCount
      }
      getAllCompetencies: getCompetencies
      getAllCods
      getAllAreas
      getAllSectors
    }
  `);

  // Query for runtime
  const getFilterByType = gql`
    query filterCompetencies(
      $cod: [String]
      $competencyType: [String]
      $competencyArea: [String]
      $competencySector: [String]
    ) {
      getAllCompetencies(
        cod: $cod
        competencyType: $competencyType
        competencyArea: $competencyArea
        competencySector: $competencySector
      ) {
        name
        id
        description
        status
        source
        additionalProperties {
          cod
          competencyType
          competencyArea
          competencySector
        }
      }
    }
  `;

  // Filtering duplicates in filter dropdown
  var uniq = {};
  var filteredArray = staticData?.getAllCods?.filter(
    (obj) => !uniq[obj] && (uniq[obj] = true)
  );

  var uniqTwo = {};
  var filteredArrayTwo = staticData?.getAllAreas?.filter(
    (obj) => !uniqTwo[obj] && (uniqTwo[obj] = true)
  );

  var uniqThree = {};
  var filteredArrayThree = staticData?.getAllSectors?.filter(
    (obj) => !uniqThree[obj] && (uniqThree[obj] = true)
  );

  // Search function
  function searchByInput() {
    var input, filter, ul, li, sl, a, i, txtValue, descValue;

    input = document.getElementById("competencySearch");

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

    ul = document.getElementById("competenciesList");
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
      document.querySelectorAll("#competenciesList .list-card")
    );

    setRCount(
      divs.reduce(function (a, b) {
        return a + (b.style.display !== "none" ? 1 : 0);
      }, 0)
    );
  }

  // Search COD's
  function searchCODs() {
    var input, filter, ul, li, a, i, j, txtValue;

    input = document.getElementById("codSearch");

    if (!codClearSearchInputOne) {
      if (input.value.length === 1) {
        setCodClearSearchInputTwo(false);
      } else {
        setCodClearSearchInputTwo(true);
      }
    } else {
      setCodClearSearchInputOne(false);
      setCodClearSearchInputTwo(false);
    }

    if (input.value.length === 0) {
      setCodClearSearchInputOne(false);
      setCodClearSearchInputTwo(false);
    }

    if (!codClearSearchInputOne) {
      filter = input.value.toUpperCase();
    } else {
      filter = "";
    }

    ul = document.getElementById("codFilter");
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

  // Search Area's
  function searchAreas() {
    var input, filter, ul, li, a, i, j, txtValue;

    input = document.getElementById("areaSearch");

    if (!areaClearSearchInputOne) {
      if (input.value.length === 1) {
        setAreaClearSearchInputTwo(false);
      } else {
        setAreaClearSearchInputTwo(true);
      }
    } else {
      setAreaClearSearchInputOne(false);
      setAreaClearSearchInputTwo(false);
    }

    if (input.value.length === 0) {
      setAreaClearSearchInputOne(false);
      setAreaClearSearchInputTwo(false);
    }

    if (!areaClearSearchInputOne) {
      filter = input.value.toUpperCase();
    } else {
      filter = "";
    }

    ul = document.getElementById("areaFilter");
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

  // Search Sector's
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

  function updateCount() {
    var divs = Array.prototype.slice.call(
      document.querySelectorAll("#competenciesList .list-card")
    );

    var count = divs.reduce(function (a, b) {
      return a + (b.style.display !== "none" ? 1 : 0);
    }, 0);

    setRCount(count);
  }

  // For multiple competency area selection
  const multiSelectArea = (value) => {
    if (value !== "All") {
      let tempArray = [...areaArray];

      if (!areaArray.includes(value)) {
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

      setAreaArray(tempArray);
    } else {
      let defaultArray = ["All"];
      setAreaArray(defaultArray);
    }
  };

  // For multiple competency type selection
  const multiSelectType = (value) => {
    if (value !== "All") {
      let tempArray = [...typeArray];

      if (!typeArray.includes(value)) {
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

      setTypeArray(tempArray);
    } else {
      let defaultArray = ["All"];
      setTypeArray(defaultArray);
    }
  };

  // For multiple cod selection
  const multiSelectCod = (value) => {
    if (value !== "All") {
      let tempArray = [...codArray];

      if (!codArray.includes(value)) {
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

      setCodArray(tempArray);
    } else {
      let defaultArray = ["All"];
      setCodArray(defaultArray);
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

  const removeMultipleFilters = (e, value, type) => {
    e.preventDefault();

    let tempArray = [];

    switch (type) {
      case "area":
        tempArray = [...areaArray];
        let indexArea = tempArray.indexOf(value);
        if (indexArea > -1) {
          tempArray.splice(indexArea, 1);
        }

        if (tempArray.length === 0) {
          tempArray.push("All");
        }

        setAreaArray(tempArray);
        break;
      case "type":
        tempArray = [...typeArray];
        let indexType = tempArray.indexOf(value);
        if (indexType > -1) {
          tempArray.splice(indexType, 1);
        }

        if (tempArray.length === 0) {
          tempArray.push("All");
        }

        setTypeArray(tempArray);
        break;
      case "cod":
        tempArray = [...codArray];
        let indexCod = tempArray.indexOf(value);
        if (indexCod > -1) {
          tempArray.splice(indexCod, 1);
        }

        if (tempArray.length === 0) {
          tempArray.push("All");
        }

        setCodArray(tempArray);
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

  useEffect(() => {
    searchByInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearSearchInputOne]);

  useEffect(() => {
    searchCODs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codClearSearchInputOne]);

  useEffect(() => {
    searchAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areaClearSearchInputOne]);

  useEffect(() => {
    searchSectors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectorClearSearchInputOne]);

  // useEffect(() => {
  //   if (areaArray || typeArray || codArray || sectorArray) {
  //     setTimeout(() => updateCount(), 950);
  //     setTimeout(() => updateCount(), 1250);
  //   }
  // }, [areaArray, typeArray, codArray, sectorArray]);

  useEffect(() => {
    updateCount();
  }, [allCompetencies])

  return (
    <div className="col-12 h-100 p-0">
      <div className="mt-4">
        {/* Row contains serach input and custom filters */}
        <div className="row col-12">
          {/* Search */}
          <div className="row col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 p-0">
            <label className="col-10">
              <input
                type="text"
                className="form-control bigger-input-2 custom-search"
                id="competencySearch"
                aria-describedby="competencySearch"
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
                    document.getElementById("competencySearch").value = "";
                  }}
                  onKeyDown={() => {
                    setclearSearchInputOne(true);
                    document.getElementById("competencySearch").value = "";
                  }}
                >
                  close
                </button>
              )}
            </div>
          </div>

          <div className="col-12 m-0 p-0">
            {/*Filter by COD*/}
            <div className="d-md-inline-flex d-lg-inline-flex">
              <div className="dropdown mt-2" id="codFilter">
                <button
                  className={`btn filter-btn ${
                    codArray[0] === "All"
                      ? "dropdown-toggle"
                      : "dropdown-toggle dropdown-toggle-color"
                  }`}
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-2 filter-name">COD</span>
                  <span
                    className={`mr-1 ${
                      codArray[0] === "All" ? "all-filter" : "selected-filter"
                    }`}
                  >
                    {codArray.length === 1
                      ? codArray[0]
                      : codArray.length === 0
                      ? "All"
                      : "Multiple types"}
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
                        id="codSearch"
                        aria-describedby="codSearch"
                        placeholder="Search"
                        onChange={() => {
                          searchCODs();
                        }}
                        autoComplete="off"
                      />
                    </label>
                    <div className="col-2">
                      {codClearSearchInputTwo && (
                        <button
                          className="material-icons close-btn-3"
                          onClick={() => {
                            setCodClearSearchInputOne(true);
                            document.getElementById("codSearch").value = "";
                          }}
                          onKeyDown={() => {
                            setCodClearSearchInputOne(true);
                            document.getElementById("codSearch").value = "";
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
                        multiSelectCod("All");
                        updateCount();
                      }}
                      onKeyDown={() => {
                        multiSelectCod("All");
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
                              multiSelectCod(value);
                              updateCount();
                            }}
                            onKeyDown={() => {
                              multiSelectCod(value);
                              updateCount();
                            }}
                          >
                            <span className="material-icons mr-1 custom-checkbox-icon">
                              {codArray.includes(value)
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

            {/*Filter by Type*/}
            <div className="d-md-inline-flex d-lg-inline-flex ml-2 ml-sm-0 ml-md-2 ml-lg-2">
              <div className="dropdown p-0 mt-2">
                <button
                  className={`btn filter-btn ${
                    typeArray[0] === "All"
                      ? "dropdown-toggle"
                      : "dropdown-toggle dropdown-toggle-color"
                  }`}
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-2 filter-name">Type</span>
                  <span
                    className={`mr-1 ${
                      typeArray[0] === "All" ? "all-filter" : "selected-filter"
                    }`}
                  >
                    {typeArray.length === 1
                      ? typeArray[0]
                      : typeArray.length === 0
                      ? "All"
                      : "Multiple types"}
                  </span>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <div className="custom-dd-height-1">
                    <button
                      className="dd-btn w-100"
                      onClick={() => {
                        multiSelectType("All");
                        updateCount();
                      }}
                      onKeyDown={() => {
                        multiSelectType("All");
                        updateCount();
                      }}
                    >
                      All
                    </button>
                    <hr />
                    <button
                      className="dd-btn w-100"
                      onClick={() => {
                        multiSelectType("Behavioural");
                        updateCount();
                      }}
                      onKeyDown={() => {
                        multiSelectType("Behavioural");
                        updateCount();
                      }}
                    >
                      <span className="material-icons mr-1 custom-checkbox-icon">
                        {typeArray.includes("Behavioural")
                          ? `check_box`
                          : `check_box_outline_blank`}
                      </span>
                      Behavioural
                    </button>
                    <hr />
                    <button
                      className="dd-btn w-100"
                      onClick={() => {
                        multiSelectType("Domain");
                        updateCount();
                      }}
                      onKeyDown={() => {
                        multiSelectType("Domain");
                        updateCount();
                      }}
                    >
                      <span className="material-icons mr-1 custom-checkbox-icon">
                        {typeArray.includes("Domain")
                          ? `check_box`
                          : `check_box_outline_blank`}
                      </span>
                      Domain
                    </button>
                    <hr />
                    <button
                      className="dd-btn w-100"
                      onClick={() => {
                        multiSelectType("Functional");
                        updateCount();
                      }}
                      onKeyDown={() => {
                        multiSelectType("Functional");
                        updateCount();
                      }}
                    >
                      <span className="material-icons mr-1 custom-checkbox-icon">
                        {typeArray.includes("Functional")
                          ? `check_box`
                          : `check_box_outline_blank`}
                      </span>
                      Functional
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/*Filter by Area*/}
            <div className="d-md-inline-flex d-lg-inline-flex ml-2 ml-sm-0 ml-md-2 ml-lg-2">
              <div className="dropdown p-0 mt-2" id="areaFilter">
                <button
                  className={`btn filter-btn ${
                    areaArray[0] === "All"
                      ? "dropdown-toggle"
                      : "dropdown-toggle dropdown-toggle-color"
                  }`}
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="mr-2 filter-name">Area</span>
                  <span
                    className={`mr-1 ${
                      areaArray[0] === "All" ? "all-filter" : "selected-filter"
                    }`}
                  >
                    {areaArray.length === 1
                      ? areaArray[0]
                      : areaArray.length === 0
                      ? "All"
                      : "Multiple areas"}
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
                        id="areaSearch"
                        aria-describedby="areaSearch"
                        placeholder="Search"
                        onChange={() => {
                          searchAreas();
                        }}
                        autoComplete="off"
                      />
                    </label>
                    <div className="col-2">
                      {areaClearSearchInputTwo && (
                        <button
                          className="material-icons close-btn-3"
                          onClick={() => {
                            setAreaClearSearchInputOne(true);
                            document.getElementById("areaSearch").value = "";
                          }}
                          onKeyDown={() => {
                            setAreaClearSearchInputOne(true);
                            document.getElementById("areaSearch").value = "";
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
                        multiSelectArea("All");
                        updateCount();
                      }}
                      onKeyDown={() => {
                        multiSelectArea("All");
                        updateCount();
                      }}
                    >
                      All
                    </button>
                    <hr />
                    {filteredArrayTwo.map((value, index) => {
                      return (
                        <div className="" key={index}>
                          <button
                            className="dd-btn w-100"
                            key={index}
                            onClick={() => {
                              multiSelectArea(value);
                              updateCount();
                            }}
                            onKeyDown={() => {
                              multiSelectArea(value);
                              updateCount();
                            }}
                          >
                            <span className="material-icons mr-1 custom-checkbox-icon">
                              {areaArray.includes(value)
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

            {/*Filter by Sector*/}
            <div className="d-md-inline-flex d-lg-inline-flex ml-2 ml-sm-0 ml-md-2 ml-lg-2">
              <div className="dropdown p-0 mt-2" id="sectorFilter">
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
                    {filteredArrayThree.map((value, index) => {
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
          <Query
            query={getFilterByType}
            variables={{
              cod: !codArray.includes("All") ? codArray : [],
              competencyType: !typeArray.includes("All") ? typeArray : [],
              competencyArea: !areaArray.includes("All") ? areaArray : [],
              competencySector: !sectorArray.includes("All")
                ? sectorArray
                : [],
            }}
          >
            {({ data, loading, error }) => {
              setAllCompetencies(data)
              if (
                data !== undefined &&
                data.getAllCompetencies &&
                data.getAllCompetencies.length > 0
              ) {
                return (
                  <React.Fragment>
                    {rCount.length === 1 && rCount !== 1 && (
                      <div className="d-flex flex ml-1 justify-element">
                        <p className="item-count">
                          {staticData?.getCompetencyCount?.totalCount + " items"}
                        </p>
                        {(codArray[0] ||
                          typeArray[0] ||
                          areaArray[0] ||
                          sectorArray[0]) &&
                          (codArray[0] !== "All" ||
                            typeArray[0] !== "All" ||
                            areaArray[0] !== "All" ||
                            sectorArray[0] !== "All") && (
                            <button
                              className="clear-filter-btn"
                              onClick={() => {
                                multiSelectArea("All");
                                multiSelectType("All");
                                multiSelectCod("All");
                                multiSelectSector("All");
                                updateCount();
                                setCodClearSearchInputOne(true);
                                document.getElementById("codSearch").value = "";
                                setAreaClearSearchInputOne(true);
                                document.getElementById("areaSearch").value =
                                  "";
                                setSectorClearSearchInputOne(true);
                                document.getElementById("sectorSearch").value =
                                  "";
                              }}
                              onKeyDown={() => {
                                multiSelectArea("All");
                                multiSelectType("All");
                                multiSelectCod("All");
                                multiSelectSector("All");
                                updateCount();
                                setCodClearSearchInputOne(true);
                                document.getElementById("codSearch").value = "";
                                setAreaClearSearchInputOne(true);
                                document.getElementById("areaSearch").value =
                                  "";
                                setSectorClearSearchInputOne(true);
                                document.getElementById("sectorSearch").value =
                                  "";
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
                        {(codArray[0] ||
                          typeArray[0] ||
                          areaArray[0] ||
                          sectorArray[0]) &&
                          (codArray[0] !== "All" ||
                            typeArray[0] !== "All" ||
                            areaArray[0] !== "All" ||
                            sectorArray[0] !== "All") && (
                            <button
                              className="clear-filter-btn"
                              onClick={() => {
                                multiSelectArea("All");
                                multiSelectType("All");
                                multiSelectCod("All");
                                multiSelectSector("All");
                                updateCount();
                                setCodClearSearchInputOne(true);
                                document.getElementById("codSearch").value = "";
                                setAreaClearSearchInputOne(true);
                                document.getElementById("areaSearch").value =
                                  "";
                                setSectorClearSearchInputOne(true);
                                document.getElementById("sectorSearch").value =
                                  "";
                              }}
                              onKeyDown={() => {
                                multiSelectArea("All");
                                multiSelectType("All");
                                multiSelectCod("All");
                                multiSelectSector("All");
                                updateCount();
                                setCodClearSearchInputOne(true);
                                document.getElementById("codSearch").value = "";
                                setAreaClearSearchInputOne(true);
                                document.getElementById("areaSearch").value =
                                  "";
                                setSectorClearSearchInputOne(true);
                                document.getElementById("sectorSearch").value =
                                  "";
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
                        {(codArray[0] ||
                          typeArray[0] ||
                          areaArray[0] ||
                          sectorArray[0]) &&
                          (codArray[0] !== "All" ||
                            typeArray[0] !== "All" ||
                            areaArray[0] !== "All" ||
                            sectorArray[0] !== "All") && (
                            <button
                              className="clear-filter-btn"
                              onClick={() => {
                                multiSelectArea("All");
                                multiSelectType("All");
                                multiSelectCod("All");
                                multiSelectSector("All");
                                updateCount();
                                setCodClearSearchInputOne(true);
                                document.getElementById("codSearch").value = "";
                                setAreaClearSearchInputOne(true);
                                document.getElementById("areaSearch").value =
                                  "";
                                setSectorClearSearchInputOne(true);
                                document.getElementById("sectorSearch").value =
                                  "";
                              }}
                              onKeyDown={() => {
                                multiSelectArea("All");
                                multiSelectType("All");
                                multiSelectCod("All");
                                multiSelectSector("All");
                                updateCount();
                                setCodClearSearchInputOne(true);
                                document.getElementById("codSearch").value = "";
                                setAreaClearSearchInputOne(true);
                                document.getElementById("areaSearch").value =
                                  "";
                                setSectorClearSearchInputOne(true);
                                document.getElementById("sectorSearch").value =
                                  "";
                              }}
                            >
                              Clear filters
                            </button>
                          )}
                      </div>
                    )}

                    {/* Chips for custom filters */}
                    {((areaArray[0] !== "" && areaArray[0] !== "All") ||
                      (typeArray[0] !== "" && typeArray[0] !== "All") ||
                      (codArray[0] !== "" && codArray[0] !== "All") ||
                      (sectorArray[0] !== "" && sectorArray[0] !== "All")) && (
                      <div className="row col-12 mb-2 p-0 m-0 mb-4">
                        {areaArray.map((i, j) => {
                          if (i !== "All") {
                            return (
                              <div className="mr-2 mt-2" key={j}>
                                <span class="badge badge-pill badge-light custom-chip-one ">
                                  {`Area | ${i}`}
                                  <span
                                    className="material-icons pl-2"
                                    role="button"
                                    tabIndex={0}
                                    onClick={(e) =>
                                      removeMultipleFilters(e, i, "area")
                                    }
                                    onKeyDown={(e) => {
                                      removeMultipleFilters(e, i, "area");
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
                        {typeArray.map((m, n) => {
                          if (m !== "All") {
                            return (
                              <div className="mr-2 mt-2" key={n}>
                                <span class="badge badge-pill badge-light custom-chip-one ">
                                  {`Type | ${m}`}
                                  <span
                                    className="material-icons pl-2"
                                    role="button"
                                    tabIndex={0}
                                    onClick={(e) =>
                                      removeMultipleFilters(e, m, "type")
                                    }
                                    onKeyDown={(e) => {
                                      removeMultipleFilters(e, m, "type");
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
                        {codArray.map((k, l) => {
                          if (k !== "All") {
                            return (
                              <div className="mr-2 mt-2" key={l}>
                                <span class="badge badge-pill badge-light custom-chip-one ">
                                  {`COD | ${k}`}
                                  <span
                                    className="material-icons pl-2"
                                    role="button"
                                    tabIndex={0}
                                    onClick={(e) =>
                                      removeMultipleFilters(e, k, "cod")
                                    }
                                    onKeyDown={(e) => {
                                      removeMultipleFilters(e, k, "cod");
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
                      id="competenciesList"
                    >
                      {data.getAllCompetencies.map((value, index) => {
                        return (
                          <Link
                            to={`/competencyDetail/${value.id}`}
                            state={{ id: value.id }}
                            key={index}
                          >
                            <div className="list-card mb-3">
                              <div className="row">
                                <div className="col-xs-4 col-sm-4 col-md-12 col-lg-4 col-xl-3 right-border custom-padding-1">
                                  <label>{value.id}</label>
                                  <h3 className="pt-1">{value.name}</h3>
                                  <h6>
                                    {value.additionalProperties
                                      ? value.additionalProperties
                                          .competencyType
                                      : ""}
                                  </h6>
                                </div>

                                <div className="col-xs-8 col-sm-8 col-md-12 col-lg-8 col-xl-9 custom-padding-2">
                                  <p>{value.description}</p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </React.Fragment>
                );
              } else if (
                data !== undefined &&
                data.getAllCompetencies &&
                data.getAllCompetencies.length === 0
              ) {
                return (
                  <>
                    <div className="d-flex flex ml-1 justify-element">
                      <p className="item-count">0 items</p>
                      {(codArray[0] ||
                        typeArray[0] ||
                        areaArray[0] ||
                        sectorArray[0]) &&
                        (codArray[0] !== "All" ||
                          typeArray[0] !== "All" ||
                          areaArray[0] !== "All" ||
                          sectorArray[0] !== "All") && (
                          <button
                            className="clear-filter-btn"
                            onClick={() => {
                              multiSelectArea("All");
                              multiSelectType("All");
                              multiSelectCod("All");
                              multiSelectSector("All");
                              updateCount();
                              setCodClearSearchInputOne(true);
                              document.getElementById("codSearch").value = "";
                              setAreaClearSearchInputOne(true);
                              document.getElementById("areaSearch").value = "";
                              setSectorClearSearchInputOne(true);
                              document.getElementById("sectorSearch").value =
                                "";
                            }}
                            onKeyDown={() => {
                              multiSelectArea("All");
                              multiSelectType("All");
                              multiSelectCod("All");
                              multiSelectSector("All");
                              updateCount();
                              setCodClearSearchInputOne(true);
                              document.getElementById("codSearch").value = "";
                              setAreaClearSearchInputOne(true);
                              document.getElementById("areaSearch").value = "";
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
                      {((areaArray[0] !== "" && areaArray[0] !== "All") ||
                        (typeArray[0] !== "" && typeArray[0] !== "All") ||
                        (codArray[0] !== "" && codArray[0] !== "All") ||
                        (sectorArray[0] !== "" &&
                          sectorArray[0] !== "All")) && (
                        <div className="row col-12 mb-2 p-0 m-0 mb-4">
                          {areaArray.map((i, j) => {
                            if (i !== "All") {
                              return (
                                <div className="mr-2 mt-2" key={j}>
                                  <span class="badge badge-pill badge-light custom-chip-one ">
                                    {`Area | ${i}`}
                                    <span
                                      className="material-icons pl-2"
                                      role="button"
                                      tabIndex={0}
                                      onClick={(e) =>
                                        removeMultipleFilters(e, i, "area")
                                      }
                                      onKeyDown={(e) =>
                                        removeMultipleFilters(e, i, "area")
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
                          {typeArray.map((m, n) => {
                            if (m !== "All") {
                              return (
                                <div className="mr-2 mt-2" key={n}>
                                  <span class="badge badge-pill badge-light custom-chip-one ">
                                    {`Type | ${m}`}
                                    <span
                                      className="material-icons pl-2"
                                      role="button"
                                      tabIndex={0}
                                      onClick={(e) =>
                                        removeMultipleFilters(e, m, "type")
                                      }
                                      onKeyDown={(e) =>
                                        removeMultipleFilters(e, m, "type")
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
                          {codArray.map((k, l) => {
                            if (k !== "All") {
                              return (
                                <div className="mr-2 mt-2" key={l}>
                                  <span class="badge badge-pill badge-light custom-chip-one ">
                                    {`COD | ${k}`}
                                    <span
                                      className="material-icons pl-2"
                                      role="button"
                                      tabIndex={0}
                                      onClick={(e) =>
                                        removeMultipleFilters(e, k, "cod")
                                      }
                                      onKeyDown={(e) =>
                                        removeMultipleFilters(e, k, "cod")
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
                          {staticData?.getCompetencyCount?.totalCount + " items"}
                        </p>
                        {(codArray[0] ||
                          typeArray[0] ||
                          areaArray[0] ||
                          sectorArray[0]) &&
                          (codArray[0] !== "All" ||
                            typeArray[0] !== "All" ||
                            areaArray[0] !== "All" ||
                            sectorArray[0] !== "All") && (
                            <button
                              className="clear-filter-btn"
                              onClick={() => {
                                multiSelectArea("All");
                                multiSelectType("All");
                                multiSelectCod("All");
                                multiSelectSector("All");
                                updateCount();
                                setCodClearSearchInputOne(true);
                                document.getElementById("codSearch").value = "";
                                setAreaClearSearchInputOne(true);
                                document.getElementById("areaSearch").value =
                                  "";
                                setSectorClearSearchInputOne(true);
                                document.getElementById("sectorSearch").value =
                                  "";
                              }}
                              onKeyDown={() => {
                                multiSelectArea("All");
                                multiSelectType("All");
                                multiSelectCod("All");
                                multiSelectSector("All");
                                updateCount();
                                setCodClearSearchInputOne(true);
                                document.getElementById("codSearch").value = "";
                                setAreaClearSearchInputOne(true);
                                document.getElementById("areaSearch").value =
                                  "";
                                setSectorClearSearchInputOne(true);
                                document.getElementById("sectorSearch").value =
                                  "";
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
                        {(codArray[0] ||
                          typeArray[0] ||
                          areaArray[0] ||
                          sectorArray[0]) &&
                          (codArray[0] !== "All" ||
                            typeArray[0] !== "All" ||
                            areaArray[0] !== "All" ||
                            sectorArray[0] !== "All") && (
                            <button
                              className="clear-filter-btn"
                              onClick={() => {
                                multiSelectArea("All");
                                multiSelectType("All");
                                multiSelectCod("All");
                                multiSelectSector("All");
                                updateCount();
                                setCodClearSearchInputOne(true);
                                document.getElementById("codSearch").value = "";
                                setAreaClearSearchInputOne(true);
                                document.getElementById("areaSearch").value =
                                  "";
                                setSectorClearSearchInputOne(true);
                                document.getElementById("sectorSearch").value =
                                  "";
                              }}
                              onKeyDown={() => {
                                multiSelectArea("All");
                                multiSelectType("All");
                                multiSelectCod("All");
                                multiSelectSector("All");
                                updateCount();
                                setCodClearSearchInputOne(true);
                                document.getElementById("codSearch").value = "";
                                setAreaClearSearchInputOne(true);
                                document.getElementById("areaSearch").value =
                                  "";
                                setSectorClearSearchInputOne(true);
                                document.getElementById("sectorSearch").value =
                                  "";
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
                        {(codArray[0] ||
                          typeArray[0] ||
                          areaArray[0] ||
                          sectorArray[0]) &&
                          (codArray[0] !== "All" ||
                            typeArray[0] !== "All" ||
                            areaArray[0] !== "All" ||
                            sectorArray[0] !== "All") && (
                            <button
                              className="clear-filter-btn"
                              onClick={() => {
                                multiSelectArea("All");
                                multiSelectType("All");
                                multiSelectCod("All");
                                multiSelectSector("All");
                                updateCount();
                                setCodClearSearchInputOne(true);
                                document.getElementById("codSearch").value = "";
                                setAreaClearSearchInputOne(true);
                                document.getElementById("areaSearch").value =
                                  "";
                                setSectorClearSearchInputOne(true);
                                document.getElementById("sectorSearch").value =
                                  "";
                              }}
                              onKeyDown={() => {
                                multiSelectArea("All");
                                multiSelectType("All");
                                multiSelectCod("All");
                                multiSelectSector("All");
                                updateCount();
                                setCodClearSearchInputOne(true);
                                document.getElementById("codSearch").value = "";
                                setAreaClearSearchInputOne(true);
                                document.getElementById("areaSearch").value =
                                  "";
                                setSectorClearSearchInputOne(true);
                                document.getElementById("sectorSearch").value =
                                  "";
                              }}
                            >
                              Clear filters
                            </button>
                          )}
                      </div>
                    )}

                    {/* Chips for custom filters */}
                    {((areaArray[0] !== "" && areaArray[0] !== "All") ||
                      (typeArray[0] !== "" && typeArray[0] !== "All") ||
                      (codArray[0] !== "" && codArray[0] !== "All") ||
                      (sectorArray[0] !== "" && sectorArray[0] !== "All")) && (
                      <div className="row col-12 mb-2 p-0 m-0 mb-4">
                        {areaArray.map((i, j) => {
                          if (i !== "All") {
                            return (
                              <div className="mr-2 mt-2" key={j}>
                                <span class="badge badge-pill badge-light custom-chip-one ">
                                  {`Area | ${i}`}
                                  <span
                                    className="material-icons pl-2"
                                    role="button"
                                    tabIndex={0}
                                    onClick={(e) =>
                                      removeMultipleFilters(e, i, "area")
                                    }
                                    onKeyDown={(e) => {
                                      removeMultipleFilters(e, i, "area");
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
                        {typeArray.map((m, n) => {
                          if (m !== "All") {
                            return (
                              <div className="mr-2 mt-2" key={n}>
                                <span class="badge badge-pill badge-light custom-chip-one ">
                                  {`Type | ${m}`}
                                  <span
                                    className="material-icons pl-2"
                                    role="button"
                                    tabIndex={0}
                                    onClick={(e) =>
                                      removeMultipleFilters(e, m, "type")
                                    }
                                    onKeyDown={(e) => {
                                      removeMultipleFilters(e, m, "type");
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
                        {codArray.map((k, l) => {
                          if (k !== "All") {
                            return (
                              <div className="mr-2 mt-2" key={l}>
                                <span class="badge badge-pill badge-light custom-chip-one ">
                                  {`COD | ${k}`}
                                  <span
                                    className="material-icons pl-2"
                                    role="button"
                                    tabIndex={0}
                                    onClick={(e) =>
                                      removeMultipleFilters(e, k, "cod")
                                    }
                                    onKeyDown={(e) => {
                                      removeMultipleFilters(e, k, "cod");
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
                      id="competenciesList"
                    >
                      {staticData?.getAllCompetencies?.map((value, index) => {
                        return (
                          <Link
                            to={`/competencyDetail/${value.id}`}
                            state={{ id: value.id }}
                            key={index}
                          >
                            <div className="list-card mb-3 limit-scroll">
                              <div className="row">
                                <div className="col-xs-4 col-sm-4 col-md-12 col-lg-4 col-xl-3 right-border custom-padding-1">
                                  <label>{value.id}</label>
                                  <h3 className="pt-1">{value.name}</h3>
                                  <h6>
                                    {value.additionalProperties
                                      ? value.additionalProperties
                                          .competencyType
                                      : ""}
                                  </h6>
                                  <h6>
                                    {value.additionalProperties
                                      ? value.additionalProperties
                                          .competencySector
                                      : ""}
                                  </h6>
                                </div>

                                <div className="col-xs-8 col-sm-8 col-md-12 col-lg-8 col-xl-9 custom-padding-2">
                                  <p>{value.description}</p>
                                </div>
                              </div>
                            </div>
                          </Link>
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
  );
};

export default CompetencyView;
