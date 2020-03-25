'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var ReasonReact = require("reason-react/src/ReasonReact.js");

function str(prim) {
  return prim;
}

var url = "https://pokemons-apielsa.herokuapp.com/pokemon-types/";

function pokemon(pokemon$1) {
  return /* record */[
          /* id */Json_decode.field("id", Json_decode.$$int, pokemon$1),
          /* name */Json_decode.field("name", Json_decode.string, pokemon$1)
        ];
}

function users(json) {
  return Json_decode.list(pokemon, json);
}

var Decode = /* module */[
  /* pokemon */pokemon,
  /* users */users
];

function fetchUsers() {
  return fetch(url).then((function (prim) {
                    return prim.json();
                  })).then((function (json) {
                  var users = Json_decode.list(pokemon, json);
                  return Promise.resolve(users);
                })).catch((function () {
                return Promise.resolve(undefined);
              }));
}

var component = ReasonReact.reducerComponent("FetchComponent");

function make() {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              var match = self[/* state */1];
              if (typeof match === "number") {
                switch (match) {
                  case 0 : 
                      return React.createElement("div", undefined, "Click to start load Pokemons", React.createElement("button", {
                                      onClick: (function () {
                                          return Curry._1(self[/* send */3], /* LoadUsers */0);
                                        })
                                    }, "Load pokemons"));
                  case 1 : 
                      return React.createElement("div", undefined, "Loading...");
                  case 2 : 
                      return React.createElement("div", undefined, "Something went wrong!");
                  
                }
              } else {
                return React.createElement("div", undefined, React.createElement("h2", undefined, "Pokemons"), React.createElement("ul", undefined, $$Array.of_list(List.map((function (pokemon) {
                                          return React.createElement("li", {
                                                      key: String(pokemon[/* id */0])
                                                    }, pokemon[/* name */1]);
                                        }), match[0]))));
              }
            }),
          /* initialState */(function () {
              return /* NotAsked */0;
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (action, _) {
              if (typeof action === "number") {
                if (action !== 0) {
                  return /* Update */Block.__(0, [/* Failure */2]);
                } else {
                  return /* UpdateWithSideEffects */Block.__(2, [
                            /* Loading */1,
                            (function (self) {
                                fetchUsers(/* () */0).then((function (result) {
                                        if (result !== undefined) {
                                          return Promise.resolve(Curry._1(self[/* send */3], /* LoadedUsers */[result]));
                                        } else {
                                          return Promise.resolve(Curry._1(self[/* send */3], /* LoadUsersFailed */1));
                                        }
                                      }));
                                return /* () */0;
                              })
                          ]);
                }
              } else {
                return /* Update */Block.__(0, [/* Success */[action[0]]]);
              }
            }),
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

exports.str = str;
exports.url = url;
exports.Decode = Decode;
exports.fetchUsers = fetchUsers;
exports.component = component;
exports.make = make;
/* component Not a pure module */
