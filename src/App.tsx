import { useQuery } from "@apollo/client";
import { gql } from "./generated";
import { GetCharactersQuery } from "./generated/graphql";
import { useRef } from "react";

const getCharacters = gql(/* GraphQL */ `
  query getCharacters($page: Int) {
    characters(page: $page) {
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
  const pageRef = useRef(1);
  const { data, loading, fetchMore } = useQuery(getCharacters, {
    notifyOnNetworkStatusChange: true,
    variables: {
      page: pageRef.current,
    },
  });
  return (
    <section>
      <div>
        <button
          onClick={() => {
            pageRef.current++;
            fetchMore({
              variables: { page: pageRef.current },
            });
          }}
        >
          Fetch More
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
