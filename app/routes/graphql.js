import { ApolloServer } from "apollo-server-express";
import fetch from "node-fetch";
import "../config";

/*Custom GraphQl type defs and schema*/
const typeDefs = `
type allData {
    knowledgeResources: [KnowledgeResources ]
    competencies: [Competencies ]
    activities: [Activities ]
    roles: [Roles ]
    positions: [Positions ]
    counts: [Counts ]
}

type KrAdditionalProperties { files: [String ] URL: [String ] }

type PositionAddtionalProperties { Department: String sector: String }

type CompetenciesAdditionalProps { competencyType: String
  competencyArea: String
  cod: String
  competencySector: String
  childNodes: [ChildNodes ] }

type ChildNodes { type: String
  id: String
  name: String
  description: String
  source: String
  level: String }

type posChildNodes { type: String
  id: String
  name: String
  description: String
  source: String
  status: String }

type KnowledgeResources { type: String
  id: String
  name: String
  description: String
  source: String
  additionalProperties: KrAdditionalProperties }

type Competencies { type: String
  id: String
  name: String
  description: String
  status: String
  source: String
  additionalProperties: CompetenciesAdditionalProps }

type Activities { type: String
  id: String
  name: String
  description: String
  source: String }

type Roles  { type: String
  id: String
  name: String
  description: String
  source: String
  children: [posChildNodes] }

type Positions  { type: String
  id: String
  name: String
  description: String
  source: String
  additionalProperties: PositionAddtionalProperties
  children: [posChildNodes] }

type Query {
   getPositions(name: String, id: String, department: String, sector: String): [Positions]
   getRoles(name: String, id: String): [Roles]
   getActivities(name: String, id: String): [Activities]
   getAllCompetencies(name: String, id: String, status: String, competencyType: [String], cod: [String], competencyArea: [String], competencySector: [String]): [Competencies]
   getAllPositions(name: String, id: String, department: [String], sector: [String]): [Positions]
   allData: [allData]
}

type Counts { key: String value: Int }

type Source { knowledgeResources: [KnowledgeResources ]
  competencies: [Competencies ]
  activities: [Activities ]
  roles: [Roles ]
  positions: [Positions ]
  counts: [Counts ] }

type Hits { _index: String
  _type: String
  _id: String
  _score: Int
  _source: Source }

type Shards { total: Int successful: Int skipped: Int failed: Int }

type AutogeneratedMainType { took: Int
  timed_out: Boolean
  hits: Hits
  _shards: Shards }
`;

