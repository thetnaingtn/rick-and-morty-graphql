import { useQuery } from "@apollo/client";

import { gql } from "./generated";
import Location from "./location";

const getCharacters = gql(/* GraphQL */ `
  query getCharacters($page: Int, $withLocation: Boolean!) {
    characters(page: $page) {
      results {
        id
        name
        status
        species
        gender
        image
        location @include(if: $withLocation) {
          ...LocationParts
        }
      }
    }
  }
`);

function App() {
  const { data, loading, refetch } = useQuery(getCharacters, {
    variables: {
      page: 1,
      withLocation: false,
    },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <section>
      <button
        onClick={() => {
          refetch({ page: 2 });
        }}
      >
        Refetch
      </button>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <h1>Characters</h1>
          <ul>
            {data?.characters?.results?.map((character) => {
              if (!character) return <li>No Character</li>;
              return (
                <li key={character?.id}>
                  <img
                    src={character?.image as string}
                    width="200"
                    height="200"
                  />
                  <span>Name:{character.name}</span>
                  <span>Status:{character.status}</span>
                  {character.location == null ? null : (
                    <Location location={character.location} />
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}

export default App;
