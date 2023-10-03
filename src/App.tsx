import { useQuery } from "@apollo/client";
import { gql } from "./generated";

const getCharacters = gql(/* GraphQL */ `
  query getCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
        species
        gender
        image
        location {
          name
          type
        }
      }
    }
  }
`);

function App() {
  const { data, loading, refetch } = useQuery(getCharacters, {
    variables: {
      page: 1,
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
            {data?.characters?.results?.map((character) => (
              <li key={character?.id}>
                <img
                  src={character?.image as string}
                  width="200"
                  height="200"
                />
                <span>Name:{character?.name}</span>
                <span>Status:{character?.status}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default App;
