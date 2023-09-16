import { useQuery } from "@apollo/client";
import { gql } from "./generated";

const getCharacters = gql(/* GraphQL */ `
  query getCharacters {
    characters {
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
  const { data, loading } = useQuery(getCharacters);

  if (loading) return <span>Loading...</span>;
  return (
    <section>
      <h1>Characters</h1>
      <ul>
        {data?.characters?.results?.map((character) => (
          <li key={character?.id}>
            <img src={character?.image as string} width="200" height="200" />
            <span>Name:{character?.name}</span>
            <span>Status:{character?.status}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default App;
