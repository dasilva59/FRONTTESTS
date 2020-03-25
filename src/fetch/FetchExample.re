/* The new stdlib additions */
let str = ReasonReact.string;

let url = "https://pokemons-apielsa.herokuapp.com/pokemon-types/";

type pokemon = {
  id: int,
  name: string,
};

type state =
  | NotAsked
  | Loading
  | Failure
  | Success(list(pokemon));

module Decode = {
  let pokemon = pokemon =>
    Json.Decode.{
      id: field("id", int, pokemon),
      name: field("name", string, pokemon),
    };
  let users = json : list(pokemon) => Json.Decode.list(pokemon, json);
};

let fetchUsers = () =>
  Js.Promise.(
    Fetch.fetch(url)
    |> then_(Fetch.Response.json)
    |> then_(json =>
         json |> Decode.users |> (users => Some(users) |> resolve)
       )
    |> catch(_err => resolve(None))
  );

type action =
  | LoadUsers
  | LoadedUsers(list(pokemon))
  | LoadUsersFailed;

let component = ReasonReact.reducerComponent("FetchComponent");

let make = _children => {
  ...component,
  initialState: () => NotAsked,
  reducer: (action, _state) =>
    switch (action) {
    | LoadUsers =>
      ReasonReact.UpdateWithSideEffects(
        Loading,
        (
          self =>
            Js.Promise.(
              fetchUsers()
              |> then_(result =>
                   switch (result) {
                   | Some(users) => resolve(self.send(LoadedUsers(users)))
                   | None => resolve(self.send(LoadUsersFailed))
                   }
                 )
              |> ignore
            )
        ),
      )
    | LoadedUsers(users) => ReasonReact.Update(Success(users))
    | LoadUsersFailed => ReasonReact.Update(Failure)
    },
  render: self =>
    switch (self.state) {
    | NotAsked =>
      <div>
        (str("Click to start load Pokemons"))
        <button onClick=(_event => self.send(LoadUsers))>
          (str("Load pokemons"))
        </button>
      </div>
    | Loading => <div> (str("Loading...")) </div>
    | Failure => <div> (str("Something went wrong!")) </div>
    | Success(users) =>
      <div>
        <h2> (str("Pokemons")) </h2>
        <ul>
          (
            users
            |> List.map(pokemon =>
                 <li key=(string_of_int(pokemon.id))> (str(pokemon.name)) </li>
               )
            |> Array.of_list
            |> ReasonReact.array
          )
        </ul>
      </div>
    },
};