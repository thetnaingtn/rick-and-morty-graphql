import { useQuery } from "@apollo/client";
import { gql } from "./generated";
import { GetCharactersQuery } from "./generated/graphql";
import { useRef } from "react";

const getCharacters = gql(/* GraphQL */ `
  query getCharacters($page: Int, $species: String) {
    characters(page: $page, filter: { species: $species }) {
      results {
        id
        name
        status
        species
        gender
        image
        location {
          id
          name
          type
        }
      }
    }
  }
`);

function CharactersList({
  characters,
}: {
  characters: GetCharactersQuery["characters"];
}) {
  return (
    <ul>
      {characters?.results?.map((character) => (
        <li key={character?.id}>
          <img src={character?.image as string} width="200" height="200" />
          <span>Name:{character?.name}</span>
          <span>Status:{character?.status}</span>
        </li>
      ))}
    </ul>
  );
}

function App() {
  const humanPageRef = useRef(1);
  const alienPageRef = useRef(1);
  const { data, loading, fetchMore } = useQuery(getCharacters, {
    notifyOnNetworkStatusChange: true,
    variables: {
      page: 1,
      species: "Alien",
    },
  });
  return (
    <section>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => {
            humanPageRef.current++;
            fetchMore({
              variables: { page: humanPageRef.current, species: "Human" },
            });
          }}
        >
          Fetch More Human Species
        </button>
        <button
          onClick={() => {
            alienPageRef.current++;
            fetchMore({
              variables: { page: alienPageRef.current, species: "Alien" },
            });
          }}
        >
          Fetch More Alien Species
        </button>
      </div>

      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <h1>Characters</h1>
          {data?.characters == null ? null : (
            <CharactersList characters={data.characters} />
          )}
        </>
      )}
    </section>
  );
}

export default App;