/*Custom resolvers*/
const resolvers = {
  /*For filtering competencies*/
  Query: {
    getAllCompetencies: async (parent, args, context, info) =>
      fetch(global.env.APP_GATSBY_GRAPHQL, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((json) => {
          var filterOutput = json.hits.hits[0]._source.competencies;
          let argCod = args.cod;
          let argType = args.competencyType;
          let argArea = args.competencyArea;
          let argSector = args.competencySector;

          // console.log("ARGS");
          // console.log(args);

          // console.log("COD: ", argCod.length);
          // console.log("Type: ", argType.length);
          // console.log("Area: ", argArea.length);
          // console.log("Sector: ", argSector.length);

          if (args.id) {
            filterOutput = filterOutput.filter((data) => {
              if (data.id !== undefined) {
                if (data.id === args.id) {
                  return data;
                }
              }
            });
            return filterOutput;
          }

          // Matrix 1
          else if (
            argCod.length > 0 &&
            argArea.length === 0 &&
            argSector.length === 0 &&
            argType.length === 0
          ) {
            // console.log("Only COD");
            let resCod = [];
            filterOutput = filterOutput.filter((data) => {
              args.cod.map((i, j) => {
                if (
                  data.additionalProperties !== undefined &&
                  data.additionalProperties.cod === i
                ) {
                  return resCod.push(data);
                }
              });
            });
            filterOutput = resCod;
            return filterOutput;
          } else if (
            argCod.length === 0 &&
            argArea.length > 0 &&
            argSector.length === 0 &&
            argType.length === 0
          ) {
            // console.log("Only Area");
            let resArea = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencyArea.map((i, j) => {
                if (
                  data.additionalProperties !== undefined &&
                  data.additionalProperties.competencyArea === i
                ) {
                  return resArea.push(data);
                }
              });
            });
            filterOutput = resArea;
            return filterOutput;
          } else if (
            argCod.length === 0 &&
            argArea.length === 0 &&
            argSector.length > 0 &&
            argType.length === 0
          ) {
            // console.log("Only Sector");
            let resSector = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencySector.map((i, j) => {
                if (
                  data.additionalProperties !== undefined &&
                  data.additionalProperties.competencySector === i
                ) {
                  return resSector.push(data);
                }
              });
            });
            filterOutput = resSector;
            return filterOutput;
          } else if (
            argCod.length === 0 &&
            argArea.length === 0 &&
            argSector.length === 0 &&
            argType.length > 0
          ) {
            // console.log("Only Type");
            let resType = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencyType.map((i, j) => {
                if (
                  data.additionalProperties !== undefined &&
                  data.additionalProperties.competencyType === i
                ) {
                  return resType.push(data);
                }
              });
            });
            filterOutput = resType;
            return filterOutput;
          }

          // Matrix 2
          else if (
            argCod.length > 0 &&
            argArea.length > 0 &&
            argSector.length > 0 &&
            argType.length > 0
          ) {
            // console.log("All filters");
            let resAllFilters = [];
            filterOutput = filterOutput.filter((data) => {
              args.cod.map((i, j) => {
                args.competencyArea.map((m, n) => {
                  args.competencyType.map((k, l) => {
                    args.competencySector.map((f, g) => {
                      if (
                        data.additionalProperties !== undefined &&
                        data.additionalProperties.cod === i &&
                        data.additionalProperties.competencyArea === m &&
                        data.additionalProperties.competencyType === k &&
                        data.additionalProperties.competencySector === f
                      ) {
                        return resAllFilters.push(data);
                      }
                    });
                  });
                });
              });
            });
            filterOutput = resAllFilters;
            return filterOutput;
          }

          // Matrix 3
          else if (
            argCod.length > 0 &&
            argType.length > 0 &&
            argArea.length === 0 &&
            argSector.length === 0
          ) {
            // console.log("argCod, argType");
            let resCodType = [];
            filterOutput = filterOutput.filter((data) => {
              args.cod.map((i, j) => {
                args.competencyType.map((k, l) => {
                  if (
                    data.additionalProperties !== undefined &&
                    data.additionalProperties.cod === i &&
                    data.additionalProperties.competencyType === k
                  ) {
                    return resCodType.push(data);
                  }
                });
              });
            });
            filterOutput = resCodType;
            return filterOutput;
          } else if (
            argCod.length > 0 &&
            argArea.length > 0 &&
            argType.length === 0 &&
            argSector.length === 0
          ) {
            // console.log("argCod, argArea");
            let resCodArea = [];
            filterOutput = filterOutput.filter((data) => {
              args.cod.map((i, j) => {
                args.competencyArea.map((k, l) => {
                  if (
                    data.additionalProperties !== undefined &&
                    data.additionalProperties.cod === i &&
                    data.additionalProperties.competencyArea === k
                  ) {
                    return resCodArea.push(data);
                  }
                });
              });
            });
            filterOutput = resCodArea;
            return filterOutput;
          } else if (
            argCod.length > 0 &&
            argSector.length > 0 &&
            argArea.length === 0 &&
            argType.length === 0
          ) {
            // console.log("argCod, argSector");
            let resCodSector = [];
            filterOutput = filterOutput.filter((data) => {
              args.cod.map((i, j) => {
                args.competencySector.map((k, l) => {
                  if (
                    data.additionalProperties !== undefined &&
                    data.additionalProperties.cod === i &&
                    data.additionalProperties.competencySector === k
                  ) {
                    return resCodSector.push(data);
                  }
                });
              });
            });
            filterOutput = resCodSector;
            return filterOutput;
          } else if (
            argType.length > 0 &&
            argCod.length > 0 &&
            argArea.length === 0 &&
            argSector.length === 0
          ) {
            // console.log("argType, argCod");
            let resTypeSector = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencyType.map((i, j) => {
                args.cod.map((k, l) => {
                  if (
                    data.additionalProperties !== undefined &&
                    data.additionalProperties.cod === k &&
                    data.additionalProperties.competencyType === i
                  ) {
                    return resTypeSector.push(data);
                  }
                });
              });
            });
            filterOutput = resTypeSector;
            return filterOutput;
          } else if (
            argType.length > 0 &&
            argArea.length > 0 &&
            argCod.length === 0 &&
            argSector.length === 0
          ) {
            // console.log("argType, argArea");
            let resTypeArea = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencyType.map((i, j) => {
                args.competencyArea.map((k, l) => {
                  if (
                    data.additionalProperties !== undefined &&
                    data.additionalProperties.competencyType === i &&
                    data.additionalProperties.competencyArea === k
                  ) {
                    return resTypeArea.push(data);
                  }
                });
              });
            });
            filterOutput = resTypeArea;
            return filterOutput;
          } else if (
            argType.length > 0 &&
            argSector.length > 0 &&
            argArea.length === 0 &&
            argSector.length === 0
          ) {
            // console.log("argType, argSector");
            let resTypeSector = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencyType.map((i, j) => {
                args.competencySector.map((k, l) => {
                  if (
                    data.additionalProperties !== undefined &&
                    data.additionalProperties.competencyType === i &&
                    data.additionalProperties.competencySector === k
                  ) {
                    return resTypeSector.push(data);
                  }
                });
              });
            });
            filterOutput = resTypeSector;
            return filterOutput;
          } else if (
            argArea.length > 0 &&
            argCod.length > 0 &&
            argSector.length === 0 &&
            argType.length === 0
          ) {
            // console.log("argArea, argCod");
            let resAreaCod = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencyArea.map((i, j) => {
                args.cod.map((k, l) => {
                  if (
                    data.additionalProperties !== undefined &&
                    data.additionalProperties.competencyArea === i &&
                    data.additionalProperties.cod === k
                  ) {
                    return resAreaCod.push(data);
                  }
                });
              });
            });
            filterOutput = resAreaCod;
            return filterOutput;
          } else if (
            argArea.length > 0 &&
            argType.length > 0 &&
            argCod.length === 0 &&
            argSector.length === 0
          ) {
            // console.log("argArea, argType");
            let resAreaType = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencyArea.map((i, j) => {
                args.competencyType.map((k, l) => {
                  if (
                    data.additionalProperties !== undefined &&
                    data.additionalProperties.competencyArea === i &&
                    data.additionalProperties.competencyType === k
                  ) {
                    return resAreaType.push(data);
                  }
                });
              });
            });
            filterOutput = resAreaType;
            return filterOutput;
          } else if (
            argArea.length > 0 &&
            argSector.length > 0 &&
            argCod.length === 0 &&
            argType.length === 0
          ) {
            // console.log("argArea, argSector");
            let resAreaSector = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencyArea.map((i, j) => {
                args.competencySector.map((k, l) => {
                  if (
                    data.additionalProperties !== undefined &&
                    data.additionalProperties.competencyArea === i &&
                    data.additionalProperties.competencySector === k
                  ) {
                    return resAreaSector.push(data);
                  }
                });
              });
            });
            filterOutput = resAreaSector;
            return filterOutput;
          } else if (
            argSector.length > 0 &&
            argCod.length > 0 &&
            argArea.length === 0 &&
            argType.length === 0
          ) {
            // console.log("argSector, argCod");
            let resSectorCod = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencySector.map((i, j) => {
                args.cod.map((k, l) => {
                  if (
                    data.additionalProperties !== undefined &&
                    data.additionalProperties.competencySector === i &&
                    data.additionalProperties.cod === k
                  ) {
                    return resSectorCod.push(data);
                  }
                });
              });
            });
            filterOutput = resSectorCod;
            return filterOutput;
          } else if (
            argSector.length > 0 &&
            argType.length > 0 &&
            argArea.length === 0 &&
            argCod.length === 0
          ) {
            // console.log("argSector, argType");
            let resSectorType = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencySector.map((i, j) => {
                args.competencyType.map((k, l) => {
                  if (
                    data.additionalProperties !== undefined &&
                    data.additionalProperties.competencySector === i &&
                    data.additionalProperties.competencyType === k
                  ) {
                    return resSectorType.push(data);
                  }
                });
              });
            });
            filterOutput = resSectorType;
            return filterOutput;
          } else if (
            argSector.length > 0 &&
            argArea.length > 0 &&
            argCod.length === 0 &&
            argType.length === 0
          ) {
            // console.log("argSector, argArea");
            let resSectorArea = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencySector.map((i, j) => {
                args.competencyArea.map((k, l) => {
                  if (
                    data.additionalProperties !== undefined &&
                    data.additionalProperties.competencySector === i &&
                    data.additionalProperties.competencyArea === k
                  ) {
                    return resSectorArea.push(data);
                  }
                });
              });
            });
            filterOutput = resSectorArea;
            return filterOutput;
          }

          // Matrix 4
          else if (
            argCod.length > 0 &&
            argType.length > 0 &&
            argArea.length > 0 &&
            argSector.length === 0
          ) {
            // console.log("argCod, argType, argArea");
            let resCodTypeArea = [];
            filterOutput = filterOutput.filter((data) => {
              args.cod.map((i, j) => {
                args.competencyType.map((k, l) => {
                  args.competencyArea.map((m, n) => {
                    if (
                      data.additionalProperties !== undefined &&
                      data.additionalProperties.cod === i &&
                      data.additionalProperties.competencyType === k &&
                      data.additionalProperties.competencyArea === m
                    ) {
                      return resCodTypeArea.push(data);
                    }
                  });
                });
              });
            });
            filterOutput = resCodTypeArea;
            return filterOutput;
          } else if (
            argCod.length > 0 &&
            argType.length > 0 &&
            argSector.length > 0 &&
            argArea.length === 0
          ) {
            // console.log("argCod, argType, argSector");
            let resCodTypeSector = [];
            filterOutput = filterOutput.filter((data) => {
              args.cod.map((i, j) => {
                args.competencyType.map((k, l) => {
                  args.competencySector.map((m, n) => {
                    if (
                      data.additionalProperties !== undefined &&
                      data.additionalProperties.cod === i &&
                      data.additionalProperties.competencyType === k &&
                      data.additionalProperties.competencySector === m
                    ) {
                      return resCodTypeSector.push(data);
                    }
                  });
                });
              });
            });
            filterOutput = resCodTypeSector;
            return filterOutput;
          } else if (
            argType.length > 0 &&
            argCod.length > 0 &&
            argArea.length > 0 &&
            argSector.length === 0
          ) {
            // console.log("argType, argCod, argArea");
            let resTypeCodArea = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencyType.map((i, j) => {
                args.cod.map((k, l) => {
                  args.competencyArea.map((m, n) => {
                    if (
                      data.additionalProperties !== undefined &&
                      data.additionalProperties.competencyType === i &&
                      data.additionalProperties.cod === k &&
                      data.additionalProperties.competencyArea === m
                    ) {
                      return resTypeCodArea.push(data);
                    }
                  });
                });
              });
            });
            filterOutput = resTypeCodArea;
            return filterOutput;
          } else if (
            argType.length > 0 &&
            argCod.length > 0 &&
            argSector.length > 0 &&
            argArea.length === 0
          ) {
            // console.log("argType, argCod, argSector");
            let resTypeCodSector = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencyType.map((i, j) => {
                args.cod.map((k, l) => {
                  args.competencySector.map((m, n) => {
                    if (
                      data.additionalProperties !== undefined &&
                      data.additionalProperties.competencyType === i &&
                      data.additionalProperties.cod === k &&
                      data.additionalProperties.competencySector === m
                    ) {
                      return resTypeCodSector.push(data);
                    }
                  });
                });
              });
            });
            filterOutput = resTypeCodSector;
            return filterOutput;
          } else if (
            argSector.length > 0 &&
            argCod.length > 0 &&
            argType.length > 0 &&
            argArea.length === 0
          ) {
            // console.log("argSector, argCod, argType");
            let resSectorCodType = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencySector.map((i, j) => {
                args.cod.map((k, l) => {
                  args.competencyType.map((m, n) => {
                    if (
                      data.additionalProperties !== undefined &&
                      data.additionalProperties.competencySector === i &&
                      data.additionalProperties.cod === k &&
                      data.additionalProperties.competencyType === m
                    ) {
                      return resSectorCodType.push(data);
                    }
                  });
                });
              });
            });
            filterOutput = resSectorCodType;
            return filterOutput;
          } else if (
            argSector.length > 0 &&
            argCod.length > 0 &&
            argArea.length > 0 &&
            argType.length === 0
          ) {
            // console.log("argSector, argCod, argArea");
            let resSectorCodArea = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencySector.map((i, j) => {
                args.cod.map((k, l) => {
                  args.competencyArea.map((m, n) => {
                    if (
                      data.additionalProperties !== undefined &&
                      data.additionalProperties.competencySector === i &&
                      data.additionalProperties.cod === k &&
                      data.additionalProperties.competencyArea === m
                    ) {
                      return resSectorCodArea.push(data);
                    }
                  });
                });
              });
            });
            filterOutput = resSectorCodArea;
            return filterOutput;
          }

          // Matrix 5
          else if (
            argCod.length > 0 &&
            argArea.length > 0 &&
            argSector.length > 0 &&
            argType.length === 0
          ) {
            // console.log("argCod, argArea, argSector");
            let resCodAreaSector = [];
            filterOutput = filterOutput.filter((data) => {
              args.cod.map((i, j) => {
                args.competencyArea.map((k, l) => {
                  args.competencySector.map((m, n) => {
                    if (
                      data.additionalProperties !== undefined &&
                      data.additionalProperties.cod === i &&
                      data.additionalProperties.competencyArea === k &&
                      data.additionalProperties.competencySector === m
                    ) {
                      return resCodAreaSector.push(data);
                    }
                  });
                });
              });
            });
            filterOutput = resCodAreaSector;
            return filterOutput;
          } else if (
            argCod.length > 0 &&
            argSector.length > 0 &&
            argArea.length > 0 &&
            argType.length === 0
          ) {
            // console.log("argCod, argSector, argArea");
            let resCodSectorArea = [];
            filterOutput = filterOutput.filter((data) => {
              args.cod.map((i, j) => {
                args.competencySector.map((k, l) => {
                  args.competencyArea.map((m, n) => {
                    if (
                      data.additionalProperties !== undefined &&
                      data.additionalProperties.cod === i &&
                      data.additionalProperties.competencySector === k &&
                      data.additionalProperties.competencyArea === m
                    ) {
                      return resCodSectorArea.push(data);
                    }
                  });
                });
              });
            });
            filterOutput = resCodSectorArea;
            return filterOutput;
          } else if (
            argType.length > 0 &&
            argArea.length > 0 &&
            argSector.length > 0 &&
            argCod.length === 0
          ) {
            // console.log("argType, argArea, argSector");
            let resTypeAreaSector = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencyType.map((i, j) => {
                args.competencyArea.map((k, l) => {
                  args.competencySector.map((m, n) => {
                    if (
                      data.additionalProperties !== undefined &&
                      data.additionalProperties.competencyType === i &&
                      data.additionalProperties.competencyArea === k &&
                      data.additionalProperties.competencySector === m
                    ) {
                      return resTypeAreaSector.push(data);
                    }
                  });
                });
              });
            });
            filterOutput = resTypeAreaSector;
            return filterOutput;
          } else if (
            argType.length > 0 &&
            argSector.length > 0 &&
            argArea.length > 0 &&
            argCod.length === 0
          ) {
            // console.log("argType, argSector, argArea");
            let resTypeSectorArea = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencyType.map((i, j) => {
                args.competencySector.map((k, l) => {
                  args.competencyArea.map((m, n) => {
                    if (
                      data.additionalProperties !== undefined &&
                      data.additionalProperties.competencyType === i &&
                      data.additionalProperties.competencySector === k &&
                      data.additionalProperties.competencyArea === m
                    ) {
                      return resTypeSectorArea.push(data);
                    }
                  });
                });
              });
            });
            filterOutput = resTypeSectorArea;
            return filterOutput;
          } else if (
            argSector.length > 0 &&
            argType.length > 0 &&
            argArea.length > 0 &&
            argCod.length === 0
          ) {
            // console.log("argSector, argType, argArea");
            let resSectorTypeArea = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencySector.map((i, j) => {
                args.competencyType.map((k, l) => {
                  args.competencyArea.map((m, n) => {
                    if (
                      data.additionalProperties !== undefined &&
                      data.additionalProperties.competencySector === i &&
                      data.additionalProperties.competencyType === k &&
                      data.additionalProperties.competencyArea === m
                    ) {
                      return resSectorTypeArea.push(data);
                    }
                  });
                });
              });
            });
            filterOutput = resSectorTypeArea;
            return filterOutput;
          } else if (
            argSector.length > 0 &&
            argArea.length > 0 &&
            argType.length > 0 &&
            argCod.length === 0
          ) {
            // console.log("argSector, argArea, argType");
            let resSectorAreaType = [];
            filterOutput = filterOutput.filter((data) => {
              args.competencySector.map((i, j) => {
                args.competencyArea.map((k, l) => {
                  args.competencyType.map((m, n) => {
                    if (
                      data.additionalProperties !== undefined &&
                      data.additionalProperties.competencySector === i &&
                      data.additionalProperties.competencyArea === k &&
                      data.additionalProperties.competencyType === m
                    ) {
                      return resSectorAreaType.push(data);
                    }
                  });
                });
              });
            });
            filterOutput = resSectorAreaType;
            return filterOutput;
          }

          // Matrix 6
          else {
            // console.log("No filters");
            return filterOutput;
          }
        }),
    getAllPositions: async (parent, args, context, info) =>
      fetch(global.env.APP_GATSBY_GRAPHQL, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((json) => {
          var filterOutput = json.hits.hits[0]._source.positions;

          let argDept = args.department;
          let argSector = args.sector;
          // console.log(args);

          // console.log("ARGS");
          // console.log(args);

          // console.log("department: ", argDept.length);
          // console.log("sector: ", argSector.length);

          if (args.id) {
            filterOutput = filterOutput.filter((data) => {
              if (data.id !== undefined) {
                if (data.id === args.id) {
                  return data;
                }
              }
            });
            return filterOutput;
          }

          // Matrix 1
          else if (argDept.length > 0 && argSector.length === 0) {
            // console.log("Only department");
            let resDept = [];
            filterOutput = filterOutput.filter((data) => {
              args.department.map((i, j) => {
                if (
                  data.additionalProperties !== undefined &&
                  data.additionalProperties.Department === i
                ) {
                  return resDept.push(data);
                }
              });
            });
            filterOutput = resDept;
            return filterOutput;
          } else if (argDept.length === 0 && argSector.length > 0) {
            // console.log("Only sector");
            let resSector = [];
            filterOutput = filterOutput.filter((data) => {
              args.sector.map((i, j) => {
                if (
                  data.additionalProperties !== undefined &&
                  data.additionalProperties.sector === i
                ) {
                  return resSector.push(data);
                }
              });
            });
            filterOutput = resSector;
            return filterOutput;
          }

          // Matrix 2
          else if (argDept.length > 0 && argSector.length > 0) {
            let resAllFilters = [];
            filterOutput = filterOutput.filter((data) => {
              args.department.map((i, j) => {
                args.sector.map((m, n) => {
                  if (
                    data.additionalProperties !== undefined &&
                    data.additionalProperties.Department === i &&
                    data.additionalProperties.sector === m
                  ) {
                    return resAllFilters.push(data);
                  }
                });
              });
            });
            filterOutput = resAllFilters;
            return filterOutput;
          }

          // Matrix 3
          else {
            // console.log("No filters");
            return filterOutput;
          }
        }),
  },
};

const posResolvers = {};

// Mapping schema to Apollo Server
const schema = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: "/graphql",
    settings: {
      "editor.theme": "dark",
    },
  },
});

export default schema;
