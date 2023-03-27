import React from "react";
import { Link } from "gatsby";
import Notify from "../../../../helpers/notify";
import { useStaticQuery, graphql } from "gatsby";
import { useEffect, useState } from "react";

const CompetencyDetailView = ({ location, data }) => {
  const [associatedPosL1, setAssociatedPosL1] = useState([]);
  const [associatedPosL2, setAssociatedPosL2] = useState([]);

  function copyURL() {
    var copyText = document.getElementById("copyButton").value;

    var txt = document.createElement("textarea");
    txt.value = copyText;
    txt.setAttribute("readonly", "");
    txt.style = { position: "absolute", left: "-9999px" };

    document.body.appendChild(txt);
    txt.select();

    document.execCommand("copy");

    document.body.removeChild(txt);
  }

  // Query for build time
  const staticData = useStaticQuery(graphql`
    query {
      getAllPositions: allJson(
        filter: {
          positions: {
            elemMatch: { children: { elemMatch: { type: { eq: "ROLE" } } } }
          }
          roles: {
            elemMatch: {
              children: { elemMatch: { type: { eq: "COMPETENCY" } } }
            }
          }
        }
      ) {
        edges {
          node {
            positions {
              id
              name
              children {
                name
                id
                type
              }
            }
            roles {
              id
              name
              children {
                name
                id
                type
              }
            }
          }
        }
      }
    }
  `);

  useEffect(() => {
    let currentId = data?.allSitePage?.nodes[0]?.context?.data?.id;

    let posLevel = staticData?.getAllPositions?.edges[0]?.node?.positions?.filter(
      (item) => {
        if (item.children.length > 0) {
          return item.children;
        }
        return null;
      }
    );

    let roleLevel = [];

    if (
      staticData.getAllPositions &&
      staticData.getAllPositions.edges[0] &&
      staticData.getAllPositions.edges[0].node
    ) {
      staticData.getAllPositions.edges[0].node.roles.filter((item) => {
        if (item.children.length > 0) {
          item.children.map((i, j) => {
            if (i.type === "COMPETENCY") {
              return roleLevel.push({
                id: item.id,
                name: item.name,
                children: item.children,
              });
            }
            return null;
          });
        }
        return null;
      });

      let tempArray = [];

      posLevel.map((i, j) => {
        i.children.map((k, l) => {
          roleLevel.map((m, n) => {
            if (m.id === k.id) {
              m.children.map((y, t) => {
                if (y.type === "COMPETENCY") {
                  if (y.id === currentId) {
                    tempArray.push(i);
                    setAssociatedPosL1(tempArray);
                  }
                }
                return null;
              });
            }
            return null;
          });
          return null;
        });
        return null;
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (associatedPosL1.length > 0) {
      let filteredArray = [];

      filteredArray = associatedPosL1.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.id === value.id)
      );
      setAssociatedPosL2(filteredArray);
    }
  }, [associatedPosL1]);

  return (
    <div className="col-12 h-100">
      <div className="">
        {data.allSitePage.nodes[0].context.data ? (
          <div id="competency-detail">
            <div className="row">
              <Link to="/competencies/">
                <p className="breadcrumb underline-bc">Competencies</p>
              </Link>
              <p className="breadcrumb pl-0 pr-0">
                <span className="material-icons navigate-icon">
                  navigate_next
                </span>
              </p>
              <p className="breadcrumb">
                {data.allSitePage.nodes[0].context.data.name}
              </p>
            </div>

            <div className="competency-detail-scroll-limit">
              <div className="p-0">
                <h2 className="view-heading">
                  {data.allSitePage.nodes[0].context.data.name}
                </h2>
                <div className="flex d-flex">
                  <label className="ref-number pb-2">
                    {"#" + data.allSitePage.nodes[0].context.data.id}
                    <button
                      className="material-icons ml-2 copy-icon"
                      id="copyButton"
                      value={location.href}
                      onClick={() => {
                        copyURL();
                        Notify.dark(
                          "Public link to this competency has been copied to clipboard"
                        );
                      }}
                      onKeyDown={() => {
                        copyURL();
                        Notify.dark(
                          "Public link to this competency has been copied to clipboard"
                        );
                      }}
                    >
                      content_copy
                    </button>
                  </label>
                </div>
                <p className="paragraph-one">
                  {data.allSitePage.nodes[0].context.data.description}
                </p>
              </div>

              <div className="">
                <h3 className="paragraph-heading">Type</h3>
                {data.allSitePage.nodes[0].context.data.additionalProperties &&
                  data.allSitePage.nodes[0].context.data.additionalProperties
                    .competencyType && (
                    <p className="white-detail">
                      {
                        data.allSitePage.nodes[0].context.data
                          .additionalProperties.competencyType
                      }
                    </p>
                  )}
              </div>

              {data.allSitePage.nodes[0].context.data.additionalProperties &&
                data.allSitePage.nodes[0].context.data.additionalProperties
                  .cod && (
                  <div className="">
                    <h3 className="paragraph-heading">COD</h3>
                    <p className="white-detail">
                      {
                        data.allSitePage.nodes[0].context.data
                          .additionalProperties.cod
                      }
                    </p>
                  </div>
                )}

              {data.allSitePage.nodes[0].context.data.additionalProperties &&
                data.allSitePage.nodes[0].context.data.additionalProperties
                  .competencyArea && (
                  <div className="">
                    <h3 className="paragraph-heading">Competency Area</h3>
                    <p className="white-detail">
                      {
                        data.allSitePage.nodes[0].context.data
                          .additionalProperties.competencyArea
                      }
                    </p>
                  </div>
                )}

              {data.allSitePage.nodes[0].context.data.additionalProperties &&
                data.allSitePage.nodes[0].context.data.additionalProperties
                  .competencySector &&
                (data.allSitePage.nodes[0].context.data.additionalProperties
                  .competencySector !== "" ||
                  data.allSitePage.nodes[0].context.data.additionalProperties
                    .competencySector !== null) && (
                  <div className="">
                    <h3 className="paragraph-heading">Sector</h3>
                    <p className="white-detail">
                      {
                        data.allSitePage.nodes[0].context.data
                          .additionalProperties.competencySector
                      }
                    </p>
                  </div>
                )}

              {associatedPosL2.length > 0 && (
                <div className="mb-4">
                  <h3 className="paragraph-heading">Associated Positions</h3>
                  {associatedPosL2.map((i, j) => {
                    return (
                      <p className="white-detail mb-2" key={j}>
                        {i.name}
                      </p>
                    );
                  })}
                </div>
              )}

              {data.allSitePage.nodes[0].context.data.children &&
                data.allSitePage.nodes[0].context.data.children.length > 0 && (
                  <div className="">
                    <h3 className="paragraph-heading">Levels</h3>
                    {data.allSitePage.nodes[0].context.data.children
                      .sort(
                        (a, b) => a.level.split(" ")[1] - b.level.split(" ")[1]
                      )
                      .map((value, index) => {
                        return (
                          <div className="list-card mb-3 no-shadow" key={index}>
                            <div className="row">
                              <div className="col-xs-4 col-sm-4 col-md-12 col-lg-4 col-xl-3 right-border custom-padding-1">
                                <label className="pt-3">{value.level}</label>
                                <h3 className="pt-1 mb-2">{value.name}</h3>
                                <label className="third-level-1">
                                  {value.id}
                                </label>
                              </div>
                              <div className="col-xs-8 col-sm-8 col-md-12 col-lg-8 col-xl-9 custom-padding-2">
                                {value.description &&
                                  value.description.split("\n").map((k, l) => {
                                    return (
                                      <p
                                        className="competency-level-list-1"
                                        key={l}
                                      >
                                        {k}
                                      </p>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
            </div>
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};

export default CompetencyDetailView;
