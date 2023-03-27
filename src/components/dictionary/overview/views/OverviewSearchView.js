import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";

const OverviewSearchView = ({ location }) => {
  const [rCount, setRCount] = useState(" ");
  const [clearSearchInputOne, setclearSearchInputOne] = useState();
  const [clearSearchInputTwo, setclearSearchInputTwo] = useState();
  const [closeInput, setCloseInput] = useState(true);
  const [inputData, setInputData] = useState();

  const data = useStaticQuery(graphql`
    query {
      allJson {
        edges {
          node {
            activities {
              description
              id
              name
              type
            }
            competencies {
              additionalProperties {
                cod
                competencySector
                competencyArea
                competencyType
              }
              children {
                id
                name
                description
                source
                level
                type
              }
              description
              id
              name
              source
              status
              type
            }
            positions {
              id
              description
              name
              type
              additionalProperties {
                Department
              }
            }
            roles {
              description
              id
              name
              type
            }
          }
        }
      }
    }
  `);

  function searchByInput() {
    var input, filter, ul, li, sl, a, i, txtValue, descValue;

    input = document.getElementById("itemSearch");

    if (input && input.value.length) {
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

      ul = document.getElementById("itemList");
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
        document.querySelectorAll("#itemList .list-card")
      );

      setRCount(
        divs.reduce(function (a, b) {
          return a + (b.style.display !== "none" ? 1 : 0);
        }, 0)
      );
    } else {
      if (!clearSearchInputOne) {
        if (input && input.value.length === 1) {
          setclearSearchInputTwo(false);
        } else {
          setclearSearchInputTwo(true);
        }
      } else {
        setclearSearchInputOne(false);
        setclearSearchInputTwo(false);
      }

      if (input && input.value.length === 0) {
        setclearSearchInputOne(false);
        setclearSearchInputTwo(false);
      }

      if (!clearSearchInputOne) {
        filter = input && input.value.toUpperCase();
      } else {
        filter = "";
      }
      ul = document.getElementById("itemList");
      li = ul.getElementsByTagName("div");
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("div")[0];
        sl = li[i].getElementsByTagName("div")[2];

        if (a !== undefined) {
          txtValue = a.textContent || a.innerText;
        }

        if (sl !== undefined) {
          descValue = sl.textContent || sl.innerText;
        }

        li[i].style.display = "none";
        var divsOne = Array.prototype.slice.call(
          document.querySelectorAll("#itemList .list-card")
        );

        setRCount(
          divsOne.reduce(function (a, b) {
            return a + (b.style.display !== "none" ? 1 : 0);
          }, 0)
        );
      }
    }
  }

  useEffect(() => {
    searchByInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearSearchInputOne]);

  useEffect(() => {
    searchByInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeInput]);

  useEffect(() => {
    searchByInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeInput]);

  useEffect(() => {
    setInputData(inputData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputData]);

  return (
    <div className="col-12 h-100">
      <div className="row p-0 mb-3">
        <Link to="/overview/">
          <p className="breadcrumb underline-bc">Overview</p>
        </Link>
        <p className="breadcrumb pl-0 pr-0">
          <span className="material-icons navigate-icon">navigate_next</span>
        </p>
        <p className="breadcrumb">Search results</p>
      </div>
      <div className="row p-0 mb-4">
        <div className="row col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 p-0 ml-0">
          <label className="col-10">
            {closeInput && (
              <input
                type="text"
                className="form-control bigger-input custom-search"
                id="itemSearch"
                value={inputData || (location.state && location.state.value)}
                aria-describedby="itemSearch"
                placeholder="Search"
                autoComplete="off"
                onChange={(e) => {
                  setInputData(e.target.value);
                  searchByInput();
                  if (e.target.value.length === 0) {
                    setCloseInput(false);
                  }
                }}
              />
            )}
            {!closeInput && (
              <input
                type="text"
                className="form-control bigger-input custom-search"
                id="itemSearch"
                aria-describedby="itemSearch"
                placeholder="Search"
                onChange={() => searchByInput()}
                autoComplete="off"
              />
            )}
          </label>
          <div className="col-2">
            {clearSearchInputTwo && (
              <button
                className="material-icons close-btn-2"
                onClick={() => {
                  setclearSearchInputOne(true);
                  setCloseInput(false);
                  document.getElementById("itemSearch").value = "";
                }}
                onKeyDown={() => {
                  setclearSearchInputOne(true);
                  setCloseInput(false);
                  document.getElementById("itemSearch").value = "";
                }}
              >
                close
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 limit-scroll" id="itemList">
        {rCount.length === 1 && rCount !== 1 && (
          <label className="item-count ml-0 pb-2 main-search-results">
            {0 + " results matching your query"}
          </label>
        )}

        {rCount.length !== 1 && rCount !== 1 && (
          <label className="item-count ml-0 pb-2 main-search-results">
            {rCount + " results matching your query"}
          </label>
        )}

        {rCount.length !== 1 && rCount === 1 && (
          <label className="item-count ml-0 pb-2 main-search-results">
            {rCount + " result matching your query"}
          </label>
        )}
        {data.allJson.edges[0].node.activities &&
          data.allJson.edges[0].node.activities.map((value, index) => {
            return (
              <div className="list-card mb-3" key={index}>
                <div className="row">
                  <div className="col-xs-4 col-sm-4 col-md-12 col-lg-4 col-xl-3 pt-3 pl-5 pr-4 right-border">
                    <label className="pt-3">{value.id}</label>
                    <h3 className="pt-1">{value.name}</h3>
                  </div>

                  <div className="col-xs-8 col-sm-8 col-md-12 col-lg-8 col-xl-9 pt-4 pl-5 pr-5">
                    <p>{value.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        {data.allJson.edges[0].node.competencies &&
          data.allJson.edges[0].node.competencies.map((value, index) => {
            return (
              <Link
                to={`/competencyDetail/${value.id}`}
                state={{ id: value.id }}
                key={index}
              >
                <div className="list-card mb-3 cursor-pointer">
                  <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-12 col-lg-4 col-xl-3 pt-3 pl-5 pr-4 right-border">
                      <label className="pt-3">{value.id}</label>
                      <h3 className="pt-1">{value.name}</h3>
                    </div>

                    <div className="col-xs-8 col-sm-8 col-md-12 col-lg-8 col-xl-9 pt-4 pl-5 pr-5">
                      <p>{value.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}

        {data.allJson.edges[0].node.roles &&
          data.allJson.edges[0].node.roles.map((value, index) => {
            return (
              <div className="list-card mb-3" key={index}>
                <div className="row">
                  <div className="col-xs-4 col-sm-4 col-md-12 col-lg-4 col-xl-3 pt-3 pl-5 pr-4 right-border">
                    <label className="pt-3">{value.id}</label>
                    <h3 className="pt-1">{value.name}</h3>
                  </div>

                  <div className="col-xs-8 col-sm-8 col-md-12 col-lg-8 col-xl-9 pt-4 pl-5 pr-5">
                    <p>{value.description}</p>
                  </div>
                </div>
              </div>
            );
          })}

        {data.allJson.edges[0].node.positions &&
          data.allJson.edges[0].node.positions.map((value, index) => {
            return (
              <div className="list-card mb-3" key={index}>
                <div className="row">
                  <div className="col-xs-4 col-sm-4 col-md-12 col-lg-4 col-xl-3 pt-3 pl-5 pr-4 right-border">
                    <label className="pt-3">{value.id}</label>
                    <h3 className="pt-1">{value.name}</h3>
                  </div>

                  <div className="col-xs-8 col-sm-8 col-md-12 col-lg-8 col-xl-9 pt-4 pl-5 pr-5">
                    <p>{value.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OverviewSearchView;
