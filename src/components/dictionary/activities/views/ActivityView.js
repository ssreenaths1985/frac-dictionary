import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";

const ActivityView = () => {
  const [rCount, setRCount] = useState(" ");
  const [clearSearchInputOne, setclearSearchInputOne] = useState();
  const [clearSearchInputTwo, setclearSearchInputTwo] = useState();

  console.log("Extracting queries from ActivitiesView!");

  const data = useStaticQuery(graphql`
    query {
      getActivityCount: allJson(
        filter: { activities: { elemMatch: { type: { eq: "ACTIVITY" } } } }
      ) {
        totalCount
      }
      getAllActivities: allJson(filter: {}) {
        edges {
          node {
            activities {
              id
              name
              description
            }
          }
        }
      }
    }
  `);

  function searchByInput() {
    var input, filter, ul, li, sl, a, i, txtValue, descValue;

    input = document.getElementById("activitySearch");

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

    ul = document.getElementById("activitiesList");
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
      document.querySelectorAll("#activitiesList .list-card")
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

  return (
    <div className="col-12 h-100 p-0">
      <div className="mt-4">
        <div className="row col-12">
          <div className="row col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 p-0">
            <label className="col-10">
              <input
                type="text"
                className="form-control bigger-input-2 custom-search"
                id="activitySearch"
                aria-describedby="activitySearch"
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
                    document.getElementById("activitySearch").value = "";
                  }}
                  onKeyDown={() => {
                    setclearSearchInputOne(true);
                    document.getElementById("activitySearch").value = "";
                  }}
                >
                  close
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-3">
          {rCount.length === 1 && rCount !== 1 && (
            <label className="item-count pl-1">
              {data.getActivityCount.totalCount + " items"}
            </label>
          )}

          {rCount.length !== 1 && rCount !== 1 && (
            <label className="item-count pl-1">{rCount + " items"}</label>
          )}

          {rCount.length !== 1 && rCount === 1 && (
            <label className="item-count pl-1">{rCount + " item"}</label>
          )}
          <div className="mt-3 mb-3 limit-scroll-four" id="activitiesList">
            {data.getAllActivities.edges[0].node.activities && data.getAllActivities.edges[0].node.activities.map(
              (value, index) => {
                return (
                  <div className="list-card mb-3" key={index}>
                    <div className="row">
                      <div className="col-xs-4 col-sm-4 col-md-12 col-lg-4 col-xl-3 right-border custom-padding-1">
                        <label>{value.id}</label>
                        <h3 className="pt-1">{value.name}</h3>
                      </div>

                      <div className="col-xs-8 col-sm-8 col-md-12 col-lg-8 col-xl-9 custom-padding-2">
                        <p>{value.description}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityView;
