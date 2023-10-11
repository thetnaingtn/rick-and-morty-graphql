import { useApolloClient, useQuery } from "@apollo/client";
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

const character = gql(`
query getCharacter($id:ID!){
  character(id:$id){
    id
    name
    status
    species
  }
}
`);

function NewCharacter() {
  const { data } = useQuery(character, {
    variables: { id: "500" },
  });

  return (
    <div>
      <h1>{data?.character?.name}</h1>
      <p>{data?.character?.status}</p>
    </div>
  );
}

function App() {
  const { data, loading, refetch } = useQuery(getCharacters, {
    variables: {
      page: 1,
    },
    notifyOnNetworkStatusChange: true,
  });

  const client = useApolloClient();

  const addNewCharacter = () => {
    client.writeQuery({
      query: gql(`
        query getCharacter($id:ID!){
          character(id:$id){
            id
            name
            status
            species
          }
        }
      `),
      data: {
        character: {
          __typename: "Character",
          id: "500",
          name: "Chihiro",
          status: "Alive",
          species: "Human",
        },
      },
      variables: {
        id: "500",
      },
    });
  };

  return (
    <section>
      <button
        onClick={() => {
          refetch({ page: 2 });
        }}
      >
        Refetch
      </button>
      <button onClick={addNewCharacter}>Add new character</button>
      <NewCharacter />
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
